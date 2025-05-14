import { javascriptQuestions } from "@/lib/questions/javascript";
import dbConnect from "@/lib/database/mongodb";
import Question from "@/lib/database/models/Question";

/**
 * This script seeds the database with the JavaScript questions from the static file
 * Run with: npx ts-node -r tsconfig-paths/register src/scripts/seedQuestions.ts
 */
async function seedQuestions() {
  try {
    console.log("Connecting to database...");
    await dbConnect();

    console.log("Connected to database. Seeding questions...");

    // Map JavaScript questions to MongoDB model format
    const questionsToInsert = javascriptQuestions.map((question) => ({
      ...question,
      topic: "javascript",
    }));

    // Check if questions already exist and only insert new ones
    for (const question of questionsToInsert) {
      const exists = await Question.findOne({ id: question.id });

      if (!exists) {
        await Question.create(question);
        console.log(`Created question: ${question.id}`);
      } else {
        console.log(`Question already exists: ${question.id}`);
      }
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding questions:", error);
    process.exit(1);
  }
}

// Run the seed function
seedQuestions();
