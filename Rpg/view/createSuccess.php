<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.2.12/cytoscape.js">
</script>
<script src="modules/cytoscape/cytoscape-navigator.js"></script>
<div class="jumbotron">
  <h1 class="display-3">Espace création</h1>
  <div id="createchoice">
    <button class="btn btn-primary btn-lg btn-block" onclick="create()" type="button">Créer un niveau à partir de zéro</button>
    <button class="btn btn-primary btn-lg btn-lg btn-block" onclick="_import()" type="button">Créer un niveau à partir d'un fichier</button>
  </div>
  <p class="lead" id="createchoose"></p>
  <hr class="my-4">
  <button id="addbtn" class="btn btn-primary btn-lg btn-lg btn-block" onclick="add(this)" type="button">Ajouter</button>
  <button id="center" class="btn btn-primary btn-lg btn-lg btn-block" onclick="center(this)" type="button">Centrer</button>

  <div id="treeview">
  </div>

  <div class="modal fade" id="newLeaf" data-id="" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Édition de la case scénario <span class="md-title"></span></h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <small class="text-danger" id="empty">Des champs sont incomplets</small>
          <div class="form-group">
            <h3 class="text-muted">Donnez un titre</h3>
            <input class="form-control" id="title" type="text">
          </div>
          <div class="form-group">
            <h3 class="text-muted">Éditez le texte que vous voulez voir apparaître sur la case</h3>
            <textarea id="content" rows="8" cols="80"></textarea>
          </div>
          <hr>
          <button type="button" class="btn btn-primary btn-lg btn-block">Ajouter une image</button>

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
  <div class="modal fade" id="newLink" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Création d'une lien vers un scénario pour <span class="title-link"></span></h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <small class="text-danger" id="empty">Aucun scénario n'a été choisi</small>
          <div class="form-group">
            <h3 class="text-muted">Liste des scénarios disponible.</h3>
            <div id="scenarii">

            </div>
          </div>
          <hr>
        </div>
        <div class="modal-footer">
          <button type="button" onclick="addFinal()" class="btn btn-secondary">Créer</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
        </div>
      </div>
    </div>
  </div>


</div>
<script src="js/create_cy.js">
</script>
<script src="js/create.js">
</script>