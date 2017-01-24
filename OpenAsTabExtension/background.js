// content.js
chrome.windows.getCurrent({}, function (w) {
  var mainwindow = w.id;
  chrome.windows.onCreated.addListener(function (w) {
    if (w.type == "popup") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action", "bool": matchRuleShort(w.tabs[0].url, "https://*.appway.com/admin/*")});
      });
      if(true) {
        chrome.windows.get(w.id, {populate: true}, function (w) {
          chrome.tabs.move(w.tabs[0].id, {windowId: mainwindow, index: -1}, function () {
            chrome.tabs.update(w.tabs[0].id, {active: true});
          });
        });
      }
    }
  });

  chrome.windows.onFocusChanged.addListener(function (w) {
    chrome.windows.get(w, {}, function (w) {
      if (w.type == "normal") {
        mainwindow = w.id;
      }
    });
  });
});

function matchRuleShort(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}
