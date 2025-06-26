import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type QuizResult = {
  id?: string;
  user_id: string;
  skill: string;
  score: number;
  total_questions: number;
  created_at?: string;
  user_name: string;
};