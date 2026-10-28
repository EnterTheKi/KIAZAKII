(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const precepts = [
    "Accept everything exactly as it is.",
    "Do not seek pleasure for its own sake.",
    "Do not depend on any one feeling.",
    "Think lightly of yourself and deeply of the world.",
    "Be detached from desire, always.",
    "Do not regret what you have done.",
    "Never be jealous.",
    "Never let a parting break you.",
    "Keep no resentment toward yourself or others.",
    "Do not be ruled by longing.",
    "Hold no preference in all things.",
    "Be indifferent to where you live.",
    "Do not chase the taste of fine food.",
    "Keep nothing you no longer need.",
    "Do not act out of custom alone.",
    "Do not hoard tools beyond their use.",
    "Do not fear death.",
    "Do not cling to possessions in old age.",
    "Respect the gods without leaning on them.",
    "Abandon the body; preserve your honor.",
    "Never stray from the Way.",
  ];

  const header = document.querySelector(".site-head");
  const precept = document.getElementById("precept");
  const quote = document.getElementById("precept-quote");
  const number = document.getElementById("precept-num");
  const buttons = Array.from(document.querySelectorAll(".precept-nav button"));
  const progress = document.getElementById("scroll-progress");

  let active = 0;
  let changeTimer = 0;
  let progressQueued = false;

  const updateProgress = () => {
    progressQueued = false;
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    progress.style.transform = "scaleX(" + pct.toFixed(4) + ")";
  };

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    if (!progressQueued) {
      progressQueued = true;
      window.requestAnimationFrame(updateProgress);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
  updateProgress();

  const selectPrecept = (index, moveFocus = false) => {
    if (!quote || !number || index < 0 || index >= precepts.length) return;
    if (index === active) {
      if (moveFocus) buttons[index]?.focus();
      return;
    }

    active = index;
    buttons.forEach((button, i) => {
      const isActive = i === index;
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    if (moveFocus) buttons[index]?.focus();

    window.clearTimeout(changeTimer);
    precept?.classList.add("is-changing");
    changeTimer = window.setTimeout(() => {
      quote.textContent = precepts[index];
      number.textContent = String(index + 1).padStart(2, "0");
      precept?.classList.remove("is-changing");
    }, 170);
  };

  buttons.forEach((button, index) => {
    button.tabIndex = index === 0 ? 0 : -1;
    button.addEventListener("click", () => selectPrecept(index));
  });

  const nav = document.querySelector(".precept-nav");
  nav?.addEventListener("keydown", (event) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    let next = active;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (active + 1) % precepts.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (active - 1 + precepts.length) % precepts.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = precepts.length - 1;
    selectPrecept(next, true);
  });

  /* --- the scroll turns itself, unless the reader does --- */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion && buttons.length) {
    let manualCooldown = 0;
    buttons.forEach((button) => {
      button.addEventListener("click", () => { manualCooldown = Date.now() + 60000; });
    });
    nav?.addEventListener("keydown", () => { manualCooldown = Date.now() + 60000; });

    window.setInterval(() => {
      if (document.hidden || Date.now() < manualCooldown) return;
      if ((nav && nav.matches(":hover")) || (precept && precept.matches(":hover"))) return;
      selectPrecept((active + 1) % precepts.length);
    }, 10000);
  }

  /* --- easter eggs: the owl sees --- */

  console.log(
    "%cKIAZAKI%ckiazaki.com · Ki az a ki? — the owl watches. ↑↑↓↓←→←→BA",
    "background:#080807;color:#ff3b1f;font-family:monospace;font-size:16px;letter-spacing:3px;padding:5px 10px;border:1px solid rgba(236,231,221,.35);",
    "color:#c7c0b3;font-family:monospace;font-size:11px;padding:5px 8px;"
  );

  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let konamiIdx = 0;
  let wakeTimer = 0;
  const kickerAlt = document.querySelector(".kicker-alt");

  const wakeTheOwl = () => {
    document.body.classList.add("owl-wake");
    if (kickerAlt && !kickerAlt.dataset.locked) {
      kickerAlt.dataset.locked = "1";
      kickerAlt.dataset.original = kickerAlt.textContent;
      kickerAlt.textContent = "The owl sees you. — Wake. Watch. Return.";
      window.clearTimeout(wakeTimer);
      wakeTimer = window.setTimeout(() => {
        document.body.classList.remove("owl-wake");
        kickerAlt.textContent = kickerAlt.dataset.original || "";
        delete kickerAlt.dataset.locked;
      }, 8100);
    }
  };

  window.addEventListener("keydown", (event) => {
    const target = event.target;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
      konamiIdx = 0;
      return;
    }
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    konamiIdx = key === konami[konamiIdx] ? konamiIdx + 1 : key === konami[0] ? 1 : 0;
    if (konamiIdx === konami.length) {
      konamiIdx = 0;
      wakeTheOwl();
    }
  });

  const dot = document.querySelector(".hero-dot");
  const gloss = document.querySelector(".hu-en");
  const glossLines = [
    "— The one who watches.",
    "— The one who asks.",
    "— The one the question asks.",
  ];
  let dotClicks = 0;
  let dotClickTimer = 0;
  let glossIdx = 0;

  dot?.addEventListener("click", () => {
    dotClicks += 1;
    window.clearTimeout(dotClickTimer);
    dotClickTimer = window.setTimeout(() => { dotClicks = 0; }, 700);
    dot.classList.remove("is-pinging");
    void dot.offsetWidth;
    dot.classList.add("is-pinging");
    if (dotClicks >= 3) {
      dotClicks = 0;
      glossIdx = (glossIdx + 1) % glossLines.length;
      if (gloss) gloss.textContent = glossLines[glossIdx];
      console.log("%c — " + glossLines[glossIdx], "color:#ff3b1f;font-family:monospace;font-size:11px;letter-spacing:1px;");
    }
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const revealTargets = Array.from(document.querySelectorAll(".reveal"));
  const reveal = () => {
    const limit = window.innerHeight * 0.94;
    revealTargets.forEach((element) => {
      if (element.classList.contains("in")) return;
      if (element.getBoundingClientRect().top < limit) element.classList.add("in");
    });
  };

  window.addEventListener("scroll", reveal, { passive: true });
  window.addEventListener("resize", reveal);
  reveal();
})();
