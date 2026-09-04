const DARK_STYLESHEET_ID = "dongguk-eclass-dark-theme";
const DARK_STYLESHEET_URL = chrome.runtime.getURL("dark.css");

function findStylesheet() {
  return document.getElementById(DARK_STYLESHEET_ID);
}

function enableDarkMode() {
  if (findStylesheet()) return;

  const stylesheet = document.createElement("link");
  stylesheet.id = DARK_STYLESHEET_ID;
  stylesheet.rel = "stylesheet";
  stylesheet.href = DARK_STYLESHEET_URL;

  (document.head || document.documentElement).append(stylesheet);
}

function disableDarkMode() {
  findStylesheet()?.remove();
}

function applyDarkMode(isEnabled) {
  if (isEnabled) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

chrome.storage.local.get({ darkModeEnabled: true }, ({ darkModeEnabled }) => {
  applyDarkMode(darkModeEnabled);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes.darkModeEnabled) return;
  applyDarkMode(changes.darkModeEnabled.newValue);
});
