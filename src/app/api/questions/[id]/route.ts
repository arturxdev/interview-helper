import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database/mongodb";
import Question from "@/lib/database/models/Question";

// GET a single question by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await dbConnect();
    const question = await Question.findOne({ id });

    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: question },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch question" },
      { status: 500 }
    );
  }
}

// PUT - update a question
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    await dbConnect();

    // Find and update the question
    const updatedQuestion = await Question.findOneAndUpdate({ id }, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuestion) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedQuestion },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update question" },
      { status: 500 }
    );
  }
}

// DELETE - delete a question
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await dbConnect();

    const deletedQuestion = await Question.findOneAndDelete({ id });

    if (!deletedQuestion) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete question" },
      { status: 500 }
    );
  }
}
