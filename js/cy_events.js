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

let loadJson = (json) => {
  new_cy = json
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

let readZip = (r) => {
  console.log(r);
  zip.createReader(new zip.BlobReader(r), function(reader) {
    console.log('ww');
    // get all entries from the zip
    reader.getEntries(function(entries) {
      if (entries.length) {

        // get first entry content as text
        entries[0].getData(new zip.TextWriter(), function(text) {
          // text contains the entry data as a String
          console.log(text);

          // close the zip reader
          reader.close(function() {
            // onclose callback
          });

        }, function(current, total) {
          // onprogress callback
        });
      }
    });
  }, function(error) {
    // onerror callback
  });
}

control.addEventListener("change", function(event) {
  file = control.files[0]
  readZip(file)
  reader = new FileReader();
  var blob = file.slice(0, file.size);

  $('#treeview').animate({
    'opacity': '0'
  }, 300);


  reader.onloadend = function(evt) {
    if (evt.target.readyState == FileReader.DONE) {

      loadJson(JSON.parse(evt.target.result))
    }
  };
  reader.readAsBinaryString(blob);
}, false);

let applyEvents = () => {

  cy.on('click', 'node', function(evt) {
    edit(this);
  });

  cy.on('mouseover', 'node', function(evt) {

    this.addClass('mouseon')

  });
  cy.on('mouseout', 'node', function(evt) {
    this.removeClass('mouseon')
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
          target: selected.id(),
          label: cy.elements('edge[target="' + this.id() + '"][source="' + this.data('daddy') + '"]').data('label'),
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