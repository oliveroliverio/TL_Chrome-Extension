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
5. Done.


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