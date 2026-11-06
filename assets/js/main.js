(function () {
  "use strict";

  /* Mobile menu */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");

  function setMenu(open) {
    nav.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("menu-open"));
  });
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });

  /* Gentle fade-in as sections scroll into view */
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    revealed.forEach(function (node) {
      observer.observe(node);
    });
  } else {
    revealed.forEach(function (node) {
      node.classList.add("is-in");
    });
  }

  /* Copy email */
  var copy = document.getElementById("copy-email");
  if (navigator.clipboard) {
    copy.hidden = false;
    copy.addEventListener("click", function () {
      navigator.clipboard.writeText(copy.dataset.email).then(function () {
        copy.textContent = "Copied";
        setTimeout(function () {
          copy.textContent = "Copy email";
        }, 2000);
      });
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
