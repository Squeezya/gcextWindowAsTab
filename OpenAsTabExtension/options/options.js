// Saves options to chrome.storage
function save_options() {
  var color = document.getElementById('color').value;
  chrome.storage.sync.set({
    whitelist: []
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    whitelist: [
      {
        pattern: "https://h-global-predev-cluster.appway.com/admin/*"
      }
    ]
  }, function(items) {
    display_list(items.whitelist);
  });
}

function display_list(whitelist) {
  var ul = document.getElementById("list");
  for (var i = 0; i < whitelist.length; i++) {
    var li = document.createElement("li");
    li.textContent =  whitelist[i].pattern;
    li.addEventListener('click', deleteItem, false);
    ul.appendChild(li);
  }
}

function deleteItem(e) {
  var status = document.getElementById('status');
  status.textContent = e;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
