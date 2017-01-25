// background.js
var whitelist = [];
restore_options();
chrome.windows.getCurrent({}, function (w) {
  var mainwindow = w.id;

  chrome.windows.onCreated.addListener(function (w) {
    if (w.type == "popup") {
      chrome.windows.get(w.id, {populate: true}, function (w) {
        if(w.tabs && w.tabs[0]) {
          var tabId = w.tabs[0].id;
          chrome.tabs.onUpdated.addListener(function(updatedTabId, info) {
            if(tabId == updatedTabId) {
              chrome.tabs.get(updatedTabId, function(tab) {
                if (info.hasOwnProperty("url") && info.url.trim() && matchesAnyUrl(info.url) && mainwindow.id != tab.windowId) {
                  movePopupToTabIn(mainwindow, tab.id);
                }
              });
            }
          });
        }
      });
    }
  });
  chrome.windows.onFocusChanged.addListener(function (w) {
    chrome.windows.get(w, {}, function (w) {
      if (w.type != "popup") {
        mainwindow = w.id;
      }
    });
  });
});

sendToContent = function (mainwindow, w) {
  chrome.tabs.query({active: true, highlighted: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "CURRENT_TAB" }, function(response){
      if (response == 'OK') {
        //yow
      }
    });
  });
};

matchesAnyUrl = function (str) {
  var matchesAny = false;
  for (var i = 0; i < whitelist.length; i++) {
    if(matchesUrl(str, whitelist[i])) {
      matchesAny = true;
      break;
    }
  }
  return matchesAny;
}

matchesUrl = function (str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
};

movePopupToTabIn = function (mainwindow, tabId) {
  chrome.tabs.move(tabId, {windowId: mainwindow, index: -1}, function (tab) {
    chrome.tabs.update(tab.id, {active: true});
  });
};

// ########## SAVES ##########
chrome.storage.onChanged.addListener(function(changes, namespace) {
  restore_options();
});

function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    whitelist: [
      {
        pattern: "*://*.google.com/*"
      }
    ]
  }, function(items) {
    whitelist = items.whitelist;
  });
}
// ######## END SAVES ########
