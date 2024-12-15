import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { serve } from "bun";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const server = serve({
  port: 3000,
  fetch: async (req) => {
    const url = new URL(req.url);
    // Add CORS headers for all responses
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };

    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (req.method === "POST" && url.pathname === "/api/generate-clues") {
      const body = await req.json();
      const words = body.words;

      const prompt = `
      You are a expert in CodeNames games:
      Context about codenames game:
      Spymasters know the secret identities of 25 agents. Their teammates know the agents only by their
      codenames.
      Spymasters take turns giving one-word clues. A clue may relate to multiple words on the table. The field
      operatives try to guess which words their spymaster meant. When a field operative touches a word, the
      spymaster reveals its secret identity. If the field operatives guess correctly, they may continue guessing,
      until they run out of ideas for the given clue or until they hit a wrong person. Then it is the other team's
      turn to give a clue and guess. The first team to contact all their agents wins the game.

      For example,  Red Team's first clue was tree: 2 words. which are realted to "bark" and "leaves".
      Eg 2: Red Team's second clue was river: 3 words, which are related to "amazon", "water" and "fish".

      Me being a spymaster, I need to give a clue to my team to guess the words, and you will help me in giving the one word clue.
      I will give you list of words and you need to tell me the clue that I should give to my team to guess the words.
      Be creative and give me a clue (one word clue) that is related to all the words.

      Give 10 clues variations (10 ans), Also give a short description of the words that you are giving clue for (sepreate the description and words by a new line).
      Clues should be on new line and description of the clue on the same line as clue seprarated by a colon.
      clue 1: description 1
      clue 2: description 2
      ...
      clue 10: description 10
      keep the format same. DONT CHANGE IT. DONT ADD ANY EXTRA SENTENCES.

      Below will be the words, seprated by comma or space. 

      ${words}
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      return new Response(JSON.stringify({ clues: responseText }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    return new Response("Not Found", {
      status: 404,
      headers: corsHeaders,
    });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
