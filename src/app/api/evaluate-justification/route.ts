import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(request: Request) {
  try {
    const { userJustification, questionExplanation, isCorrect } =
      await request.json();
    console.log(userJustification, questionExplanation, isCorrect);
    const result = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        You are an expert tutor evaluating a student's reasoning for a programming question.
        
        The student answered ${isCorrect ? "correctly" : "incorrectly"}.
        
        Correct explanation: ${questionExplanation}
        
        Student's justification: ${userJustification}
        
        Please evaluate the student's reasoning and provide constructive feedback:
        1. Assess how well their justification demonstrates understanding
        2. Point out any misconceptions or gaps
        3. If correct, acknowledge good reasoning and suggest improvements
        4. If incorrect, help them understand where their thinking went wrong
        5. Keep feedback encouraging and educational
        
        Provide a concise but helpful response (2-3 sentences).
      `,
    });
    return Response.json({
      success: true,
      feedback: result.text,
    });
  } catch (error) {
    console.error("Error evaluating justification:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to evaluate justification",
      },
      { status: 500 }
    );
  }
}
