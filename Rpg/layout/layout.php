<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://bootswatch.com/4/materia/bootstrap.css">
  <link rel="stylesheet" href="css/stylesheet.css">
  <link rel="stylesheet" href="css/play.css">
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
  <script src="https://bootswatch.com/_vendor/jquery/dist/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  <script src="http://ricostacruz.com/jquery.transit/jquery.transit.min.js"></script>

  <link href="modules/cytoscape/cytoscape.js-navigator.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="css/menu.css">
  <title>Jeu de rôle</title>
</head>

<body style="opacity:0;overflow:hidden">

  <?php include($template_view); ?>


  <nav>
    <div class="menu">

      <div class="items">
        <div class="item">
          <a href="?action=welcome">Accueil</a>
        </div>
        <div class="item">
          <a href="?action=create">Créer</a>
        </div>
        <div class="item">
          <a href="?action=about">Contact</a>
        </div>
      </div>
      <div class="plus">
        <div class="display"></div>
      </div>

    </div>
  </nav>
  <script type="text/javascript">
    $('document').ready(function() {
      $('nav').click(() => {
        $('.menu').toggleClass('active')
      })
    })
    window.onload = () => {
      $('body').animate({
        'opacity': '1'
      }, 300)
      if(typeof curstomOnLoad !== "undefined")
        curstomOnLoad()

    }
  </script>


</body>

</html>
