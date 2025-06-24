document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("transcribe-btn");
  const input = document.getElementById("video-url");
  const transcriptionList = document.getElementById("transcription-list");

  button.addEventListener("click", async () => {
    const videoUrl = input.value.trim();

    if (!videoUrl) {
      alert("Por favor, cole o link do vídeo do YouTube.");
      return;
    }

    transcriptionList.innerHTML = "<li>Transcrevendo... aguarde...</li>";

    try {
      const response = await fetch("http://localhost:5678/webhook-test/youtube/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ videoUrl })
      });

      if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

      const data = await response.json();

      const texto = data.transcription || JSON.stringify(data, null, 2);

      // Exibir como lista de frases
      const linhas = texto.split("\n").filter(l => l.trim() !== "");

      transcriptionList.innerHTML = ""; // limpa anterior
      linhas.forEach((linha, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="time">${String(index).padStart(2, "0")}:00</span> ${linha}`;
        transcriptionList.appendChild(li);
      });

    } catch (error) {
      transcriptionList.innerHTML = `<li>Erro: ${error.message}</li>`;
    }
  });
});