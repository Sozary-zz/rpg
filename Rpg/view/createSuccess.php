<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.2.12/cytoscape.js">
</script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.10/summernote.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.10/summernote.min.js"></script>
<script src="modules/cytoscape/cytoscape-navigator.js"></script>
<div id="page">
  <div id="content">
  </div>
  <ul class="left-menu">
    <li>
      <button type="button" class="btn btn-primary" onclick="_export()" name="button">Exporter</button>
      <input id="file-input" type="file" name="name" style="display: none;" />
    </li>
    <li>
      <button type="button" class="btn btn-primary" onclick="_import()" name="button">Importer</button>
    </li>
    <li>
      <button type="button" class="btn btn-primary" onclick="center()" name="button">Centrer</button>
    </li>
    <li>
      <button type="button" class="btn btn-primary" onclick="save()" name="button">Sauvegarder</button>
    </li>
  </ul>
  <div id="treeview">
  </div>
</div>
<div class="modal fade" id="newLeaf" data-id="" role="dialog" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Édition de la case scénario <span class="md-title"></span></h3>
        <div class="custom-close" data-dismiss="modal" onclick="setAsEdited()" aria-label="Close">
          <span class="arr-1"></span>
          <span class="arr-2"></span>
        </div>
      </div>
      <div class="modal-body">
        <small class="text-danger" id="empty">Des champs sont incomplets</small>
        <div class="form-group">
          <h3 class="text-muted">Donnez un titre</h3>
          <input class="form-control" id="title" type="text">
        </div>
        <div class="form-group">
          <h3 class="text-muted">Éditez le texte que vous voulez voir apparaître sur la case</h3>
          <textarea id="area_content" rows="8" cols="80"></textarea>


        </div>
        <hr>
        <button type="button" class="btn btn-primary btn-lg btn-block" onclick="loadPic()">Ajouter une image de fond</button>
        <img class="preview-pic" src="" alt="" width="400px">
        <hr>
        <div class="form-group">
          <h3 class="text-muted">Navigation</h3>
          <div id="navigator"></div>
        </div>

        <hr>
        <div class="questions">
          <div class="form-inline my-2 my-lg-0 askquestion">
            <input class="form-control mr-sm-2" id="questionAsked" placeholder="Question" type="text">
            <button id="addQuestionButton" class="btn btn-secondary my-2 my-sm-0" type="button" onclick="addQuestion()">Ajouter une question</button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" onclick="addFinal()" class="btn btn-secondary">Éditer</button>
        <button type="button" class="btn btn-secondary" onclick="setAsEdited()" data-dismiss="modal">Annuler</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="upPic" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Lien de l'image</h3>
        <div class="custom-close" data-dismiss="modal" aria-label="Close">
          <span class="arr-1"></span>
          <span class="arr-2"></span>
        </div>
      </div>
      <div class="modal-body">
        <small class="text-danger" id="empty-pic">Aucun image n'a été choisie</small>
        <div class="form-group">
          <h3 class="text-muted">Lien de l'image.</h3>
          <input class="form-control" id="pic-link" type="text">
        </div>
        <hr>
      </div>
      <div class="modal-footer">
        <button type="button" onclick="validatePic()" class="btn btn-secondary">Valider</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
      </div>
    </div>
  </div>
</div>
<script src="js/create_cy.js">
</script>
<script src="js/inline.js">
</script>
<script src="js/cy_events.js">
</script>
<script src="js/create.js">
</script>
<script type="text/javascript">
  applyEvents()
</script>
