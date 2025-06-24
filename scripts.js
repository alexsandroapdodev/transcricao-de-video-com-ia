const button = document.getElementById('transcribe-btn');
const urlInput = document.getElementById('video-url');
const audioInput = document.getElementById('audio-file');
const transcriptionList = document.getElementById('transcription-list');
const caption = document.querySelector('.caption');

button.addEventListener('click', async () => {
  const videoUrl = urlInput.value.trim();
  const audioFile = audioInput.files[0];

  if (!videoUrl && !audioFile) {
    alert('Por favor, cole um link do YouTube ou envie um arquivo de áudio.');
    return;
  }

  button.innerText = 'Transcrevendo...';
  button.disabled = true;
  transcriptionList.innerHTML = '';
  caption.innerText = '';

  try {
    let response, data;

    if (videoUrl) {
      // Requisição para transcrição e resumo do YouTube
      response = await fetch('https://n8n-deploy-39k2.onrender.com/webhook/youtube/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      });

      if (!response.ok) throw new Error(`Erro: ${response.statusText}`);

      data = await response.json();

      // Ajustar conforme estrutura do retorno do seu workflow
      const resumo = data?.choices?.[0]?.message?.content || data;

      const li = document.createElement('li');
      li.textContent = resumo;
      transcriptionList.appendChild(li);

      caption.innerText = 'Transcrição do YouTube concluída!';
    } else if (audioFile) {
      // Requisição para transcrição do arquivo de áudio
      const formData = new FormData();
      formData.append('file', audioFile);

      response = await fetch('https://n8n-deploy-39k2.onrender.com/webhook/audio/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`Erro: ${response.statusText}`);

      data = await response.json();

      // Ajustar conforme retorno do seu workflow
      const transcript = data.transcript || JSON.stringify(data);

      const li = document.createElement('li');
      li.textContent = transcript;
      transcriptionList.appendChild(li);

      caption.innerText = 'Transcrição do áudio concluída!';
    }
  } catch (error) {
    console.error(error);
    alert('Erro ao processar a transcrição. Veja o console para detalhes.');
    caption.innerText = 'Falha na transcrição.';
  } finally {
    button.innerText = 'Transcrever';
    button.disabled = false;
  }
});