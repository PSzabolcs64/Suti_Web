//szelektor szerinti keresés, első elem
function $(selector, startElement = document) {
    return startElement.querySelector(selector);
  }
  
  //szelektor szerinti keresés, minden elem 
  function $$(selector, startElement = document) {
    return startElement.querySelectorAll(selector);
  }