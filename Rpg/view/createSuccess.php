<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.2.12/cytoscape.js">
</script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.10/summernote-lite.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.10/summernote-lite.js"></script>
<script src="./js/zip/WebContent/zip.js" charset="utf-8"></script>

<script src="modules/cytoscape/cytoscape-navigator.js"></script>

<script type="text/javascript">
  var documentContent = {
    docHasBeenSave: {
      ok: false,
      name: ''
    },
    user: ''
  }
</script>
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
    <?php
    if ($_SESSION['connected']):?>
      <script type="text/javascript">
        documentContent.user = '<?php echo $_SESSION['usr'] ?>'
      </script>
      <li>
        <button type="button" class="btn btn-primary" onclick="getDirectoryContent('<?php echo  $_SESSION['usr'] ?>','save')" name="button">Sauvegarder</button>
      </li>
      <li>
        <button type="button" class="btn btn-primary" onclick="getDirectoryContent('<?php echo  $_SESSION['usr'] ?>','open')" name="button">Ouvrir</button>
      </li>
      <li>
        <button type="button" class="btn btn-primary" id="share-btn" name="button">Partager</button>
      </li>
      <?php else:?>
      <li>
        <a href="login.php">
          <button type="button" class="btn btn-primary" name="button">Connection</button>
        </a>
      </li>
      <?php endif; ?>
      <li>
        <button type="button" class="btn btn-primary" onclick="options()" name="button">Options</button>
      </li>
  </ul>
  <div id="treeview">
  </div>
</div>
<div class="modal fade" id="newLeaf" data-id="" role="dialog" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Édition de <span class="md-title"></span></h3>
        <div class="custom-close" data-dismiss="modal" onclick="setAsEdited()" aria-label="Close">
          <span class="arr-1"></span>
          <span class="arr-2"></span>
        </div>
      </div>
      <div class="modal-body">
        <small class="text-danger" id="empty">Des champs sont incomplets</small>
        <div class="form-group">
          <input class="spriet-input" id="title" placeholder="" type="text">
        </div>
        <div class="form-group">
          <h3 class="text-muted">Éditez le texte que vous voulez voir apparaître sur la case</h3>
          <textarea id="area_content" rows="8" cols="80"></textarea>
        </div>
        <hr>
        <button type="button" class="btn btn-primary btn-lg btn-block" onclick="loadPic()">Ajouter une image de fond</button>
        <img class="preview-pic" src="" alt="" width="400px">
        <!-- <hr>
        <div class="form-group">
          <h3 class="text-muted">Navigation</h3>
          <div id="navigator"></div>
        </div> -->

        <hr>
        <div class="questions">
          <div class="form-inline my-2 my-lg-0 askquestion">
            <input class="spriet-input" id="questionAsked" placeholder="Entrez un choix..." type="text">
            <button id="addQuestionButton" class="btn btn-secondary my-2 my-sm-0" type="button" onclick="addQuestion()">Ajouter un choix</button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" onclick="preview()" class="btn btn-secondary">Prévisualisation</button>
        <button type="button" onclick="addFinal()" class="btn btn-secondary">Enregistrer</button>
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
<div class="modal fade" id="options" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Options du projet</h3>
        <div class="custom-close" data-dismiss="modal" aria-label="Close">
          <span class="arr-1"></span>
          <span class="arr-2"></span>
        </div>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <h3 class="text-muted">Case scénario de départ</h3>
          <label for="exampleSelect1">Scénario</label>
          <select class="form-control" id="root-scenario">
          </select>
        </div>
        <div class="form-group">
          <h3 class="text-muted">Effet de transition</h3>
          <label for="exampleSelect1">Effet</label>
          <select class="form-control" id="trans-effect">
            <option>fade</option>
            <option>slide</option>
          </select>
        </div>
        <div class="form-group">
          <h3 class="text-muted">Durée de la transition</h3>
          <input id="trantion-duration" name="" value="1500" placeholder="Durée" type="number" required min="1">
        </div>
        <hr>
      </div>
      <div class="modal-footer">
        <button type="button" onclick="validateOption()" class="btn btn-secondary">Valider</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="save" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Sauvegarder</h3>
        <div class="custom-close" data-dismiss="modal" aria-label="Close">
          <span class="arr-1"></span>
          <span class="arr-2"></span>
        </div>
      </div>
      <div class="modal-body">
        <input type="text" class="custom-name" placeholder="Nom du fichier"><span class="save-btn"><span class="one"></span><span class="two"></span></span>
        <ul>
        </ul>
      </div>
      <div class="modal-footer ">
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="open" role="dialog" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Ouvrir</h3>
        <div class="custom-close" data-dismiss="modal" aria-label="Close">
          <span class="arr-1"></span>
          <span class="arr-2"></span>
        </div>
      </div>
      <div class="modal-body">
        <ul>
        </ul>
      </div>
      <div class="modal-footer ">
      </div>
    </div>
  </div>
</div>

<div class="share">
  <span>Votre lien</span>
  <div class="share-link"> </div>
</div>

<script src="js/anim.js ">
</script>
<script src="js/create_cy.js ">
</script>
<script src="js/inline.js ">
</script>
<script src="js/cy_events.js ">
</script>
<script src="js/create.js ">
</script>
<script type="text/javascript ">
  applyEvents()
</script>
