import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  type?: 'text' | 'image'; // For image inputs
  imageUrl?: string;
  relatedQuestions?: string[]; // Added for storing suggestions
}

interface Question {
  id: string;
  subject: string;
  content: string;
  answer: string;
  mistakeNote?: string;
  tags: string[];
  dateAdded: number;
}

interface AppState {
  messages: Message[];
  questions: Question[];
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  addQuestion: (q: Omit<Question, 'id' | 'dateAdded'>) => void;
  clearMessages: () => void;
}

export const useStore = create<AppState>((set) => ({
  messages: [],
  questions: [],
  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, {
      ...msg,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    }]
  })),
  addQuestion: (q) => set((state) => ({
    questions: [...state.questions, {
      ...q,
      id: Math.random().toString(36).substring(7),
      dateAdded: Date.now(),
    }]
  })),
  clearMessages: () => set({ messages: [] }),
}));
