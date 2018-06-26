$('#login').on('input', () => {
  if ($('#login').val() == "")
    $('.ok-btn').removeClass('active')
  else
  if (!$('.ok-btn').hasClass('active'))
    $('.ok-btn').addClass('active')
})

$('#login').keypress(function(e) {
  if (e.keyCode == 13)
    clearSpace()
})

let getNodeById = (id) => {
  for (let i = 0; i < result.elements.nodes.length; i++) {
    e = result.elements.nodes[i]
    if (e.data.id === id)
      return e
  }
  return undefined
}
let getNodeItemById = (id) => {
  let itms = document.querySelectorAll('.grid-item')
  for (let i = 0; i < itms.length; i++) {
    if (itms[i].dataset.id === id)
      return itms[i]
  }
  return undefined
}
let getChildren = (node) => {
  let children = []
  result.elements.edges.forEach((item) => {
    if (item.data.source == node.data.id)
      children.push([getNodeById(item.data.target), item.data.label])
  })
  return children
}
let viewportMoveTo = (n) => {
  let r = $(n).attr('data-row')
  let c = $(n).attr('data-column')

  $('#grid').animate({
    'top': 25 - 50 * r + '%',
    'left': 25 - 50 * c + '%',

  }, {
    duration: 1200,
    specialEasing: {
      width: "easeOutBounce",
      height: "easeOutBounce"
    }
  })

  $('#grid').transition({
    x: -5 - 10 * c + '%',
    y: -25 - 10 * r + '%',
    scale: [1, 1]
  });
  $(n).children('.frame-item').animate({
    'opacity': '1'
  }, 1600)
}

let selectAnswer = (answerId) => {


  $('#grid').transition({
    x: '0%',
    y: '0%',

    scale: [.5, .5]
  });

  viewportMoveTo(getNodeItemById(answerId))

}

let createGrid = () => {
  let i = 0;
  result.elements.nodes.forEach((item) => {

    let li = $('<li/>')
      .addClass('grid-item')
      .css('background', /*'linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)) ,*/ 'url(' + item.data.bkg + ') no-repeat center fixed')
      .css('background-size', 'cover')
      .attr('data-row', Math.floor(i / 3))
      .attr('data-column', i % 3)
      .attr('data-id', item.data.id)
      .appendTo($('#grid ul'));


    let img = new Image();
    img.onload = function() {
      imgLoadedCompt++
      if (imgLoadedCompt == result.elements.nodes.length) {
        viewportMoveTo($('.grid-item:first')[0]) // LOADED? GO
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


    getChildren(item).forEach((child) => {

      $('<li/>')
        .attr('data-node', child[0].data.id)
        .attr('onclick', 'selectAnswer(\'' + child[0].data.id + '\')')
        .addClass('answer-item')
        .text(child[1])
        .appendTo(ol);
    })
    i++
  })
  $('#grid').css('visibility', 'visible')
  $('#grid').css('display', 'block')

}

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {}
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

let curstomOnLoad = () => {
  let arr = window.location.href.split('=')
  if (window.location.href.includes('&id=')) {
    $.ajax({
      url: "?action=canIPlay&id=" + arr[arr.length - 1],
      success: function(_result) {
        result = JSON.parse(_result)
        $('nav').fadeOut()
        $('body').css('overflow', 'auto')
        $('#grid').css('display', 'none')

        $('.scenario-form').animate({
          'opacity': '1'
        }, 600);
      }
    })
  } else
    window.location.href = '/rpg/'
}