document.getElementById('clueForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const words = document.getElementById('words').value;
  const resultsDiv = document.getElementById('results');
  const submitButton = document.querySelector('button[type="submit"]');

  try {
    // Update button text and disable it
    submitButton.innerHTML = 'Generating clues...';
    submitButton.disabled = true;

    resultsDiv.innerHTML = 'Generating clues...';
    resultsDiv.classList.remove('error');
    resultsDiv.classList.add('text-gray-700', 'font-medium', 'mt-4');

    const apiUrl = 'https://spy-helper.onrender.com/api/generate-clues';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ words }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    const clues = data.clues.split('\n').filter((line) => line.trim());

    if (clues.length === 0) {
      resultsDiv.innerHTML = 'No clues generated. Please try different words.';
    } else {
      resultsDiv.innerHTML = `
                <h4 class="text-lg font-semibold mb-2">Clues for ${clues.length === 1 ? 'word' : 'words'} 
                "${words
                  .split('\n')
                  .map((word) => word.trim())
                  .join('", "')}"
                </h4>
                
                <table class="min-w-full bg-white border border-gray-200 border-collapse">
                    ${clues
                      .map((clue) => {
                        const [clueText, description] = clue.split(':');
                        return `
                                <tr class="border border-gray-200">
                                    <td class="px-4 py-2 text-left text-gray-700 border-r border-gray-200">${clueText.trim()}</td>
                                    <td class="px-4 py-2 text-left text-gray-500">${description.trim()}</td>
                                </tr>
                            `;
                      })
                      .join('')}
                </table>
            `;
    }
    document.getElementById('words').value = ''; // Clear input on success
  } catch (error) {
    console.error('Error fetching clues:', error);
    resultsDiv.innerHTML = `Error: ${error.message}`;
    resultsDiv.classList.add(
      'text-red-500',
      'font-medium',
      'text-center',
      'mt-4'
    );
    document.getElementById('words').value = ''; // Clear input on error
  } finally {
    // Restore original button text and enable it
    submitButton.innerHTML = 'Generate Clues';
    submitButton.disabled = false;
  }
});
