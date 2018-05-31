<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://bootswatch.com/4/materia/bootstrap.css">
  <link rel="stylesheet" href="css/stylesheet.css">
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
  <script src="https://bootswatch.com/_vendor/jquery/dist/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>


  <title>Jeu de rôle</title>
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="?action=welcome">Jeu de rôle</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" name="create">
          <a class="nav-link" href="?action=create">Créer un jeu de rôle</a>
        </li>
        <li class="nav-item" name="play">
          <a class="nav-link" href="?action=play">Jouer à un jeu de rôle</a>
        </li>
        <li class="nav-item" name="about">
          <a class="nav-link" href="?action=about">A propos</a>
        </li>
      </ul>
    </div>
  </nav>
  <?php include($template_view); ?>

</body>

</html>
