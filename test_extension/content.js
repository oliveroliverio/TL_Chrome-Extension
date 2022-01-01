// alert("Grrrr.")
// use api chrome runtime
// anytime the message is sent, this function is called, request is the message sent
chrome.runtime.onMessage.addListener(function (request){
  alert(request)
})