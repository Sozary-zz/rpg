$('li[name=create]').addClass('active')
$('#createchoose').hide()
$('#treeview').hide()
$('#empty').hide()
$('#addbtn').hide()
$('#center').hide()

$("#title").keyup(function() {
  $('#empty').fadeOut()
});
$("#content").keyup(function() {
  $('#empty').fadeOut()
});
$("#questionAsked").keyup(function() {
  if ($("#addQuestionButton").hasClass('btn-danger')) {
    $("#addQuestionButton").toggleClass('btn-danger btn-secondary')
    $("#addQuestionButton").text('Ajouter une question')
  }
});

var editing
var navigating = false
let gap = $('body').width() - ($('#addbtn').position().left + $('#addbtn').width())
$('#treeview').css('width', $('#addbtn').width() - gap)
$('#treeview').css('height', $(window).height() - 4 * $('nav').height())


let center = () => {
  layout = cy.layout({
    name: 'breadthfirst', //cose?
    directed: true,
    padding: 10,
    animate: false

  })
  layout.run()
}
let focusOnNode = (id) => {
  cy.fit(cy.$('#' + id));
}
let presFadeOut = (text, callback) => {
  $('#createchoice').fadeOut()
  $('.jumbotron>h1').fadeOut()
  $('.jumbotron>hr').fadeOut()
  $('#createchoice').fadeOut()
  $('#createchoose').text(text)
  setTimeout(() => {
    $('#treeview').fadeIn()
    $('#center').fadeIn()

    callback()
  }, 400)
}
let loadQuestion = () => {
  let children = cy.elements('edge[source="' + editing.id() + '"]')
  children.forEach((item) => {
    item = item.target()
    $('.questions .askquestion').before(createQuestion(item.data('title'), item.id()))
  })

}

let edit = (item) => {
  editing = item
  cy.fit(editing);

  $('.md-title').text(editing.data('title'))
  $('#title').val(editing.data('title'))

  $('#content').val(editing.data('content'))
  $('#newLeaf').attr('data-id', editing.id())
  $('#newLeaf').modal('show')

  loadQuestion()
}



let create = () => {
  presFadeOut("Création à partir de zéro.", () => {

  })
}
let addNode = (title) => {
  let children = cy.elements('edge[source="' + editing.id() + '"]').length
  let new_node_name = editing.id() + '-' + (children + 1)
  cy.add([{
      group: "nodes",
      data: {
        id: new_node_name,
        title: title,
        pic: 'http://209.97.134.204/rpg/images/script.png',
        shape: 'ellipse',
        content: '',
        daddy: editing.id()
      }
    },
    {
      group: "edges",
      data: {
        id: editing.id() + 'E' + new_node_name,
        source: editing.id(),
        target: new_node_name
      }
    }
  ])
  layout = cy.layout({
    name: 'breadthfirst', //cose?
    directed: true,
    padding: 10,
    animate: false

  })
  layout.run()
  return new_node_name

}
let resetModal = () => {
  $('#title').val('')
  $('#title').attr('value', '')
  $('#content').val('')
  $('.questions .btn-group').remove();
}
let setAsEdited = () => {
  editing.data('shape', 'roundrectangle')
  resetModal()
}

let addFinal = () => {
  if ($('#content').val() == "" || $('#title').val() == "") {
    $('#empty').fadeIn()
    return
  }


  editing.data('title', $('#title').val())
  editing.data('content', $('#content').val())
  setAsEdited()
  $('#newLeaf').modal('hide')

}

let _import = () => {
  presFadeOut("Création à partir d'un fichier.", () => {

  })
}
let deleteQuestion = (id, elem) => {
  let r = cy.$('#' + id)
  let f = elem.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id
  if (f !== r.data('daddy')) {
    let edge = f + 'E' + r.id()
    cy.elements("edge").forEach((el) => {
      if (el.id() === edge) {
        el.remove()

      }
    })
  } else
    r.remove()


  layout = cy.layout({
    name: 'breadthfirst', //cose?
    directed: true,
    padding: 10,
    animate: false

  })
  layout.run()
  $(elem).fadeOut(300, function() {
    $(this).remove();
  });
}
let createQuestion = (content, id) => {
  let text = '<div class="btn-group" data-id="' + id + '" role="group" style="width:100%;margin:5% 4% 5% 4%;">'
  text += '<button type="button"  onclick="focusOnNode(\'' + id + '\')" class="btn btn-info">' + content + '</button>'
  text += '<div class="btn-group" role="group">'
  text += '<button id="btnGroupDrop3" type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>'
  text += '<div class="dropdown-menu" aria-labelledby="btnGroupDrop3">'
  text += '<button type="button" class="dropdown-item" onclick="deleteQuestion(\'' + id + '\', this.parentNode.parentNode.parentNode)">Supprimer</button>'
  text += '</div></div></div>'

  return text
}

let addQuestion = () => {
  let q = $('#questionAsked').val()
  let elem = $('#addQuestionButton')

  if (q != "") {

    let id = addNode(q)
    console.log(q, '=>', id);
    $('.questions .askquestion').before(createQuestion(q, id))
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


$('#questionAsked').keypress(function(e) {
  if (e.keyCode == 13)
    addQuestion()

})