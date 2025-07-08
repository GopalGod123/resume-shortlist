
// This assumes pdfjsLib is loaded globally from the CDN in index.html
declare const pdfjsLib: any;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async (event) => {
      if (!event.target?.result) {
        return reject(new Error("Failed to read file."));
      }
      
      try {
        const typedarray = new Uint8Array(event.target.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let textContent = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          textContent += text.items.map((s: any) => s.str).join(' ');
        }
        resolve(textContent);
      } catch (error) {
        console.error("Error parsing PDF:", error);
        reject(new Error(`Failed to parse PDF file: ${file.name}. It might be corrupted or protected.`));
      }
    };

    fileReader.onerror = (error) => {
      reject(new Error(`File reading error: ${error}`));
    };

    fileReader.readAsArrayBuffer(file);
  });
};
