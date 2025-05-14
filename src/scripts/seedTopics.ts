import dbConnect from "@/lib/database/mongodb";
import Topic from "@/lib/database/models/Topic";
import Question from "@/lib/database/models/Question";

/**
 * This script seeds the database with topics and counts the questions for each topic
 * Run with: npm run seed-topics
 */
async function seedTopics() {
  try {
    console.log("Connecting to database...");
    await dbConnect();

    console.log("Connected to database. Seeding topics...");

    // Define topics
    const topics = [
      {
        id: "javascript",
        name: {
          en: "JavaScript",
          es: "JavaScript",
        },
        description: {
          en: "Core concepts of JavaScript programming language",
          es: "Conceptos básicos del lenguaje de programación JavaScript",
        },
      },
      {
        id: "react",
        name: {
          en: "React",
          es: "React",
        },
        description: {
          en: "Building user interfaces with React",
          es: "Construyendo interfaces de usuario con React",
        },
      },
      {
        id: "css",
        name: {
          en: "CSS",
          es: "CSS",
        },
        description: {
          en: "Styling and layout techniques with CSS",
          es: "Técnicas de estilo y diseño con CSS",
        },
      },
      {
        id: "html",
        name: {
          en: "HTML",
          es: "HTML",
        },
        description: {
          en: "Structure and semantics of HTML",
          es: "Estructura y semántica de HTML",
        },
      },
      {
        id: "typescript",
        name: {
          en: "TypeScript",
          es: "TypeScript",
        },
        description: {
          en: "Static typing for JavaScript with TypeScript",
          es: "Tipado estático para JavaScript con TypeScript",
        },
      },
    ];

    // Upsert topics (insert if not exists, update if exists)
    for (const topic of topics) {
      await Topic.findOneAndUpdate({ id: topic.id }, topic, {
        upsert: true,
        new: true,
      });
      console.log(`Upserted topic: ${topic.id}`);
    }

    // Update question counts
    for (const topic of topics) {
      const count = await Question.countDocuments({ topic: topic.id });
      await Topic.findOneAndUpdate(
        { id: topic.id },
        { questionCount: count },
        { new: true }
      );
      console.log(`Updated question count for ${topic.id}: ${count}`);
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding topics:", error);
    process.exit(1);
  }
}

// Run the seed function
seedTopics();
