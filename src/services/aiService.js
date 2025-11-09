export async function analyzeImageWithAI(selectedImage, imagePreview) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const base64Data = e.target.result.split(',')[1];
        const response = await fetch("http://192.168.56.1:5000/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            base64Data,
            mediaType: selectedImage.type
          })
        });

        // Check if HTTP request failed
        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          return reject(new Error(`Server error: ${response.status} - ${errorText}`));
        }

        const data = await response.json();

        // Check if server returned an error
        if (!data.ok) {
          return reject(new Error(data.error || data.details || 'Unknown server error'));
        }

        // Server returns { ok: true, json: "...", raw: {...} }
        // The json field contains the JSON string from Anthropic
        let jsonText = data.json || '';
        
        // If json is empty, try to extract from raw response (fallback)
        if (!jsonText && data.raw?.content) {
          const contentArr = data.raw.content || [];
          const textPart = contentArr.find(p => p.type === "text");
          jsonText = textPart?.text || '';
        }

        if (!jsonText) {
          return reject(new Error('No analysis data received from server'));
        }

        // Clean up JSON string (remove markdown code blocks if present)
        const cleanText = jsonText.replace(/```json|```/g, "").trim();
        
        // Parse the JSON
        const result = JSON.parse(cleanText);
        resolve(result);
      } catch (error) {
        // If it's already an Error object with a message, pass it through
        if (error instanceof Error) {
          reject(error);
        } else {
          reject(new Error(error?.message || 'Failed to analyze image'));
        }
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(selectedImage);
  });
}