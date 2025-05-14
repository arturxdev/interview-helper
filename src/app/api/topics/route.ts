import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database/mongodb";
import Topic from "@/lib/database/models/Topic";

// GET all topics
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const topics = await Topic.find({}).sort({ id: 1 });

    return NextResponse.json({ success: true, data: topics }, { status: 200 });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
