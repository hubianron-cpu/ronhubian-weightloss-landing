(() => {
  "use strict";

  // Set the real checkout URL here when the payment page is ready.
  const purchaseUrl = "https://pay.grow.link/MjY1Mzg~c18e9387462b1d0a589992876af1f185-MzkzMDA4Nw";

  const track = (eventName, details = {}) => {
    const payload = { event: eventName, page: "21-days", ...details };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, details);
    }
  };

  document.querySelectorAll("[data-purchase-cta]").forEach((link) => {
    if (purchaseUrl) {
      link.href = purchaseUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#offer";
      link.addEventListener("click", () => track("purchase_link_missing_fallback"));
    }
  });

  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => track(element.dataset.track));
  });

  const offer = document.querySelector("#offer");
  if (offer && "IntersectionObserver" in window) {
    const offerObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          track("offer_view");
          offerObserver.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    offerObserver.observe(offer);
  }

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
