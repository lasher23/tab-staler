window.addEventListener("blur", () => chrome.runtime.sendMessage({type: "tab-deactivated"}))
window.addEventListener("focus", () => chrome.runtime.sendMessage({type: "tab-activated"}))