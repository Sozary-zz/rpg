$('li[name=create]').addClass('active')
$('#createchoose').hide()
$('#treeview').hide()
$('#empty').hide()
$('#addbtn').hide()

$("#title").keyup(function() {
  $('#empty').fadeOut()
});
$("#content").keyup(function() {
  $('#empty').fadeOut()
});

var tree = []
var grid
var tmp = {
  title: "",
  text: "",
  questions: [],
  children: [],
  id: undefined,
  parents: []
}

let presFadeOut = (text, callback) => {
  $('#createchoice').fadeOut()
  $('#createchoose').text(text)
  setTimeout(() => {
    $('#createchoose').fadeIn()
    $('#treeview').fadeIn()
    $('#addbtn').fadeIn()
    callback()
  }, 400)
}
let add = (item) => {
  $('#newLeaf').modal('show')
}

let create = () => {
  presFadeOut("Création à partir de zéro.", () => {
    tree = []
  })
}



let addQuestion = () => {
  let q = $('#questionAsked').val()
  let elem = $('#addQuestionButton')

  if (q != "") {
    tmp.questions.push(q)

    let text = '<div class="btn-group" role="group" style="width:100%;margin:5% 4% 5% 4%;">'
    text += '<button type="button" class="btn btn-info">' + q + '</button>'
    text += '<div class="btn-group" role="group">'
    text += '<button id="btnGroupDrop3" type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>'
    text += '<div class="dropdown-menu" aria-labelledby="btnGroupDrop3">'
    text += '<button type="button" class="dropdown-item" onclick="linkEditor(this)">Lier</button>'
    text += '<button type="button" class="dropdown-item" onclick="deleteQuestion(this)">Supprimer</button>'
    text += '</div></div></div>'



    $('.questions .askquestion').before(text)
    $('#questionAsked').val('')
    if (elem.hasClass('btn-danger')) {
      elem.removeClass('btn-danger')
      elem.addClass('btn-secondary')
      elem.text('Ajouter une question')
    }
  } else {
    if (elem.hasClass('btn-secondary')) {
      elem.text('Question invalide')
      elem.removeClass('btn-secondary')
      elem.addClass('btn-danger')
    }
  }
}
let deleteQuestion = (item) => {
  let real_elem = item.parentNode.parentNode.parentNode
  real_elem.parentNode.removeChild(real_elem)
}
let linkEditor = (item) => {
  $('.links-choose').empty()
  $('.selectLink-title').text('Selection de lien pour la question: ' + item.parentNode.parentNode.parentNode.children[0].innerText)
  for (let i = 0; i < tree.length; i++) {
    if (tmp.id != undefined) {
      if (tmp.id != tree[i].id) {
        $('.links-choose').append('<button type="button" onclick="thisLink(this)" class="btn btn-primary btn-lg btn-block">' + tree[i].title + '</button>')
      }
    } else {
      $('.links-choose').append('<button type="button" onclick="thisLink(this)" class="btn btn-primary btn-lg btn-block">' + tree[i].title + '</button>')

    }

  }
  $('#savelink').prop('disabled', true);
  $('#selectLink').modal('show')

}
let thisLink = (item) => {
  $(item).prop('disabled', true);
  $('#savelink').prop('disabled', false);
  $('.links-choose').attr('data-choose', $(item).text())
  $('.choice').text('Vous avez choisi: ' + $(item).text())
}

let saveLink = () => {
  if (tmp.id === undefined) {

  }
}

let addFinal = () => {
  if ($('#content').val() == "" || $('#title').val() == "") {
    $('#empty').fadeIn()
    return
  }
  tmp.text = $('#content').val()
  tmp.title = $('#title').val()

  tmp.id = Math.random().toString(36).substr(2, 9)
  if (tree.length == 0)
    tree.push(tmp)
  else {
    // TODO: creer les fils si pas racine
  }
  let data = '<div class="elem"><div class="elem-title">' + tmp.title + '</div><div class="thumbnail"><img src=""></div><h3 style="text-align:center" class="text-muted">Relations</h3><div class="links">'
  for (let i = 0; i < tmp.questions.length; i++)
    data += '<button type="button" class="qelem btn btn-warning">' + tmp.questions[i] + '</button>'
  data += "</div>"
  $('#treeview').prepend(data)


  $('#newLeaf').modal('hide')
  $('#title').val('')
  $('#content').val('')
  $('.questions .btn-group').remove();
  tmp = {
    title: "",
    text: "",
    questions: [],
    children: [],
    id: undefined,
    parents: []
  }
}

let _import = () => {
  presFadeOut("Création à partir d'un fichier.", () => {

  })
}




function orderItems() {
  var itemElems = grid.packery('getItemElements');
  console.log(itemElems);
  console.log('b');
  $(itemElems).each(function(i, itemElem) {
    $(itemElem).text(i + 1);
  });
}



$('#questionAsked').keypress(function(e) {
  if (e.keyCode == 13)
    addQuestion()
})