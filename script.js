document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("backgroundMusic");
  const flipSound = document.getElementById("pageFlipSound");
  const soundToggle = document.getElementById("soundToggle");
  const popup = document.getElementById("lovePopup");
  const loveButton = document.getElementById("loveButton");
  const closePopup = document.getElementById("closePopup");

  const pageFlip = new St.PageFlip(document.getElementById("book"), {
    width: 380,
    height: 540,
    size: "stretch",
    minWidth: 290,
    maxWidth: 760,
    minHeight: 420,
    maxHeight: 540,
    showCover: true,
    mobileScrollSupport: false,
    maxShadowOpacity: 0.5,
    usePortrait: true
  });
  pageFlip.loadFromHTML(document.querySelectorAll(".page"));
  pageFlip.on("flip", () => {
    flipSound.currentTime = 0;
    flipSound.play().catch(() => {});
  });

  const setMusic = (playing) => {
    soundToggle.classList.toggle("playing", playing);
    soundToggle.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
    soundToggle.innerHTML = playing ? "♫ <span>Music on</span>" : "♪ <span>Music</span>";
  };
  soundToggle.addEventListener("click", () => {
    if (music.paused) music.play().then(() => setMusic(true)).catch(() => setMusic(false));
    else { music.pause(); setMusic(false); }
  });
  music.addEventListener("pause", () => setMusic(false));
  music.addEventListener("play", () => setMusic(true));

  const openPopup = () => { popup.hidden = false; closePopup.focus(); };
  const hidePopup = () => { popup.hidden = true; loveButton.focus(); };
  loveButton.addEventListener("click", openPopup);
  closePopup.addEventListener("click", hidePopup);
  popup.addEventListener("click", (event) => { if (event.target === popup) hidePopup(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !popup.hidden) hidePopup(); });

  const hearts = document.getElementById("hearts");
  const petals = document.getElementById("petals");
  for (let i = 0; i < 16; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = i % 3 === 0 ? "♡" : "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 18}px`;
    heart.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);
    heart.style.animationDuration = `${9 + Math.random() * 10}s`;
    heart.style.animationDelay = `${-Math.random() * 18}s`;
    hearts.appendChild(heart);
  }
  for (let i = 0; i < 22; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    petal.style.animationDuration = `${8 + Math.random() * 11}s`;
    petal.style.animationDelay = `${-Math.random() * 16}s`;
    petals.appendChild(petal);
  }
});
