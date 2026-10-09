/* ============================================================
   Ashok Budha — academic portfolio
   Minimal enhancement only: subtle one-shot reveals + year.
   Page is fully readable without JavaScript.
   ============================================================ */
document.documentElement.classList.add("js");

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* ---- theme toggle ---- */
    var root = document.documentElement;
    var btn = document.getElementById("themeBtn");
    var label = document.getElementById("themeLabel");

    function paint(theme) {
      var dark = theme === "dark";
      root.setAttribute("data-theme", theme);
      if (label) label.textContent = dark ? "Light" : "Dark";
      if (btn) btn.setAttribute("aria-pressed", String(dark));
    }
    paint(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

    if (btn) {
      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        paint(next);
        try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
      });
      /* follow the OS unless the visitor made an explicit choice */
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function (e) {
        var saved = null;
        try { saved = localStorage.getItem("theme"); } catch (err) { /* ignore */ }
        if (!saved) paint(e.matches ? "dark" : "light");
      };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var targets = Array.prototype.slice.call(document.querySelectorAll(".section"));

    if (reduce || !("IntersectionObserver" in window)) return;

    targets.forEach(function (el) { el.classList.add("reveal"); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(function (el) { io.observe(el); });
  });
})();
