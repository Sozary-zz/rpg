<!-- <div class="jumbotron">
  <h1 class="display-3">Jeu de rôle</h1>
  <p class="lead">Ce service mis en place par l'APUI d'Avignon permet aux enseignant d'intéragir avec ses étudiants d'une tout nouvelle manière.</p>
  <hr class="my-4">
  <p>Vous pouvez, en tant qu'enseignant, créer un cours sous forme d'un jeu de rôle, où l'étudiant devra prendre les bonnes décisions afin d'arriver à la fin du jeu.</p>
  <p class="lead">
    <a class="btn btn-primary btn-lg" href="?action=create" role="button">Création de niveau</a>
    <a class="btn btn-primary btn-lg" href="?action=play" role="button">Jouer à un jeu de role</a>
  </p>
</div> -->
<div id="page">
  <div id="content">
    <span class="display-4 align-content">Jeu de role</span>
    <ul class="pres">
      <li class="appearance">Créez un scénario...</li>
      <li class="appearance">Ou importez un scénario...</li>
      <li class="appearance">Puis partagez le!</li>
      <li class="appearance"></li>
      <li class="appearance">
        <button id="center" class="btn btn-primary " type="button">
        Créer un nouveau scénario
      </button>
      </li>

      <li class="appearance">
        <button id="center" class="btn btn-primary " type="button">
      Jouer à un scénario
    </button></li>
    </ul>
  </div>
</div>
<script type="text/javascript">
  $(document).ready(function() {
    let appearance = () => {
      $('.pres li').each((i, el) => {
        setTimeout(() => {
          $(el).removeClass('appearance')
          $(el).addClass('appear-on')
        }, 200 + (i > 3 ? i - 1 : i) * 1000)
      })
    }
    appearance()


  })
</script>
