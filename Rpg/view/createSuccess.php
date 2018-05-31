<div class="jumbotron">
  <h1 class="display-3">Espace création</h1>
  <div id="createchoice">
    <button class="btn btn-primary btn-lg btn-block" onclick="create()" type="button">Créer un niveau à partir de zéro</button>
    <button class="btn btn-primary btn-lg btn-lg btn-block" onclick="_import()" type="button">Créer un niveau à partir d'un fichier</button>
  </div>
  <p class="lead" id="createchoose"></p>
  <hr class="my-4">
  <button id="addbtn" class="btn btn-primary btn-lg btn-lg btn-block" onclick="add(this)" type="button">Ajouter</button>

  <div id="treeview">

  </div>

  <div class="modal fade" id="newLeaf" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Création d'une nouvelle case scénario</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <small class="text-danger" id="empty">Des champs sont incomplets</small>
          <div class="form-group">
            <h3 class="text-muted">Donnez un titre.</h3>
            <input class="form-control" id="title" placeholder="Titre" type="text">
          </div>
          <div class="form-group">
            <h3 class="text-muted">Écrivez le texte que vous voulez voir apparaître sur la case.</h3>
            <textarea id="content" rows="8" cols="80"></textarea>
          </div>
          <hr>
          <button type="button" class="btn btn-primary btn-lg btn-block">Ajouter une image</button>
          <hr>
          <div class="questions">
            <div class="form-inline my-2 my-lg-0 askquestion">
              <input class="form-control mr-sm-2" id="questionAsked" placeholder="Question" type="text">
              <button id="addQuestionButton" class="btn btn-secondary my-2 my-sm-0" type="button" onclick="addQuestion()">Ajouter une question</button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" onclick="addFinal()" class="btn btn-secondary">Créer</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="selectLink">
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="border-radius:20px !important;">
        <div class="modal-header">
          <h5 class="selectLink-title"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h3 class="lead text-muted ">Liste des liaisons possibles.</h3>
          <div class="links-choose" data-choose=""></div>
          <div class="choice lead text-muted">Vous n'avez fait aucun choix</div>
        </div>
        <div class="modal-footer">
          <button type="button" id="savelink" onclick="saveLink()" data-dismiss="modal" class="btn btn-primary">Sauvegarder</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="js/create.js">
</script>