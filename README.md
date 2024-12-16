# Spy Helper - Codenames Assistant

## What is this project?

Spy Helper is a web application designed to assist players of the Codenames game. It generates creative one-word clues based on a list of words provided by the user, helping spymasters give better clues to their teammates.

## How to use it?

1. Open the application in your browser.
2. Enter words separated by spaces in the input field.
3. Click the "Generate Clues" button.
4. The application will display 10 potential clues along with descriptions for the provided words.

## Tech used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: TypeScript, Bun
- **AI Model**: Google Generative AI (Gemini 2.0)

## How to install this

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd gemini
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file and add your Google Generative AI API key:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run the application:

   ```bash
   bun run index.ts # for running bun server
   npx @tailwindcss/cli -i fe/styles.css -o fe/output.css --watch # for running tailwindcss
   ```

5. Open your browser and navigate to `http://localhost:3000` to use the application.

This project was created using `bun init` in bun v1.1.34. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
