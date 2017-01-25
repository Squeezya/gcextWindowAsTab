// Saves options to chrome.storage
function save_options() {
  var whitelistText = document.getElementById('whitelistTextArea').value;
  var whitelistArray = whitelistText.split(/\n/);
  chrome.storage.sync.set({
    whitelist: whitelistArray
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    whitelist: [
      {
        pattern: "https://h-global-predev-cluster.appway.com/admin/*"
      }
    ]
  }, function(items) {
    document.getElementById('whitelistTextArea').value = items.whitelist.join("\n");
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
