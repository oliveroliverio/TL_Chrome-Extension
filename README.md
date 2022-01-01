# [How to make chrome extensions](https://www.youtube.com/watch?v=Ipa58NVGs_c)

## Basics
1. make test directory with manifest file

```json
{
  "name": "test",
  "version": "1.0",
  "manifest_version": 2
}
```

2. go to chrome extensions (`chrome://extensions`) in chrome browser and enable developer mode
3. click "load unpacked"
4. navigate to extension directory "test_extension", and "select" to load
5. click on puzzle icon, and pin it so it shows on taskbar
6. Done.


## Adding code
Most times, extensions insert JS when you visit a website.
1. Create content script file: `content.js` with alert message: `alert("Grrrr.")
2. Update manifest file to load script
   - Specify matches key.  Matches patterns of urls you want to run script on or all urls
   - Then specify script to run on that URL

```json
{
  "name": "test",
  "version": "1.0",
  "manifest_version": 2,
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```
3. Go back to `chrome://extensions`, refresh, go to another page, look at pop.
4. Done

## More Useful code
Goal: count how many times the word "bear" appears in document
1. Make small pop up button that will count when pressed.
2. Create `popup.html` and `popup.js`

popup.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button>Count Bears</button>
  <script src="popup.js" charset="utf-8"> </script>
</body>
</html>
```

3. Modify manifest.json to include the popup html`

```js
{
  "name": "test",
  "version": "1.0",
  "manifest_version": 2,
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "browser_action": {
    "default_popup": "popup.html",
    "default_title": "Bear"
  }
}
```

4. Modify popup js to send message to content script.  Onclick

```js
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
```

5. Modify content script

content.js
```js
// alert("Grrrr.")
// use api chrome runtime
// anytime the message is sent, this function is called, request is the message sent
chrome.runtime.onMessage.addListener(function (request){
  alert(request)
})
```

6. Done, doesn't send "hi" message when clicked.  Doing something else