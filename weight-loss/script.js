const whatsappPhone = "972532260062";
const whatsappMessage =
  "היי רון, ראיתי את התוכנית לירידה במשקל עם ההתחייבות לתוצאות ואני רוצה לבדוק התאמה.";
const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl;
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  if (!button || !answer) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    answer.hidden = isOpen;
    item.classList.toggle("is-open", !isOpen);
  });
});

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
    { threshold: 0.1 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
