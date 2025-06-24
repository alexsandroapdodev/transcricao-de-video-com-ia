const button = document.getElementById('transcribe-btn');
const urlInput = document.getElementById('video-url');
const transcriptionList = document.getElementById('transcription-list');
const videoPlayer = document.getElementById('video-player');
const caption = document.querySelector('.caption');

button.addEventListener('click', async () => {
  const videoUrl = urlInput.value.trim();

  if (!videoUrl) {
    alert('Cole o link do YouTube ou envie um vídeo!');
    return;
  }

  button.innerText = 'Transcrevendo...';
  button.disabled = true;

  try {
    const response = await fetch('https://n8n-deploy-39k2.onrender.com/webhook/youtube/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ videoUrl })
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    // Aqui você deve ajustar para ler o que o seu workflow retorna.
    // Supondo que a resposta tenha um campo `transcript` com array de objetos {time, text}:

    if (!data.transcript) {
      throw new Error('Resposta inválida do servidor.');
    }

    transcriptionList.innerHTML = '';

    data.transcript.forEach(segment => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="time">${segment.time}</span> ${segment.text}`;
      transcriptionList.appendChild(li);
    });

    caption.innerText = 'Transcrição concluída com sucesso!';
    // Se quiser trocar o vídeo, pode fazer aqui:
    // videoPlayer.src = 'url-do-video-processado-ou-original';

  } catch (error) {
    console.error(error);
    alert('Erro ao processar a transcrição. Veja o console para detalhes.');
    caption.innerText = 'Falha na transcrição.';
  }

  button.innerText = 'Transcrever';
  button.disabled = false;
});