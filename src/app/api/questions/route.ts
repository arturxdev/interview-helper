import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database/mongodb";
import Question from "@/lib/database/models/Question";

// GET all questions - can filter by topic, difficulty, type
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const type = searchParams.get("type");
    const randomize = searchParams.get("randomize") === "true";
    // Build query with optional filters
    const query: Record<string, any> = {};

    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;
    if (type) query.type = type;
    await dbConnect();
    if (randomize) {
      const questions = await Question.aggregate([
        { $match: query },
        { $sample: { size: 10 } },
      ]);
      return NextResponse.json(
        { success: true, data: questions },
        { status: 200 }
      );
    }
    const questions = await Question.find(query);

    return NextResponse.json(
      { success: true, data: questions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

// POST - create a new question
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    // Generate a unique ID if not provided
    if (!body.id) {
      body.id = `${body.topic}-${Date.now()}`;
    }

    const question = await Question.create(body);

    return NextResponse.json(
      { success: true, data: question },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create question" },
      { status: 500 }
    );
  }
}
