import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export async function generateQuizQuestions(skill: string): Promise<QuizQuestion[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Generate 5 multiple choice questions about ${skill} for a skill assessment quiz. 
    The questions should be intermediate level and test practical knowledge.
    
    Format the response as a JSON array where each question has:
    - "question": the question text
    - "options": array of 4 answer options
    - "correctAnswer": index (0-3) of the correct answer
    - "explanation": brief explanation of why the answer is correct
    
    Make sure the JSON is valid and properly formatted. Focus on practical, real-world applications of ${skill}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from response');
    }
    
    const questions = JSON.parse(jsonMatch[0]);
    return questions;
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    // Fallback questions if API fails
    return getFallbackQuestions(skill);
  }
}

function getFallbackQuestions(skill: string): QuizQuestion[] {
  const fallbackQuestions: Record<string, QuizQuestion[]> = {
    'JavaScript': [
      {
        question: 'What is the result of typeof null in JavaScript?',
        options: ['null', 'undefined', 'object', 'boolean'],
        correctAnswer: 2,
        explanation: 'typeof null returns "object" due to a legacy bug in JavaScript.'
      },
      {
        question: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0,
        explanation: 'push() adds one or more elements to the end of an array.'
      },
      {
        question: 'What does the "this" keyword refer to in JavaScript?',
        options: ['The global object', 'The current function', 'The context object', 'The window object'],
        correctAnswer: 2,
        explanation: '"this" refers to the object that is executing the current function.'
      },
      {
        question: 'Which of the following is NOT a JavaScript data type?',
        options: ['String', 'Boolean', 'Float', 'Symbol'],
        correctAnswer: 2,
        explanation: 'JavaScript has Number type, not separate Integer and Float types.'
      },
      {
        question: 'What is the purpose of the Promise object in JavaScript?',
        options: ['To handle synchronous operations', 'To handle asynchronous operations', 'To create loops', 'To define variables'],
        correctAnswer: 1,
        explanation: 'Promises are used to handle asynchronous operations and their results.'
      }
    ],
    'React': [
      {
        question: 'What is JSX in React?',
        options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A CSS framework', 'A database'],
        correctAnswer: 1,
        explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React components.'
      },
      {
        question: 'Which hook is used to manage state in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useState is the primary hook for managing state in functional components.'
      },
      {
        question: 'What is the purpose of useEffect hook?',
        options: ['To manage state', 'To handle side effects', 'To create components', 'To define props'],
        correctAnswer: 1,
        explanation: 'useEffect is used to handle side effects like data fetching, subscriptions, and DOM manipulation.'
      },
      {
        question: 'How do you pass data from parent to child component in React?',
        options: ['Through state', 'Through props', 'Through context', 'Through refs'],
        correctAnswer: 1,
        explanation: 'Props are used to pass data from parent components to child components.'
      },
      {
        question: 'What is the virtual DOM in React?',
        options: ['A real DOM element', 'A JavaScript representation of the real DOM', 'A CSS framework', 'A database'],
        correctAnswer: 1,
        explanation: 'The virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates.'
      }
    ],
    'Python': [
      {
        question: 'What is the output of print(type([]))?',
        options: ['<class "array">', '<class "list">', '<class "tuple">', '<class "dict">'],
        correctAnswer: 1,
        explanation: '[] creates an empty list, so type([]) returns <class "list">.'
      },
      {
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1,
        explanation: 'The "def" keyword is used to define functions in Python.'
      },
      {
        question: 'What is the difference between a list and a tuple in Python?',
        options: ['Lists are immutable, tuples are mutable', 'Lists are mutable, tuples are immutable', 'No difference', 'Lists are faster'],
        correctAnswer: 1,
        explanation: 'Lists are mutable (can be changed) while tuples are immutable (cannot be changed).'
      },
      {
        question: 'Which method is used to add an item to a list in Python?',
        options: ['add()', 'append()', 'insert()', 'push()'],
        correctAnswer: 1,
        explanation: 'The append() method adds an item to the end of a list.'
      },
      {
        question: 'What does the "self" parameter represent in Python class methods?',
        options: ['The class itself', 'The instance of the class', 'A static method', 'A global variable'],
        correctAnswer: 1,
        explanation: '"self" refers to the instance of the class and is used to access instance variables and methods.'
      }
    ]
  };
  
  return fallbackQuestions[skill] || fallbackQuestions['JavaScript'];
}