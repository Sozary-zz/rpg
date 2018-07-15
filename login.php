<?php

include_once('./CAS-1.3.5/CAS.php');


phpCAS::setDebug('log');

phpCAS::client(CAS_VERSION_2_0, 'cas.univ-avignon.fr', 443, '/cas');

phpCAS::setLang(PHPCAS_LANG_FRENCH);

phpCAS::setNoCasServerValidation();

phpCAS::forceAuthentication();

$auth = phpCAS::checkAuthentication();


if ($auth) {
    $_SESSION['connected'] = true;
    $_SESSION['usr'] = phpCAS::getUser();

    header('Location: http://209.97.134.204/rpg/?action=create');
}
