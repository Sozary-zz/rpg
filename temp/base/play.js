$('#login').on('input', () => {
  if ($('#login').val() == "")
    $('.ok-btn').removeClass('active')
  else
  if (!$('.ok-btn').hasClass('active'))
    $('.ok-btn').addClass('active')
})
$('#login').on('input', function() {
  console.log('d');
})


$('#login').keypress(function(e) {
  if (e.keyCode == 13)
    clearSpace()
})

let getNodeItemById = (id) => {
  let itms = document.querySelectorAll('.grid-item')
  for (let i = 0; i < itms.length; i++) {
    if (itms[i].dataset.id === id)
      return [itms[i], i]
  }
  return undefined
}

let getNodeById = (id) => {
  for (let i = 0; i < result.elements.nodes.length; i++) {
    e = result.elements.nodes[i]
    if (e.data.id === id)
      return e
  }
  return undefined
}
let getChildren = (node) => {
  let children = []
  if (result.elements.edges == undefined)
    return undefined
  result.elements.edges.forEach((item) => {
    if (item.data.source == node.data.id)
      children.push([getNodeById(item.data.target), item.data.label])
  })
  return children
}

let replay = () => {
  $('.replay').animate({
    'opacity': '0'
  }, 400, function() {
    $('.replay').toggleClass('active')
    $('.replay').css('opacity', '1')
    selectAnswer('1')
  })

}
let resetItems = (item) => {
  if (currentShow != undefined) {
    $(currentShow[0]).css('visibility', 'hidden')
    $(currentShow[0]).animate({
      'top': currentShow[1] * 100 + 'vh'
    }, 1, function() {
      $(currentShow[0]).css('visibility', 'visible')
    })
  }
  currentShow = item
}
let selectAnswer = (id) => {

  let item = getNodeItemById(id)

  switch (result['options'].transition) {
    case 'fade':
      $('#grid').animate({
          'opacity': '0'
        }, 100,
        function() {
          $($('#grid ul')).css('top', -item[1] * 100 + 'vh')
          $('#grid').animate({
            'opacity': '1'
          }, result['options'].duration)
        })
      break
    case 'slide':
      $($('#grid ul')).animate({
        'top': -item[1] * 100 + 'vh'
      }, result['options'].duration)

      break

  }
  currentShow = item
  setTimeout(() => {
    if (currentShow[0].children[0].children[1].children.length == 0) {
      if (!$('.replay').hasClass('active'))
        $('.replay').addClass('active')

    }
  }, result['options'].duration)

}

let start = (elem) => {
  $($('#grid ul')).css('top', -elem[1] * 100 + 'vh')
  $('#grid').animate({
    'opacity': '1'
  }, 400)

}

let createGrid = () => {
  let i = 0;
  result.elements.nodes.forEach((item) => {

    let li = $('<li/>')
      .addClass('grid-item')
      .css('background', 'url(' + item.data.bkg + ') no-repeat center fixed')
      .css('background-size', 'cover')
      .attr('data-id', item.data.id)
      .appendTo($('#grid ul'));


    let img = new Image();
    img.onload = function() {
      imgLoadedCompt++
      if (imgLoadedCompt == result.elements.nodes.length) {
        start(getNodeItemById('1')) // LOADED? GO
      }
    }
    img.src = item.data.bkg;
    if (img.complete) img.onload();


    let frame = $('<div/>')
      .addClass('frame-item')
      .appendTo(li);
    let q = $('<div/>')
      .addClass('question-item')
      .html(item.data.content)
      .appendTo(frame);
    let ol = $('<ol/>')
      .addClass('')
      .appendTo(frame);

    let __gc = getChildren(item)
    if (__gc != undefined) {
      __gc.forEach((child) => {

        $('<li/>')
          .attr('data-node', child[0].data.id)
          .attr('onclick', 'selectAnswer(\'' + child[0].data.id + '\')')
          .addClass('answer-item')
          .text(child[1])
          .appendTo(ol);
      })
    }
    i++
  })
  $('#grid').css('visibility', 'visible')
  $('#grid').css('display', 'block')
}

let clearSpace = () => {
  $('.scenario-form').addClass('goodbye')
  $('.ok-btn').addClass('goodbye')
  setTimeout(() => {
    $('.scenario-form').css('visible', 'hidden')
  }, 1000)
  setTimeout(() => {
    $('.ok-btn').css('visible', 'hidden')
  }, 400)
  createGrid()
}
