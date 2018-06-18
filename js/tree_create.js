Tree.prototype.create = function() {
  this.cy = cytoscape({
    container: this.option.container,
    elements: {
      nodes: [{
        data: {
          id: '1',
          title: 'racine',
          daddy: undefined,
          pic: 'http://209.97.134.204/rpg/images/sprout.png',
          shape: 'ellipse',
          content: ''
        }
      }],
      edges: []
    },
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'label': 'data(title)',
          'width': '200px',
          'height': '200px',
          'shape': 'data(shape)',
          'background-fit': 'cover',
          'background-image': 'data(pic)',
          'background-color': 'white',
          'color': 'white',
          'text-valign': 'center',
          'text-halign': 'center',
          'font-size': '2.4em',
          'text-wrap': 'wrap',
          'text-max-width': '170px',
          'font-family': '"Roboto", Arial',
          'text-background-shape': 'roundrectangle',
          'text-background-color': 'black',
          'text-background-opacity': '.56',
          'text-background-padding': '15px',
          'text-border-opacity': '.24',
          'text-border-width': '5px',
          'text-border-color': 'black',
          'text-border-style': 'solid',
          'text-outline-width': '3',
          'text-outline-color': '#ccc',
          'transition-property': 'width,height',
          'transition-duration': '.1s'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 10,
          'line-color': '#bbb',
          'curve-style': 'bezier',
          'opacity': 1,
          'target-arrow-shape': 'triangle',
          'source-arrow-shape': 'circle',
          'target-arrow-color': '#bbb',
          'target-arrow-shape': 'triangle'
        }
      }
    ],


  });

  this.layout = this.cy.layout({
    name: 'breadthfirst', //cose?
    directed: true,
    padding: 10,
    animate: false
  })
  this.layout.run()
  this.cy.fit(this.cy.$('#1'));


  this.cy.on('click', 'node', function(evt) {
    edit(this);
  });
};