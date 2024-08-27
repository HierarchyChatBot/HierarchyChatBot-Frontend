// Export.js

import { useCallback } from 'react';
import { marked } from 'marked';
import { useChapter } from '../JsonState'; // Import your context
import { useHistory } from '../HistoryHandler'; // Import the history context

const useExport = () => {
  const { chapters } = useChapter(); // Access chapters from context
  const { getPrompt } = useHistory(); // Access getPrompt from context

  const handleExport = useCallback(() => {
    // Generate Markdown content from chapters
    const generateMarkdownContent = (chapters) => {
      return chapters.map((chapter, c) => {
        // Create markdown for chapter
        const chapterMarkdown = `# ${chapter.chapter}\n\n${chapter.description}`;

        // Create markdown for sub-items
        const subItemsMarkdown = chapter.subItems.map((subItem, s) => {
          // Get the prompt for the current chapter and sub-item
          const prompt = getPrompt(c, s);

          return `## ${subItem.item}\n\n${subItem.description}\n\n**Answer:**\n\n${prompt || ''}`;
        }).join('\n\n');

        // Combine chapter and sub-items markdown
        return `${chapterMarkdown}\n\n${subItemsMarkdown}`;
      }).join('\n\n');
    };

    // Generate Markdown content
    const markdownContent = generateMarkdownContent(chapters);

    // Convert Markdown to HTML
    const htmlContent = marked(markdownContent);

    // Create HTML structure with left column
    const htmlWithLayout = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .container {
              display: flex;
              height: 100vh; /* Full viewport height */
            }
            .left-column {
              width: 20%;
              background-color: #f0f0f0;
              padding: 20px;
              box-sizing: border-box;
            }
            .content-column {
              width: 80%;
              padding: 20px;
              box-sizing: border-box;
            }
            h1 {
              text-align: center; /* Center-align headers */
            }
            p, ul, ol, h2, h3, h4, h5, h6 {
              text-align: left; /* Keep paragraphs and lists left-aligned */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="left-column">
              <p>LangGraph Chatbot</p>
            </div>
            <div class="content-column">
              ${htmlContent}
            </div>
          </div>
        </body>
      </html>
    `;
  
  

    // Create a temporary container to hold the HTML content
    const container = document.createElement('div');
    container.innerHTML = htmlWithLayout;

    // Save HTML content as an HTML file
    const blob = new Blob([htmlWithLayout], { type: 'text/html' });
    const htmlUrl = URL.createObjectURL(blob);
    const htmlLink = document.createElement('a');
    htmlLink.href = htmlUrl;
    htmlLink.download = 'exported_file.html';
    htmlLink.click();
    URL.revokeObjectURL(htmlUrl); // Clean up the URL object

    // Optional: Clean up the temporary container
    container.remove();
  }, [chapters, getPrompt]);

  return [handleExport];
};

export { useExport };
