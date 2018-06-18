<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.2.12/cytoscape.js">
</script>

<style media="screen">
  #content {
    display: block;
    width: 500px;
    height: 500px;
    background-color: #defdef;
  }
</style>

<div id="content">

</div>


<script src="js/tree.js">

</script>

<script src="js/tree_create.js">

</script>
<script type="text/javascript">
let tree = new Tree({
  container:$('#content')
})
tree.create()
</script>
