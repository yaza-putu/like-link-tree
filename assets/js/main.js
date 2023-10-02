document.addEventListener('DOMContentLoaded', function () {
  let targets = document.querySelectorAll('[data-target]');
  let playIcons = document.querySelectorAll('.main_a_item');
  let currentAudio = null;

  // Function untuk mengatur tampilan berdasarkan bahasa terpilih
  function setLanguage(targetId) {
    targets.forEach(element2 => {
      var target2 = document.querySelector(element2.dataset.target);
      element2.style.color = 'var(--menu_text_color)';
      target2.style.display = 'none';
    });
    document.querySelector(`[data-target="#${targetId}"]`).style.color = 'var(--menu_active_text_color)';
    document.querySelector(`#${targetId}`).style.display = 'flex';
    sessionStorage.setItem('selectedLanguage', targetId);
  }

  // Function untuk menangani klik pada gambar bahasa
  function handleLanguageImageClick(index) {
    const radio = document.getElementById(`header_nav_menu_item_${index}`);
    radio.checked = true;
  }

  targets.forEach(element => {
    element.addEventListener('click', () => {
      setLanguage(element.dataset.target.slice(1)); // Ambil id target dan lewati karakter '#'
    });
  });

  const languageRadios = document.querySelectorAll('.header_nav_menu_item');

  languageRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      sessionStorage.setItem('selectedLanguage', this.value);
    });
  });

  // Cek apakah ada bahasa terpilih di sessionStorage
  const selectedLanguage = sessionStorage.getItem('selectedLanguage');

  if (selectedLanguage) {
    setLanguage(selectedLanguage);
  } else {
    // Jika tidak ada bahasa terpilih, pilih bahasa default (English)
    document.getElementById('header_nav_menu_item_1').checked = true;
  }

  window.addEventListener('load', function () {
    const selectedLanguage = sessionStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      document.querySelector(`[data-target="#${selectedLanguage}"]`).checked = true;
    }
  });

  const numPairs = 3;

  for (let i = 1; i <= numPairs; i++) {
    const image = document.getElementById(`image-trigger_${i}`);
    image.addEventListener('click', function () {
      handleLanguageImageClick(i);
    });
  }

  // Function untuk memainkan audio dan mengubah ikon
  function playAudio(audio, playIcon) {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      playIcon.querySelector('i').classList.remove('fa-pause');
      playIcon.querySelector('i').classList.add('fa-volume-high');
    }

    if (audio !== currentAudio) {
      audio.play();
      currentAudio = audio;
      playIcon.querySelector('i').classList.remove('fa-volume-high');
      playIcon.querySelector('i').classList.add('fa-pause');
    } else {
      if (audio.paused) {
        audio.play();
        playIcon.querySelector('i').classList.remove('fa-volume-high');
        playIcon.querySelector('i').classList.add('fa-pause');
      } else {
        audio.pause();
        playIcon.querySelector('i').classList.remove('fa-pause');
        playIcon.querySelector('i').classList.add('fa-volume-high');
      }
    }
  }

  playIcons.forEach(function (playIcon) {
    playIcon.addEventListener('click', function () {
      const audio = this.querySelector('audio');
      playAudio(audio, this);
    });
  });
});