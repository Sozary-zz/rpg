$('#questionAsked').keypress(function(e) {
  if (e.keyCode == 13)
    addQuestion()
})

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
})



control.addEventListener("change", function(event) {
  file = control.files[0]
  reader = new FileReader();
  var blob = file.slice(0, file.size);
  $('#treeview').animate({
    'opacity': '0'
  }, 300);


  reader.onloadend = function(evt) {
    if (evt.target.readyState == FileReader.DONE) {
      new_cy = JSON.parse(evt.target.result)
      cy = cytoscape({
        container: $('#treeview'),
        elements: new_cy.elements,
        style: new_cy.style,
      })
      $('#treeview').animate({
        'opacity': '1'
      }, 500);
      cy.layout({
        name: 'breadthfirst',
        directed: true,
        padding: 10,
        animate: false
      })
      center()
      applyEvents()
    }
  };
  reader.readAsBinaryString(blob);
}, false);

let applyEvents = () => {

  cy.on('click', 'node', function(evt) {
    edit(this);
  });

  cy.on('drag', 'node', function(e) {
    let trig = triggerElem(this)
    trig.forEach((el) => {
      if (!nodeInArray(el, hoveredNodes)) {
        hoveredNodes.push(el)
        el.addClass('hovered')
      }
    })
    for (let i = 0; i < hoveredNodes.length; i++)
      if (!nodeInArray(hoveredNodes[i], trig)) {
        hoveredNodes[i].removeClass('hovered')
        hoveredNodes.splice(i, 1)
      }
  });

  cy.on('free', 'node', function(e) {

    if (hoveredNodes.length != 0) {
      let selected = hoveredNodes[0]
      selected.removeClass('hovered')
      hoveredNodes = []

      cy.add([{
        group: "edges",
        data: {
          id: this.data('daddy') + 'E' + selected.id(),
          source: this.data('daddy'),
          target: selected.id()
        }
      }])
      this.remove()
      layout = cy.layout({
        name: 'breadthfirst', //cose?
        directed: true,
        padding: 10,
        animate: false
      })

    }
  })
}