<?php

require_once 'core/context.class.php' ;
require_once 'core/dbconnection.class.php' ;

function autoloadClassModel($class){
        global $nameApp;
        require_once $nameApp . '/model/' . $class . '.class.php';
}
spl_autoload_register('autoloadClassModel');

?>
