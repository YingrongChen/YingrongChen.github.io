(() => {
  const portrait = document.querySelector(".poster-portrait");
  const image = portrait?.querySelector("img");
  if (!portrait || !image) return;

  const preload = new Image();
  preload.src = image.dataset.catSrc;

  let showingCat = false;
  let lastTap = 0;
  let swapTimer;

  function togglePortrait() {
    showingCat = !showingCat;
    window.clearTimeout(swapTimer);
    portrait.classList.add("is-swapping");

    swapTimer = window.setTimeout(() => {
      image.src = showingCat ? image.dataset.catSrc : image.dataset.personSrc;
      image.alt = showingCat ? "Lady the cat" : "Yingrong Chen";
      portrait.setAttribute("aria-pressed", String(showingCat));
      portrait.setAttribute("aria-label", showingCat ? "Show Yingrong Chen" : "Show Lady the cat");
      portrait.title = showingCat ? "Double-click to return to Yingrong" : "Double-click to meet Lady";
      portrait.classList.remove("is-swapping");
    }, 160);
  }

  portrait.addEventListener("dblclick", togglePortrait);

  portrait.addEventListener("pointerup", (event) => {
    if (event.pointerType !== "touch") return;
    const now = Date.now();
    if (now - lastTap < 350) togglePortrait();
    lastTap = now;
  });

  portrait.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    togglePortrait();
  });
})();