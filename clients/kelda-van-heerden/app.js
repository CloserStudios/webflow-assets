(() => {
  function init() {
    // Your Webflow custom code here
    console.log("Kelda script loaded");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();