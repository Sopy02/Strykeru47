 /* =========================================================
     INTRO
     ========================================================= */

  const intro = document.getElementById('intro');

  function closeIntro(){

    intro.classList.add('hidden');

    /*
      După ce intro-ul dispare, încercăm din nou
      să pornim muzica.
    */
    if(audio.src){
      audio.play().catch(()=>{});
    }
  }

  intro.addEventListener('click', closeIntro);

  intro.addEventListener('touchstart', closeIntro, {
    passive:true
  });


  /* =========================================================
     ANIMATED BROWSER TAB TITLE
     ========================================================= */

  const browserTitle = "@Strykeru47";

  let titleIndex = 0;

  function typeBrowserTitle(){

    if(titleIndex <= browserTitle.length){

      document.title =
        browserTitle.substring(0,titleIndex);

      titleIndex++;

      setTimeout(
        typeBrowserTitle,
        270
      );

    }else{

      setTimeout(
        animateBrowserTitle,
        2000
      );

    }
  }


  let titleDirection = 1;


  function animateBrowserTitle(){

    /*
      1 = stanga -> dreapta
      -1 = dreapta -> stanga
    */

    if(titleDirection === 1){

      titleIndex++;

      if(titleIndex >= browserTitle.length){

        titleIndex = browserTitle.length;

        titleDirection = -1;

      }

    }else{

      titleIndex--;

      if(titleIndex <= 1){

        titleIndex = 1;

        titleDirection = 1;

      }

    }

    document.title =
      browserTitle.substring(0,titleIndex);

    setTimeout(
      animateBrowserTitle,
      800
    );
  }


  /*
    Pornim animatia titlului.
    Nu există "index.html" în nicio parte
    a codului JavaScript.
  */

  document.title = "";

  setTimeout(
    typeBrowserTitle,
    500
  );


  /* =========================================================
     AVATAR
     ========================================================= */

  const avatarSrc = "avatar.gif";

  const avatarImg =
    document.getElementById('avatarImg');

  const avatarPlaceholder =
    document.getElementById('avatarPlaceholder');

  if(avatarSrc){

    avatarImg.src = avatarSrc;

    avatarImg.style.display = 'block';

    avatarPlaceholder.style.display = 'none';

  }


  /* =========================================================
     PLAYLIST
     ========================================================= */

  const playlist = [

    {
      title:"lucawts & @DENIZWS - CEARCANE",
      src:"Muzica/lucawts & @DENIZWS - CEARCANE.mp3",
      artwork:"Thumbnails/cearcane.jpg"
    },

    {
      title:"Lucawats - PARANOIA",
      src:"Muzica/Lucawats - PARANOIA.mp3",
      artwork:"Thumbnails/paranoia.jpg"
    },

    {
      title:"Cercel - KAD!LAC 2",
      src:"Muzica/Cercel - KAD!LAC 2.mp3",
      artwork:"Thumbnails/kad!lac2.jpg"
    },

    {
      title:"MARKO GLASS -  Pare Usor",
      src:"Muzica/MARKO GLASS -  Pare Usor.mp3",
      artwork:"Thumbnails/pareusor.jpg"
    },

    {
      title:"COMANN x DZW$ x VALI MIRON - ASTA-I PROBLEMA",
      src:"Muzica/COMANN x DZW$ x VALI MIRON - ASTA-I PROBLEMA.mp3",
      artwork:"Thumbnails/astaiproblema.jpg"
    },

    {
      title:"@vanillasefu, @DENIZWS & @CERCEL - SPUNE-MI DACA",
      src:"Muzica/@vanillasefu, @DENIZWS & @CERCEL - SPUNE-MI DACA.mp3",
      artwork:"Thumbnails/spunemi.jpg"
    },

    {
      title:"IDK - mr. idcash",
      src:"Muzica/IDK - mr. idcash.mp3",
      artwork:"Thumbnails/idcash.jpg"
    },

    {
      title:"IDK - promint",
      src:"Muzica/IDK - promint.mp3",
      artwork:"Thumbnails/promit.jpg"
    },

    {
      title:"$atori Zoom - CATCH ONE",
      src:"Muzica/$atori Zoom - CATCH ONE.mp3",
      artwork:"Thumbnails/catchone.jpg"
    },

    {
      title:"VANILLA, @lucawts, @CERCEL & @berechett - LNPSTRD",
      src:"Muzica/VANILLA, @lucawts, @CERCEL & @berechett - LNPSTRD.mp3",
      artwork:"Thumbnails/lnpstrd.jpg"
    }

  ];


  let currentTrack = 0;


  const audio =
    document.getElementById('audio');

  const trackTitle =
    document.getElementById('trackTitle');

  const thumbImg =
    document.getElementById('thumbImg');

  const curTimeEl =
    document.getElementById('curTime');

  const totTimeEl =
    document.getElementById('totTime');

  const bar =
    document.getElementById('bar');

  const barFill =
    document.getElementById('barFill');

  const playBtn =
    document.getElementById('playBtn');

  const prevBtn =
    document.getElementById('prevBtn');

  const nextBtn =
    document.getElementById('nextBtn');


  const ICON_PLAY =
    '<svg viewBox="0 0 24 24">' +
    '<path d="M8 5v14l11-7z"/>' +
    '</svg>';


  const ICON_PAUSE =
    '<svg viewBox="0 0 24 24">' +
    '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>' +
    '</svg>';


  /* =========================================================
     PLAYER FUNCTIONS
     ========================================================= */

  function formatTime(sec){

    if(
      !isFinite(sec) ||
      sec < 0
    ){
      sec = 0;
    }

    const m =
      Math.floor(sec / 60);

    const s =
      Math.floor(sec % 60)
      .toString()
      .padStart(2,'0');

    return `${m}:${s}`;
  }


  function loadTrack(
    index,
    autoplay
  ){

    currentTrack =
      (index + playlist.length)
      % playlist.length;

    const track =
      playlist[currentTrack];


    trackTitle.textContent =
      track.title;


    thumbImg.src =
      track.artwork || "";


    thumbImg.style.display =
      track.artwork
        ? 'block'
        : 'none';


    curTimeEl.textContent =
      '0:00';


    totTimeEl.textContent =
      '0:00';


    barFill.style.width =
      '0%';


    if(track.src){

      audio.src =
        track.src;

      if(autoplay){

        audio
          .play()
          .catch(()=>{});

      }

    }else{

      audio.removeAttribute('src');

    }

  }


  audio.addEventListener(
    'loadedmetadata',
    () => {

      totTimeEl.textContent =
        formatTime(audio.duration);

    }
  );


  audio.addEventListener(
    'timeupdate',
    () => {

      curTimeEl.textContent =
        formatTime(audio.currentTime);

      if(audio.duration){

        barFill.style.width =
          (
            audio.currentTime /
            audio.duration *
            100
          ) + '%';

      }

    }
  );


  function setPlayIcon(html){

    playBtn.innerHTML =
      html;

    playBtn.classList.remove(
      'icon-swap'
    );

    void playBtn.offsetWidth;

    playBtn.classList.add(
      'icon-swap'
    );

  }


  audio.addEventListener(
    'play',
    () => {

      setPlayIcon(
        ICON_PAUSE
      );

    }
  );


  audio.addEventListener(
    'pause',
    () => {

      setPlayIcon(
        ICON_PLAY
      );

    }
  );


  audio.addEventListener(
    'ended',
    () => {

      loadTrack(
        currentTrack + 1,
        true
      );

    }
  );


  playBtn.addEventListener(
    'click',
    () => {

      if(!audio.src){
        return;
      }

      if(audio.paused){

        audio
          .play()
          .catch(()=>{});

      }else{

        audio.pause();

      }

    }
  );


  prevBtn.addEventListener(
    'click',
    () => {

      loadTrack(
        currentTrack - 1,
        !audio.paused
      );

    }
  );


  nextBtn.addEventListener(
    'click',
    () => {

      loadTrack(
        currentTrack + 1,
        !audio.paused
      );

    }
  );


  bar.addEventListener(
    'click',
    (e) => {

      if(!audio.duration){
        return;
      }

      const rect =
        bar.getBoundingClientRect();

      const ratio =
        (e.clientX - rect.left)
        / rect.width;

      audio.currentTime =
        ratio * audio.duration;

    }
  );


  loadTrack(
    0,
    false
  );


  /* =========================================================
     VOLUME
     ========================================================= */

  const volBtn =
    document.getElementById('volBtn');

  const volRange =
    document.getElementById('volRange');


  volRange.addEventListener(
    'input',
    () => {

      audio.volume =
        volRange.value / 100;

    }
  );


  audio.volume =
    volRange.value / 100;


  /* =========================================================
     AUTOPLAY
     ========================================================= */

  function attemptAutoplay(){

    if(!audio.src){
      return;
    }

    const p =
      audio.play();

    if(p && p.catch){

      p.catch(() => {

        const startOnInteract =
          () => {

            audio
              .play()
              .catch(()=>{});

            window.removeEventListener(
              'pointerdown',
              startOnInteract
            );

            window.removeEventListener(
              'keydown',
              startOnInteract
            );

          };


        window.addEventListener(
          'pointerdown',
          startOnInteract,
          {
            once:true
          }
        );


        window.addEventListener(
          'keydown',
          startOnInteract,
          {
            once:true
          }
        );

      });

    }

  }


  attemptAutoplay();


  /* =========================================================
     PARTICLES
     ========================================================= */

  const particlesEl =
    document.getElementById('particles');


  for(
    let i = 0;
    i < 16;
    i++
  ){

    const p =
      document.createElement('div');

    p.className =
      'particle';


    p.style.left =
      Math.random() * 100 + '%';


    p.style.top =
      Math.random() * 100 + '%';


    p.style.animationDelay =
      Math.random() * 3.5 + 's';


    p.style.animationDuration =
      (
        2.5 +
        Math.random() * 2
      ) + 's';


    particlesEl.appendChild(p);

  }


  /* =========================================================
     MOUSE PARALLAX
     ========================================================= */

  const bg =
    document.getElementById('bg');

  const parallax =
    document.getElementById('parallax');


  let targetX = 0;
  let targetY = 0;

  let curX = 0;
  let curY = 0;


  window.addEventListener(
    'mousemove',
    (e) => {

      targetX =
        (
          e.clientX /
          window.innerWidth
        ) * 2 - 1;


      targetY =
        (
          e.clientY /
          window.innerHeight
        ) * 2 - 1;

    }
  );


  window.addEventListener(
    'mouseleave',
    () => {

      targetX = 0;
      targetY = 0;

    }
  );


  function animate(){

    curX +=
      (
        targetX - curX
      ) * 0.06;


    curY +=
      (
        targetY - curY
      ) * 0.06;


    const rotateY =
      curX * 10;


    const rotateX =
      -curY * 10;


    const translateX =
      curX * 16;


    const translateY =
      curY * 12;


    parallax.style.transform =
      `translate3d(
        ${translateX}px,
        ${translateY}px,
        0
      )
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)`;


    bg.style.transform =
      `scale(1.08)
       translate(
         ${curX * -22}px,
         ${curY * -22}px
       )`;


    requestAnimationFrame(
      animate
    );

  }


  animate();

  /* =========================================================
   COPY EMAIL TO CLIPBOARD + TOAST POPUP
   ========================================================= */

(function () {
  const emailBtn = document.getElementById('emailBtn');
  if (!emailBtn) return;

  // creăm elementul de toast o singură dată
  const toast = document.createElement('div');
  toast.id = 'emailToast';
  toast.textContent = 'Email copiat';
  document.body.appendChild(toast);

  let hideTimeout = null;

  emailBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const email = emailBtn.getAttribute('data-email') || '';

    // copiere in clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(function () {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }

    showToast();
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();
    try {
      document.execCommand('copy');
    } catch (err) {}
    document.body.removeChild(tempInput);
  }

  function showToast() {
    // pozitionam toast-ul langa buton
    const rect = emailBtn.getBoundingClientRect();
    toast.style.left = rect.left + rect.width / 2 + 'px';
    toast.style.top = rect.top + 'px';

    toast.classList.add('show');

    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(function () {
      toast.classList.remove('show');
    }, 1800);
  }
})();
