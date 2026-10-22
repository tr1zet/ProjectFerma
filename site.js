const themeButton = document.querySelector("[data-theme-toggle]");
const menuButton = document.querySelector("[data-menu]");
const navigation = document.querySelector("#navigation");

function syncThemeButton() {
  const dark = document.documentElement.dataset.theme === "dark";
  themeButton?.setAttribute(
    "aria-label",
    dark ? "Включить светлую тему" : "Включить тёмную тему",
  );
  themeButton?.setAttribute("aria-pressed", String(dark));
}

themeButton?.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  try {
    localStorage.setItem("rescue-theme", nextTheme);
  } catch {}
  syncThemeButton();
});

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  navigation?.classList.toggle("open", open);
});

navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation?.classList.contains("open")) {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.focus();
  }
});

syncThemeButton();
