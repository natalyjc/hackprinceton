export async function analyzeImageWithAI(selectedImage, imagePreview) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const base64Data = e.target.result.split(',')[1];
        const response = await fetch("http://localhost:5000/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            base64Data,
            mediaType: selectedImage.type
          })
        });
        const data = await response.json();
        // Anthropic response parsing
        const text = data.content
          ? data.content.map(item => item.type === "text" ? item.text : "").join("\n")
          : "";
        const cleanText = text.replace(/```json|```/g, "").trim();
        const result = JSON.parse(cleanText);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(selectedImage);
  });
}