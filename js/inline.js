var editing = cy.$('#1')
var navigating = false
var nav = cy.navigator(defaults)
var hoveredNodes = []

$('#empty').hide()
$('#empty-pic').hide()
$('#empty-pic-c').hide()
$('#empty-video').hide()
let control = document.getElementById("file-input")

$(document).ready(function() {
  setInterval(() => {
    $('#newLeaf').css('overflow-y', 'scroll')
  }, 1000)
  $('#area_content').summernote({
    placeholder: 'Texte du scénario',
    tabsize: 2,
    height: 100
  });
});