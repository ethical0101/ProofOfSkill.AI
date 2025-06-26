import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DocumentArrowDownIcon, HomeIcon } from '@heroicons/react/24/outline';

export function CertificatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);

  const certificateData = location.state;

  React.useEffect(() => {
    if (!certificateData) {
      navigate('/quiz');
    }
  }, [certificateData, navigate]);

  if (!certificateData) {
    return null;
  }

  const { userName, skill, percentage, date } = certificateData;

  // Format the date properly
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate a proper certificate ID
  const generateCertificateId = () => {
    const skillCode = skill.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 3);
    const timestamp = Date.now().toString();
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `CERT-${skillCode}-${timestamp.slice(-6)}-${randomSuffix}`;
  };

  const formattedDate = formatDate(date);
  const certificateId = generateCertificateId();

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${userName.replace(/\s+/g, '-')}-${skill.replace(/\s+/g, '-')}-Certificate.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">Your Certificate</h1>
          <p className="text-lg text-gray-400">
            Congratulations on passing your {skill} assessment!
          </p>
        </div>

        {/* Certificate */}
        <div className="flex justify-center mb-8">
          <div 
            ref={certificateRef}
            className="bg-white p-16 rounded-2xl shadow-2xl animate-slide-up relative"
            style={{ width: '842px', height: '595px' }} // A4 landscape dimensions
          >
            {/* Certificate Header */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                CertiAI
              </div>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                CERTIFICATE OF COMPLETION
              </h1>
              <p className="text-lg text-gray-600">
                This is to certify that
              </p>
            </div>

            {/* Recipient Name */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gray-800 mb-4 font-serif">
                {userName}
              </div>
              <div className="w-96 h-px bg-gray-300 mx-auto"></div>
            </div>

            {/* Achievement Details */}
            <div className="text-center mb-8">
              <p className="text-xl text-gray-700 mb-4">
                has successfully completed the
              </p>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {skill} Skill Assessment
              </div>
              <p className="text-lg text-gray-700 mb-2">
                with a score of
              </p>
              <div className="text-4xl font-bold text-green-600 mb-4">
                {percentage}%
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end">
              <div className="text-left">
                <div className="text-gray-700 mb-2 font-medium">Date Issued:</div>
                <div className="text-xl font-semibold text-gray-800">{formattedDate}</div>
              </div>
              
              <div className="text-center">
                <div className="w-48 h-px bg-gray-300 mb-2"></div>
                <div className="text-gray-700 font-medium">
                  CertiAI Certification Authority
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-gray-700 mb-2 font-medium">Certificate ID:</div>
                <div className="text-sm font-mono text-gray-800 font-semibold">
                  {certificateId}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-4 border-blue-200 rounded-full opacity-20"></div>
            <div className="absolute top-12 right-12 w-12 h-12 border-4 border-purple-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-8 left-12 w-20 h-20 border-4 border-blue-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-12 right-8 w-14 h-14 border-4 border-purple-200 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={downloadPDF}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl hover:from-blue-500 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            Download PDF
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-200"></div>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-800/50 backdrop-blur-sm rounded-2xl hover:text-white hover:bg-gray-700/50 transform hover:scale-105 transition-all duration-200 border border-gray-700/50"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}