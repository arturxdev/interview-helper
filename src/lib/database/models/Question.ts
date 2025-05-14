import mongoose, { Schema, Document } from "mongoose";

// Define the Question interface
export interface IQuestion extends Document {
  id: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "code-output" | "multiple-choice" | "true-false";
  question: {
    en: string;
    es: string;
  };
  code?: string;
  options?: {
    en: string[];
    es: string[];
  };
  correctAnswer: string | number | boolean;
  explanation: {
    en: string;
    es: string;
  };
  topic: string; // e.g., 'javascript', 'react', etc.
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const QuestionSchema = new Schema<IQuestion>(
  {
    id: { type: String, required: true, unique: true },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },
    type: {
      type: String,
      required: true,
      enum: ["code-output", "multiple-choice", "true-false"],
    },
    question: {
      en: { type: String, required: true },
      es: { type: String, required: true },
    },
    code: { type: String },
    options: {
      en: [{ type: String }],
      es: [{ type: String }],
    },
    correctAnswer: {
      type: Schema.Types.Mixed,
      required: true,
    },
    explanation: {
      en: { type: String, required: true },
      es: { type: String, required: true },
    },
    topic: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the model
export default mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", QuestionSchema);
