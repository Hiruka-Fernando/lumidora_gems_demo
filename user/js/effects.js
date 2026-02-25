(function () {
  "use strict";

  function createStar() {
    const star = document.createElement("div");
    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    const size = Math.random() * 2 + 1.5;
    star.style.width = size + "px";
    star.style.height = size + "px";

    const shineDuration = (Math.random() * 8 + 4).toFixed(1);
    const delay = (Math.random() * 10).toFixed(1);

    const moveX = (Math.random() - 0.5) * 60;
    const moveY = -(Math.random() * 80);

    star.style.setProperty("--moveX", moveX + "px");
    star.style.setProperty("--moveY", moveY + "px");

    const driftDuration = (Math.random() * 10 + 8).toFixed(1);

    star.style.animation = `
      shine ${shineDuration}s ease-in-out ${delay}s infinite,
      drift ${driftDuration}s linear ${delay}s infinite
    `;

    const glow = Math.random() * 6 + 2;
    star.style.boxShadow = `0 0 ${glow}px 1px rgba(255,255,200,${Math.random() * 0.5 + 0.4})`;

    if (Math.random() < 0.15) {
      star.style.backgroundColor = "#fff2b5";
      star.style.boxShadow = `0 0 10px 2px rgba(212,175,55,0.4)`;
    }

    return star;
  }

  function generateNightSky() {
    const sky = document.getElementById("nightSky");
    if (!sky) return;

    sky.innerHTML = "";
    const starCount = window.innerWidth < 768 ? 150 : 280;

    for (let i = 0; i < starCount; i++) {
      sky.appendChild(createStar());
    }
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(generateNightSky, 200);
  });

  window.NightSky = {
    init: generateNightSky,
  };
})();
