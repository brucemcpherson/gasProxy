function doGet(e) {

  var result = work (e);
  var s = JSON.stringify(result);

  // publish result
  return ContentService
    .createTextOutput(result.proxy.params.callback ? result.proxy.params.callback + "(" + s + ")" : s )
    .setMimeType(result.proxy.params.callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON); 
}
/**
 * do the work
 * @param {object} e the doget object
 * @param {string} e.parameter.url the url
 * @param {string} e.parameter.options any options
 * @param {string} e.parameter.callback the callback
 * @return {object} the result 
 */
function work (e) {
  
  // for testing
  //e=e||{parameter:{url:"https://storage.googleapis.com/xliberation.com/cdn/data/us-states.json"}};
  var result = {
    proxy:{
      params:e ? e.parameter : null
    },
    result:{}
  }
  
  if (!e || !e.parameter || !e.parameter.url) {
    result.proxy.error = "no url specified";
  }
  else {
    var options = e.parameter.options ? JSON.parse(e.parameter.options) : {method:"GET"}
    var response;
    options.muteHttpExceptions = true;
    try {
      response = UrlFetchApp.fetch(result.proxy.params.url, options);
      result.result = response.getContentText();
      result.responseCode = response.getResponseCode();
    }
    catch (err) {
      result.proxy.error = err;
    }

  }
  return result;
}