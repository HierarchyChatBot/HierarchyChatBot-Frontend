// Export.js

import { useCallback } from 'react';
import { marked } from 'marked';
import { useChapter } from '../JsonState'; // Import your context

const useExport = () => {
  const { chapters } = useChapter(); // Access chapters from context

  const handleExport = useCallback(() => {
    // Generate Markdown content from chapters
    const generateMarkdownContent = (chapters) => {
      return chapters.map(chapter => {
        // Create markdown for chapter
        const chapterMarkdown = `# ${chapter.chapter}\n\n${chapter.description}`;

        // Create markdown for sub-items
        const subItemsMarkdown = chapter.subItems.map(subItem => {
          return `## ${subItem.item}\n\n${subItem.description}`;
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
          </style>
        </head>
        <body>
          <div class="container">
            <div class="left-column">
              <!-- Left column content can go here -->
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
  }, [chapters]);

  return [handleExport];
};

export { useExport };
