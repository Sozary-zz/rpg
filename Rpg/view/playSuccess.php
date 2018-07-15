<script type="text/javascript">
  var result
  var imgLoadedCompt = 0

  var currentShow = undefined
</script>
<div id="panel">
  <div class="scenario-form">
    <div class="form-group">
      <h3>Entrez votre nom</h3>
      <input class="form-control" id="login" type="text">
    </div>
  </div>
  <div class="ok-btn">
    <button type="button" class="btn btn-secondary" onclick="clearSpace()">Jouer</button>
  </div>
  <div id="grid">
    <div class="replay" onclick="replay()"><img src="images/replay.svg" alt=""></div>
    <ul></ul>
  </div>
</div>
<script type="text/javascript">
  window.onscroll = function(e) {
    console.log(e);
  }
</script>
<script src="js/play.js" charset="utf-8"></script>