/* ============================================================
   CONFIGURAÇÃO DO WHATSAPP
   ------------------------------------------------------------
   ⚠️ NÚMERO FICTÍCIO. Para um projeto real, substitua abaixo
   pelo número do cliente, no formato: 55 + DDD + número
   (somente dígitos). Exemplo: "5548999999999".
   Lembre-se de também trocar o número exibido na seção
   Contato do index.html e o href de fallback dos links.
   ============================================================ */
const WHATSAPP_NUMBER = "5548900000000";
const WHATSAPP_MESSAGE = "Olá! Vim pelo site demonstrativo da Nova Odonto e gostaria de mais informações.";

document.addEventListener("DOMContentLoaded", () => {
  /* Links do WhatsApp */
  const whatsUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.setAttribute("href", whatsUrl);
  });

  /* Menu mobile */
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", open);
  }

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 960) setMenu(false);
  });

  /* Sombra do header ao rolar */
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Link ativo do menu conforme a seção visível */
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = [...navLinks]
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((l) =>
              l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* Animações ao aparecer na tela */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* FAQ em accordion */
  const buttons = document.querySelectorAll(".accordion__btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      buttons.forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        document.getElementById(b.getAttribute("aria-controls")).classList.remove("open");
      });

      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        document.getElementById(btn.getAttribute("aria-controls")).classList.add("open");
      }
    });
  });

  /* Link "Número ilustrativo" (telefone fictício) leva à própria seção */
  document.querySelectorAll("[data-note]").forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
  });
});
