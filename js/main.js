(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector(".site-header");
  var intro = document.querySelector(".intro");

  /* Menu toggle ------------------------------------------------------------ */
  var btn = document.querySelector(".menu-btn");
  var panel = document.getElementById("menu-panel");
  function setMenu(open) {
    if (!btn || !panel) return;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    panel.classList.toggle("is-open", open);
  }
  if (btn && panel) {
    btn.addEventListener("click", function () {
      setMenu(btn.getAttribute("aria-expanded") !== "true");
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* Header state + intro scroll behaviour --------------------------------- */
  var ticking = false;
  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    if (intro) {
      var h = window.innerHeight;
      var p = Math.min(Math.max(y / h, 0), 1);
      if (!reduced) intro.style.setProperty("--p", p.toFixed(4));
      intro.classList.toggle("is-gone", p >= 1);
      var pastIntro = y >= h - 80;
      header.classList.toggle("is-solid", pastIntro);
      header.classList.toggle("is-intro", !pastIntro);
    } else {
      header.classList.toggle("is-solid", y > 10);
    }
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  /* Fade-up on scroll, once ------------------------------------------------ */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Missing-image placeholder --------------------------------------------- */
  function placeholder(img) {
    if (img.dataset.phDone) return;
    img.dataset.phDone = "1";
    var src = img.getAttribute("src") || "";
    var ph = document.createElement("div");
    ph.className = "ph";
    ph.setAttribute("role", "img");
    ph.setAttribute("aria-label", img.alt || "Image placeholder");
    ph.textContent = src.split("/").pop();
    var pic = img.closest("picture");
    (pic || img).replaceWith(ph);
  }
  document.querySelectorAll("img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) placeholder(img);
    img.addEventListener("error", function () { placeholder(img); });
  });
})();
