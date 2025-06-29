# 🎓 ProofOfSkill.AI (CertiAI)

**AI-Powered Smart Certificate Generator**

An intelligent web application that generates skill assessments using Google's Gemini AI and awards professional certificates based on performance. Test your knowledge in various programming languages and technologies, then showcase your skills with beautifully designed certificates.

## ✨ Features

- 🤖 **AI-Generated Quizzes**: Dynamic questions created by Google Gemini AI
- 🏆 **Professional Certificates**: Downloadable PDF certificates for successful completions
- 🔐 **User Authentication**: Secure login/signup system powered by Supabase
- 📊 **Progress Tracking**: View your quiz history and performance analytics
- 🎨 **Modern UI**: Beautiful, responsive design with dark mode
- 📱 **Mobile Friendly**: Optimized for all devices
- ⚡ **Real-time Results**: Instant feedback and scoring

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini AI API
- **Backend**: Supabase (Authentication & Database)
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: Lucide React + Heroicons
- **Routing**: React Router DOM

## 🚀 Live Demo

Experience ProofOfSkill.AI live at: [Your-Deployment-URL]

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ProofOfSkill.AI.git
cd ProofOfSkill.AI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key
```

#### 🔑 Getting API Keys:

**Supabase Setup:**
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to Settings → API
3. Copy your Project URL and anon/public key
4. Set up the database schema using the provided migration files in `supabase/migrations/`

**Google Gemini AI Setup:**
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Copy the generated API key

### 4. Database Setup

If using Supabase, run the migrations:
```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Link your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 Usage Guide

### 🏠 Homepage
- Browse available skill assessments
- View featured technologies and programming languages
- Access authentication if not logged in

### 🔐 Authentication
- **Sign Up**: Create a new account with email and password
- **Sign In**: Login to access personalized features
- **Profile**: View your quiz history and achievements

### 📝 Taking Quizzes
1. **Select a Skill**: Choose from JavaScript, React, Python, etc.
2. **AI Generation**: Wait for Gemini AI to generate custom questions
3. **Answer Questions**: Complete 5 multiple-choice questions
4. **Get Results**: View your score and detailed explanations

### 🏆 Certificates
- **Minimum Score**: Achieve 80% or higher to qualify for a certificate
- **Download PDF**: Generate and download professional certificates
- **Share**: Showcase your achievements on social media or LinkedIn

### 📊 Results & Analytics
- View detailed quiz results with explanations
- Track your progress across different skills
- Monitor improvement over time

## 🏗️ Project Structure

```
ProofOfSkill.AI/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/           # React Context providers
│   │   └── AuthContext.tsx
│   ├── lib/               # Utility libraries
│   │   ├── gemini.ts      # Google AI integration
│   │   └── supabase.ts    # Database client
│   ├── pages/             # Main application pages
│   │   ├── AuthPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── QuizPage.tsx
│   │   ├── ResultsPage.tsx
│   │   └── CertificatePage.tsx
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── supabase/
│   └── migrations/        # Database schema migrations
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🔒 Security Features

- **Environment Variables**: Sensitive data stored securely
- **Authentication**: JWT-based user authentication via Supabase
- **Data Validation**: Input validation using Zod schemas
- **Protected Routes**: Quiz and certificate pages require authentication

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support & Contact

**Developer**: Druthendra kommi

**Email**: kommidruthendra2005@gmail.com

For bug reports, feature requests, or general questions, please:
- Open an issue on GitHub
- Email the developer directly
- Check existing documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent question generation
- **Supabase** for backend infrastructure
- **Tailwind CSS** for beautiful UI components
- **React Community** for excellent documentation and tools

---

**Built with ❤️ for the developer community**

*ProofOfSkill.AI - Prove your skills, earn your certificates, advance your career.*
