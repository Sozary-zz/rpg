function dynamicallyLoadScript(url) {
  var script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);
}

dynamicallyLoadScript('js/Tree/tree.js')
dynamicallyLoadScript('js/Tree/create.js')