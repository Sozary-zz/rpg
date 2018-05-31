<?php
$nameApp = "Rpg";
$action = "welcome";

if(key_exists("action", $_REQUEST))
$action =  $_REQUEST['action'];

require_once 'lib/core.php';
require_once $nameApp.'/controller/mainController.php';
session_start();

$context = context::getInstance();
$context->init($nameApp);

$view=$context->executeAction($action, $_REQUEST);

if($view===false)
{
	echo "Une grave erreur s'est produite, il est probable que l'action ".$action." n'existe pas...";
	die;
}
elseif($view!=context::NONE)
{
	$template_view=$nameApp."/view/".$action.$view.".php";
	include($nameApp."/layout/".$context->getLayout().".php");
}

?>
