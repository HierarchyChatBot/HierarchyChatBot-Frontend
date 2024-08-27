import { useCallback } from 'react';
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';

const useExport = () => {
  const handleExport = useCallback(() => {
    // Predefined markdown content
    const markdownContent = `
# Hello World

This is an example markdown content.

- Item 1
- Item 2
`;

    // Convert markdown to HTML
    const htmlContent = marked(markdownContent);

    // Create a temporary container to hold the HTML content
    const container = document.createElement('div');
    container.innerHTML = htmlContent;

    // Use html2pdf to generate and save the PDF
    html2pdf().from(container).save('exported_file.pdf');

    // Optional: Clean up the temporary container
    container.remove();
  }, []);

  return [handleExport];
};

export { useExport };
