# 🎧 Transcrição de Vídeo com IA

Este projeto é um pipeline completo de transcrição e resumo de vídeos utilizando Inteligência Artificial.


📌 Objetivo

Automatizar o processo de:

1. Detecção de novos arquivos de áudio/vídeo no Google Drive
2. Transcrição do conteúdo usando IA
3. Geração de resumo automático
4. Armazenamento dos resultados
5. Exibição em tempo real em uma aplicação web



⚙️ Tecnologias Utilizadas

- [N8N](https://n8n.io/) - Automação de Workflows
- [Whisper API](https://platform.openai.com/docs/guides/speech-to-text) - Transcrição de áudio
- [GPT (OpenAI)](https://platform.openai.com/) - Resumo do conteúdo
- [Supabase](https://supabase.com/) - Banco de dados e autenticação
- [Google Drive API](https://developers.google.com/drive) - Detecção de novos arquivos
- [Vercel](https://vercel.com/) - Deploy da aplicação frontend
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Download de vídeos do YouTube 



🧠 Como Funciona

1. O usuário envia um arquivo de áudio ou vídeo para a pasta **"Audios"** no Google Drive.
2. O **N8N** detecta o novo arquivo.
3. O arquivo é transcrito usando **Whisper AI**.
4. O texto gerado é enviado para o **GPT** gerar um resumo.
5. Os dados são armazenados no **Supabase** (tabela: `transcricoes`).
6. A aplicação web consome os dados e exibe a transcrição e resumo em tempo real.

Confira aqui: https://transcricao-de-video-com-ia.vercel.app

![transcricao-de-video-com-ia](https://github.com/user-attachments/assets/58451679-c344-4ce8-9ce5-b2fd767b308f)
