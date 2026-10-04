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

  /* Fade-up on scroll, once. Siblings in a [data-stagger] group that enter
     together (same row) are offset by 90ms each. ------------------------- */
  var STEP = 90;
  var items = document.querySelectorAll(".reveal");
  function show(el, delay) {
    if (delay) el.style.transitionDelay = delay + "ms";
    el.classList.add("is-visible");
    // once shown, drop reveal/delay so hover transitions are not slowed
    window.setTimeout(function () {
      el.style.transitionDelay = "";
      if (el.classList.contains("card")) el.classList.remove("reveal");
    }, delay + 800);
  }
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      var seen = new Map(); // group -> tops already staggered
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var group = el.closest("[data-stagger]");
        var delay = 0;
        if (group) {
          var top = Math.round(el.getBoundingClientRect().top / 8);
          var key = seen.get(group) || (seen.set(group, {}), seen.get(group));
          var n = key[top] || 0;
          key[top] = n + 1;
          delay = n * STEP;
        }
        show(el, delay);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
    // section labels draw their accent line when the head enters view
    document.querySelectorAll(".section-head").forEach(function (el) {
      if (!el.classList.contains("reveal")) io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Intro quote: reveal line by line over ~1.2s ---------------------------- */
  var quote = document.getElementById("intro-quote");
  if (quote && !reduced) {
    var bq = quote.querySelector("blockquote");
    var cite = quote.querySelector("cite");
    var text = bq.textContent.trim();
    var played = false;

    var build = function (animate) {
      var words = text.split(/\s+/);
      bq.textContent = "";
      var spans = words.map(function (w) {
        var s = document.createElement("span");
        s.textContent = w;
        s.style.display = "inline-block";
        bq.appendChild(s);
        bq.appendChild(document.createTextNode(" "));
        return s;
      });
      var lines = [], lastTop = null, cur = null;
      spans.forEach(function (s) {
        if (lastTop === null || Math.abs(s.offsetTop - lastTop) > 4) {
          cur = []; lines.push(cur); lastTop = s.offsetTop;
        }
        cur.push(s.textContent + " ");
      });
      bq.textContent = "";
      var els = lines.map(function (ws, i) {
        var l = document.createElement("span");
        l.className = "qline";
        l.textContent = ws.join("").trim();
        bq.appendChild(l);
        if (i < lines.length - 1) bq.appendChild(document.createTextNode(" "));
        return l;
      });
      cite.classList.add("qline");
      els.push(cite);
      var step = els.length > 1 ? 500 / (els.length - 1) : 0; // 700ms + 500ms = 1.2s
      if (animate) els.forEach(function (l, i) { l.style.transitionDelay = Math.round(i * step) + "ms"; });
    };

    var start = function () {
      if (played) return;
      played = true;
      build(true);
      quote.classList.add("is-ready");
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { quote.classList.add("is-in"); });
      });
      // clear delays after the intro so nothing lingers
      window.setTimeout(function () {
        quote.querySelectorAll(".qline").forEach(function (l) { l.style.transitionDelay = ""; });
      }, 1500);
    };
    // re-split if the width changes (e.g. rotating a phone) so lines stay true
    var lastW = window.innerWidth, rt;
    window.addEventListener("resize", function () {
      window.clearTimeout(rt);
      rt = window.setTimeout(function () {
        if (played && window.innerWidth !== lastW) { lastW = window.innerWidth; build(false); }
      }, 200);
    });
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([ready, new Promise(function (r) { window.setTimeout(r, 1200); })]).then(start);
  }

  /* Primary buttons: cursor-follow glow (fine pointers only) -------------- */
  if (!reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var b = e.target.closest && e.target.closest(".btn--primary");
      if (!b) return;
      var r = b.getBoundingClientRect();
      b.style.setProperty("--mx", (e.clientX - r.left) + "px");
      b.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* Page transition: fade out 300ms before following an internal link ----- */
  if (!reduced) {
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target || a.hasAttribute("download")) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin || !/^https?:|^file:/.test(url.protocol)) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // same page / hash
      e.preventDefault();
      document.documentElement.classList.add("is-leaving");
      window.setTimeout(function () { location.href = url.href; }, 300);
    });
    // restore when coming back through the back/forward cache
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) document.documentElement.classList.remove("is-leaving");
    });
  }

  /* Insights: filter chips ------------------------------------------------ */
  var chips = document.querySelectorAll(".chip[data-filter]");
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
        document.querySelectorAll("#posts .card").forEach(function (card) {
          var show = f === "All" || card.getAttribute("data-tag") === f;
          card.hidden = !show;
          if (show) card.classList.add("is-visible");
        });
      });
    });
  }

  /* Contact: front-end only submit ---------------------------------------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var note = document.getElementById("form-note");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, first = null;
      form.querySelectorAll("[required]").forEach(function (f) {
        var bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) { ok = false; first = first || f; }
      });
      if (!ok) { note.hidden = true; first.focus(); return; }
      form.reset();
      note.hidden = false;
    });
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
