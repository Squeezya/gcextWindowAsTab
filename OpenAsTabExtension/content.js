// content.js
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.message) {
    switch(msg.message) {
      case "CURRENT_TAB":
        sendResponse('OK');
        break;
      case "POPUP_TAB":
        sendResponse('OK');
        break;
    }

  }
  return true;
});
