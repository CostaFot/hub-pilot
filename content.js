function postHelloViaUI() {
  // GitHub's main PR comment textarea
  const textarea = document.querySelector("#new_comment_field");
  if (!textarea) {
    alert("Hub Pilot: Could not find the comment box. Make sure you're on a PR page.");
    return;
  }

  // React tracks input via the native value setter — plain assignment won't trigger it
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value"
  ).set;
  nativeInputValueSetter.call(textarea, "hello");
  textarea.dispatchEvent(new Event("input", { bubbles: true }));

  // The form has multiple submit buttons ("Comment" and "Close pull request")
  // so match by text content rather than just type=submit
  const form = textarea.closest("form");
  const submitBtn = Array.from(form?.querySelectorAll('button[type="submit"]') ?? []).find(
    (btn) => btn.textContent.trim().toLowerCase() === "comment"
  );
  if (!submitBtn) {
    alert("Hub Pilot: Could not find the Comment submit button.");
    return;
  }

  submitBtn.click();
}

function injectButton() {
  if (document.getElementById("hub-pilot-hello-btn")) return;

  const btn = document.createElement("button");
  btn.id = "hub-pilot-hello-btn";
  btn.textContent = "Say Hello";
  btn.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    padding: 8px 16px;
    background: #2da44e;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  `;

  btn.addEventListener("click", postHelloViaUI);
  document.body.appendChild(btn);
}

// GitHub uses client-side navigation, so re-inject on URL changes
let lastURL = location.href;
injectButton();

const observer = new MutationObserver(() => {
  if (location.href !== lastURL) {
    lastURL = location.href;
    injectButton();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
