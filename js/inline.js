var editing = cy.$('#1')
var navigating = false
// var nav = cy.navigator(defaults)
var hoveredNodes = []
var dirCtnt

var _options = {
  root: '',
  transition: 'fade',
  duration: 1500
}

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
    height: 300,
    popover: {
      image: [],
      link: [],
      air: []
    },
    toolbar: [
      // [groupName, [list of button]]
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontname']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture', 'video']],
      ['misc', ['codeview']],

    ]
  });
});