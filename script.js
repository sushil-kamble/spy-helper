document.getElementById("clueForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const words = document.getElementById("words").value;
  const resultsDiv = document.getElementById("results");

  try {
    resultsDiv.innerHTML = "Loading...";
    resultsDiv.classList.remove("error");
    const response = await fetch("http://localhost:3000/api/generate-clues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ words }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    const clues = data.clues.split("\n").filter((line) => line.trim());

    if (clues.length === 0) {
      resultsDiv.innerHTML = "No clues generated. Please try different words.";
    } else {
      resultsDiv.innerHTML = `
        <table>
          ${clues
            .map((clue) => {
              const [clueText, description] = clue.split(":");
              return `
                <tr>
                  <td class="clue">${clueText.trim()}</td>
                  <td class="description">${description.trim()}</td>
                </tr>
              `;
            })
            .join("")}
        </table>
      `;
    }
  } catch (error) {
    console.error("Error fetching clues:", error);
    resultsDiv.innerHTML = `Error: ${error.message}`;
    resultsDiv.classList.add("error");
  }
});
