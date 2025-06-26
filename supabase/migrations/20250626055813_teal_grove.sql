/*
  # Create quiz results table

  1. New Tables
    - `quiz_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `skill` (text, the technology/skill tested)
      - `score` (integer, number of correct answers)
      - `total_questions` (integer, total number of questions)
      - `user_name` (text, name for certificate)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `quiz_results` table
    - Add policy for authenticated users to read/write their own quiz results
*/

CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill text NOT NULL,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  user_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own quiz results"
  ON quiz_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results"
  ON quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS quiz_results_user_id_idx ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS quiz_results_created_at_idx ON quiz_results(created_at DESC);