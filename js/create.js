let center = () => {
  layout = cy.layout({
    name: 'breadthfirst', //cose?
    directed: true,
    padding: 10,
    animate: false
  })
  layout.run()
  if (cy.elements("node").length == 1)
    cy.zoom({
      level: 2.0, // the zoom level
      position: {
        x: 500,
        y: 300
      }
    });
}
let options = () => {
  $('#root-scenario').empty()
  cy.elements("node").forEach((el) => {
    $('#root-scenario').append($('<option>' + el.data('title') + '</option>'))
  })

  $('#options').modal('show')
}

let validateOption = () => {
  _options.root = cy.elements('node[title="' + $('#root-scenario').val() + '"]').id()
  _options.transition = $('#trans-effect').val()
  _options.duration = $('#trantion-duration').val() < 1 ? 1500 : $('#trantion-duration').val()
  $('#options').modal('hide')
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
let closePreview = () => {
  $('#grid').animate({
    'opacity': '0 !important'
  }, 100, function() {
    $('#grid').remove()
  })
}

let preview = () => {
  $('body').append($('<div id="grid" class="open-grid" style="background-color:black !important; z-index:9999; opacity:1 !important; visibility:visible !important;"><ul></ul></div>'))
  let li = $('<li/>')
    .addClass('grid-item')
    .css('background', 'url(' + $('.preview-pic').attr('src') + ') no-repeat center fixed')
    .css('background-size', 'cover')
    .appendTo($('#grid ul'));

  $('<div id="close-preview" onclick="closePreview()"></div>').append($('<div class="c1"></div>')).append($('<div class="c2"></div>')).appendTo($('#grid'));


  let frame = $('<div/>')
    .addClass('frame-item')
    .appendTo(li);
  let q = $('<div/>')
    .addClass('question-item')
    .html($('#area_content').summernote('code'))
    .appendTo(frame);
  let ol = $('<ol/>')
    .addClass('')
    .appendTo(frame);


  $('.questions').children().each((i, item) => {

    let btn_info = item.children[0].innerText
    if (btn_info != '') {
      $('<li/>')
        .addClass('answer-item')
        .text(btn_info)
        .appendTo(ol);
    }
  })

}
let formatJson = d => {
  d = JSON.stringify(d)
  // d = d.replace(/é/g, '&eacute;')
  // d = d.replace(/â/g, '&acirc;')
  // d = d.replace(/à/g, '&agrave;')
  // d = d.replace(/ê/g, '&ecirc;')
  // d = d.replace(/è/g, '&egrave;')
  // d = d.replace(/ë/g, '&euml;')
  // d = d.replace(/î/g, '&icirc;')
  // d = d.replace(/ù/g, '&ugrave;')

  return d
}

let clearUl = (type) => {
  $('#' + type + ' .modal-body ul').empty()
}

let fillShareInput = () => {
  if (documentContent.docHasBeenSave.ok) {
    $.ajax({
      url: "?action=getHash&user=" + documentContent.user + "&name=" + documentContent.docHasBeenSave.name,
      success: function(result) {
        if (result != "0x1") {
          if ($.trim($('.share-link').html()) == '') {
            let str = 'http://209.97.134.204/rpg/?action=play&id=' + result

            str.split('').forEach(item => {
              $('.share-link').append($('<div class="link-elem" >' + item + '</div>'))
            })

          }
        }
      }
    })
  } else {
    getDirectoryContent(documentContent.user, 'save')

  }
}


let openItem = (elem, user) => {
  $(elem).addClass('selected')
  $('#treeview').animate({
    'opacity': '0'
  }, 300);

  $.post("?action=getJson", {
    user: user,
    name: $(elem).text()
  }, function(result) {

    loadJson(JSON.parse(result))
    documentContent.docHasBeenSave = {
      ok: true,
      name: $(elem).text()
    }
  });


  setTimeout(() => {
    $(elem).removeClass('selected')
    clearUl('open')

  }, 300)
  setTimeout(() => {
    $("#open").modal('hide')
  }, 250)
}
let getDirectoryContent = (user, type) => {
  $.ajax({
    url: "?action=getDirectory&name=" + user,
    success: function(result) {
      let files = JSON.parse(result)
      for (let i = 0; i < files.length; i++)
        files[i] = files[i].split('.')[0]
      dirCtnt = {
        files: files,
        usr: user
      }
      clearUl(type)
      files.forEach(item => {
        $('#' + type + ' .modal-body ul').append($('<li onclick="' + (type === "open" ? 'openItem(this,\'' + user + '\')' : '') + '"><img src="./images/book.svg" width="100">' + item + '</li>'))
      })
      $('#' + type).modal('show')
    }
  })
}

let save = (user, name, callback) => {
  let d = cy.json()
  d['options'] = _options
  d = formatJson(d)

  $.post("?action=saveJson", {
    data: d,
    user: user,
    name: name
  }, function(result) {
    documentContent.docHasBeenSave = {
      ok: true,
      name: name
    }
    callback()
  });
}

let _export = () => {
  let d = cy.json()
  d['options'] = _options
  d = formatJson(d)

  $.post("?action=exportData", {
    data: d
  }, function(result) {

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = result;
    a.download = 'game.zip';
    a.click();
    document.body.removeChild(a);
  });
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
        pic: 'http://209.97.134.204/rpg/images/question.png',
        shape: 'ellipse',
        bkg: '',
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


  center()
}
let setAsEdited = () => {
  if (document.querySelector('.questions').children.length > 1) {
    if (editing.id() == '1')
      editing.data('shape', 'roundrectangle')
    if (editing.id() != '1')
      editing.data('pic', 'http://209.97.134.204/rpg/images/checked.png')
  } else {
    editing.data('shape', 'ellipse')
    if (editing.id() != '1')
      editing.data('pic', 'http://209.97.134.204/rpg/images/goal.png')
  }

  resetModal()
}


let addFinal = () => {
  if ($('#area_content').val() == "" || $('#title').val() == "") {
    $('#empty').fadeIn()
    return
  }


  editing.data('title', $('#title').val())
  editing.data('content', $('#area_content').summernote('code'))
  $('#area_content').summernote('destroy');


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
  let r = []
  cy.elements('edge[target="' + item.id() + '"]').forEach((item) => {
    r.push(cy.elements('node[id="' + item.data('source') + '"]'))
  })
  return r
}

let edit = (item) => {
  editing = item

  // cy.fit(editing);

  $('.md-title').text(editing.data('title'))
  $('#title').attr('placeholder', editing.data('title')).val("").focus().blur();

  $('#area_content').summernote('code', editing.data('content'))
  $('#newLeaf').find('.note-icon-caret').remove()
  if (editing.data('bkg') == "")
    getParentBkg(item).forEach(_item => {
      if (_item.data('bkg') != "")
        editing.data('bkg', _item.data('bkg'))
    })



  $('.preview-pic').attr('src', editing.data('bkg'))
  if ($('.preview-pic').attr('src') != "")
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