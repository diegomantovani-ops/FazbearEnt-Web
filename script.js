document.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bg-music');
  const audioToggle = document.getElementById('audio-toggle');
  const audioIcon = document.getElementById('audio-icon');
  const audioText = document.getElementById('audio-text');

  
  bgMusic.volume = 0.3;

  
  function updateAudioUI(isPaused) {
    if (isPaused) {
      audioIcon.textContent = '🔇';
      audioText.textContent = 'MÚSICA: OFF';
      audioToggle.classList.add('muted');
    } else {
      audioIcon.textContent = '🔊';
      audioText.textContent = 'MÚSICA: ON';
      audioToggle.classList.remove('muted');
    }
  }

  
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
     
      updateAudioUI(true);

      const enableAudioOnFirstClick = () => {
        bgMusic.play().then(() => {
          updateAudioUI(false);
        }).catch(err => console.log("Aguardando interação...", err));

        document.removeEventListener('click', enableAudioOnFirstClick);
      };

      document.addEventListener('click', enableAudioOnFirstClick);
    });
  }

  
  audioToggle.addEventListener('click', (event) => {
    event.stopPropagation();

    if (bgMusic.paused) {
      bgMusic.play();
      updateAudioUI(false);
    } else {
      bgMusic.pause();
      updateAudioUI(true);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const backroomsTrigger = document.getElementById('backrooms-trigger');
  const backroomsOverlay = document.getElementById('backrooms-overlay');
  const backroomsAudio = document.getElementById('backrooms-audio');
  const bgMusic = document.getElementById('bg-music'); 

  if (backroomsTrigger) {
    backroomsTrigger.addEventListener('click', () => {
     
      if (bgMusic && !bgMusic.paused) {
        bgMusic.pause();
      }

      
      backroomsOverlay.style.display = 'flex';

     
      if (backroomsAudio) {
        backroomsAudio.currentTime = 0;
        backroomsAudio.volume = 0.8;
        backroomsAudio.play().catch(err => console.log('Erro ao tocar áudio:', err));
      }

      
      setTimeout(() => {
        location.reload(); 
      }, 5500);
    });
  }
});