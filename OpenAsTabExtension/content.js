chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    alert("asd");
    if( request.message === "clicked_browser_action" ) {
      alert("yo: " + request.bool);
    }
  }
);
