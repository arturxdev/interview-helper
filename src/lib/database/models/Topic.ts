import mongoose, { Schema, Document } from "mongoose";

// Define the Topic interface
export interface ITopic extends Document {
  id: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  questionCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const TopicSchema = new Schema<ITopic>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      en: { type: String, required: true },
      es: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      es: { type: String, required: true },
    },
    questionCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create and export the model
export default mongoose.models.Topic ||
  mongoose.model<ITopic>("Topic", TopicSchema);
