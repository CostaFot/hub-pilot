function postHelloViaUI() {
  const textarea = document.querySelector("#new_comment_field");
  if (!textarea) {
    alert("Hub Pilot: Could not find the comment box. Make sure you're on a PR page.");
    return;
  }

  // Focus first so GitHub activates the form
  textarea.focus();

  // React tracks input via the native value setter — plain assignment won't trigger it
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value"
  ).set;
  nativeInputValueSetter.call(textarea, "hello");
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.dispatchEvent(new Event("change", { bubbles: true }));

  // Wait a tick for React to re-render and enable the submit button
  setTimeout(() => {
    const form = textarea.closest("form");
    const submitBtn = Array.from(form?.querySelectorAll('button[type="submit"]') ?? []).find(
      (btn) => btn.textContent.trim().toLowerCase() === "comment"
    );
    if (!submitBtn) {
      alert("Hub Pilot: Could not find the Comment submit button.");
      return;
    }
    // Force-enable in case React hasn't caught up yet
    submitBtn.disabled = false;
    submitBtn.click();
  }, 100);
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

function isPRPage() {
  return /^\/[^/]+\/[^/]+\/pull\/\d+/.test(location.pathname);
}

function removeButton() {
  document.getElementById("hub-pilot-hello-btn")?.remove();
}

function update() {
  if (isPRPage()) {
    injectButton();
  } else {
    removeButton();
  }
}

update();

// GitHub fires these events on client-side navigation
document.addEventListener("turbo:load", update);
document.addEventListener("soft-nav:end", update);
