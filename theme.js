(() => {
  let theme;
  try {
    theme = localStorage.getItem("rescue-theme");
  } catch {}
  document.documentElement.dataset.theme =
    theme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
})();
