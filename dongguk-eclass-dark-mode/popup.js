const toggle = document.querySelector("#darkModeToggle");
const statusText = document.querySelector("#statusText");

function render(isEnabled) {
  toggle.checked = isEnabled;
  statusText.textContent = isEnabled ? "켜짐" : "꺼짐";
}

async function initialize() {
  try {
    const { darkModeEnabled = true } = await chrome.storage.local.get(
      "darkModeEnabled",
    );

    render(darkModeEnabled);
    toggle.disabled = false;
  } catch (error) {
    statusText.textContent = "설정을 불러오지 못했습니다.";
    console.error("다크 모드 설정을 불러오지 못했습니다.", error);
  }
}

toggle.addEventListener("change", async () => {
  const darkModeEnabled = toggle.checked;
  render(darkModeEnabled);

  try {
    await chrome.storage.local.set({ darkModeEnabled });
  } catch (error) {
    render(!darkModeEnabled);
    statusText.textContent = "설정을 저장하지 못했습니다.";
    console.error("다크 모드 설정을 저장하지 못했습니다.", error);
  }
});

initialize();
