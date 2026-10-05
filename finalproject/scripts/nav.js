// Hamburger menu behaviour for small screens.
export function initNav() {
  const button = document.querySelector("#nav-toggle");
  const nav = document.querySelector("#primary-nav");
  if (!button || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
  };

  button.addEventListener("click", () => {
    setOpen(!nav.classList.contains("open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      button.focus();
    }
  });
}