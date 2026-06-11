const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  if (!button || !answer) return;

  button.addEventListener("click", () => {
    const willOpen = button.getAttribute("aria-expanded") !== "true";

    faqItems.forEach((otherItem) => {
      const otherButton = otherItem.querySelector(".faq-question");
      const otherAnswer = otherItem.querySelector(".faq-answer");

      if (!otherButton || !otherAnswer) return;

      otherButton.setAttribute("aria-expanded", "false");
      otherAnswer.setAttribute("aria-hidden", "true");
      otherItem.classList.remove("is-open");
    });

    if (willOpen) {
      button.setAttribute("aria-expanded", "true");
      answer.setAttribute("aria-hidden", "false");
      item.classList.add("is-open");
    }
  });
});

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
