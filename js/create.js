let center = () => {
  layout = cy.layout({
    name: 'breadthfirst', //cose?
    directed: true,
    padding: 10,
    animate: false
  })
  layout.run()
}

let loadPic = () => {
  $('#upPic').modal('show')
}
let validatePic = () => {
  if ($('#pic-link').val() == "")
    $('#empty-pic').fadeIn()
  else {
    $('.preview-pic').attr('src', $('#pic-link').val())
    $('.preview-pic').animate({
      'opacity': '1'
    }, 300);
    $('#upPic').modal('hide')
    $('#newLeaf').css('overflow-y', 'scroll')

  }
}
let save = () => {
  $.post("?action=saveJson", {
    data: JSON.stringify(cy.json())
  }, function(result) {
    console.log('saved')
    // callback()
  });
}

let _export = () => {
  var a = window.document.createElement('a');
  a.href = window.URL.createObjectURL(new Blob([JSON.stringify(cy.json())], {
    type: "application/json"
  }));
  a.download = 'Scenario.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

let _import = () => {
  $('#file-input').trigger('click');
}

let loadQuestion = () => {
  let children = cy.elements('edge[source="' + editing.id() + '"]')
  children.forEach((item) => {
    let _item = item
    item = item.target()
    $('.questions .askquestion').before(createQuestion(_item.data('label'), item.id()))
  })
}
let addNode = (title) => {
  let children = cy.elements('edge[source="' + editing.id() + '"]').length
  let new_node_name = editing.id() + '-' + (children + 1)

  cy.add([{
      group: "nodes",
      data: {
        id: new_node_name,
        title: "Noeud " + new_node_name,
        pic: 'http://209.97.134.204/rpg/images/script.png',
        shape: 'ellipse',
        bkg: editing.data('bkg'),
        content: '',
        daddy: editing.id()
      }
    },
    {
      group: "edges",
      data: {
        id: editing.id() + 'E' + new_node_name,
        source: editing.id(),
        target: new_node_name,
        label: title
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
  $('#area_content').val('')

  $('.preview-pic').attr('src', '')
  $('.preview-pic').css('opacity', '0')
  $('#pic-link').val('')
  $('.questions .btn-group').remove();
}
let setAsEdited = () => {
  editing.data('shape', 'roundrectangle')
  resetModal()
}


let addFinal = () => {
  if ($('#area_content').val() == "" || $('#title').val() == "") {
    $('#empty').fadeIn()
    return
  }


  editing.data('title', $('#title').val())
  editing.data('content', $('#area_content').summernote('code'))
  editing.data('bkg', $('.preview-pic').attr('src'))

  setAsEdited()
  $('#newLeaf').modal('hide')

}

let addQuestion = () => {
  let q = $('#questionAsked').val()
  let elem = $('#addQuestionButton')

  if (q != "") {
    let id = addNode(q)

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

let getParentBkg = (item) => {
  return cy.elements('node[id="' + cy.elements('edge[target="' + item.id() + '"]').data('source') + '"]')
}

let edit = (item) => {
  editing = item

  cy.fit(editing);

  $('.md-title').text(editing.data('title'))
  $('#title').val(editing.data('title'))

  $('#area_content').summernote('code', editing.data('content'))
  let parent = getParentBkg(item)

  editing.data('bkg', parent.data('bkg'))
  $('.preview-pic').attr('src', editing.data('bkg'))
  $('.preview-pic').css('opacity', 1)

  $('#newLeaf').attr('data-id', editing.id())
  $('#newLeaf').modal('show')

  loadQuestion()
}
let focusOnNode = (id) => {
  cy.fit(cy.$('#' + id));
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

function distanceTo(pos1, pos2) {
  return Math.sqrt(((pos1.x - pos2.x) ** 2) + ((pos1.y - pos2.y) ** 2));
}

function triggerElem(e) {
  let nodes = [];
  cy.elements("node").forEach((el) => {
    if (el.id() != e.id() && distanceTo(el.position(), e.position()) < 200)
      nodes.push(el)
  })
  return nodes;
}

function nodeInArray(node, arr) {
  for (let el of arr)
    if (node.id() == el.id())
      return true
  return false
}