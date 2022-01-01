document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click',
  onclick, false)
  function onclick () {
    // need to connect to content.js script
    // use chrome api to query the current active tab
    chrome.tabs.query({currentWindow: true, active: true},
      // when query finishes, it gives all matching tabs (just one)
      function (tabs) {
        // send message to content script the tab ID (first one)
        chrome.tabs.sendMessage(tabs[0].id, 'hi')
        //jump back to content.js script
      })
  }
}, false)