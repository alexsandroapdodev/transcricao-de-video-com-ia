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
      const response = await fetch("https://n8n-deploy-39k2.onrender.com/webhook/youtube/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ videoUrl })
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Pegamos a transcrição do objeto de resposta (caso exista)
      const texto = data.transcription || JSON.stringify(data, null, 2);

      // Se não houver texto, avisa que não retornou resultado
      if (!texto.trim()) {
        transcriptionList.innerHTML = "<li>Não foi possível obter a transcrição.</li>";
        return;
      }

      // Exibir o texto dividido por linhas, pulando linhas vazias
      const linhas = texto.split("\n").filter(linha => linha.trim() !== "");

      transcriptionList.innerHTML = ""; // limpa conteúdo anterior
      linhas.forEach((linha, index) => {
        const li = document.createElement("li");
        // Ex: 00:00, 01:00, 02:00 ...
        li.innerHTML = `<span class="time">${String(index).padStart(2, "0")}:00</span> ${linha}`;
        transcriptionList.appendChild(li);
      });

    } catch (error) {
      transcriptionList.innerHTML = `<li style="color:red;">Erro: ${error.message}</li>`;
    }
  });
});