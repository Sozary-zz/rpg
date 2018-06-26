<?php
/*
 * Controler
 */

class mainController
{
    public static function welcome($request, $context)
    {
        return context::SUCCESS;
    }
    public static function about($request, $context)
    {
        return context::SUCCESS;
    }
    public static function play($request, $context)
    {
        return context::SUCCESS;
    }

    public static function canIPlay($request, $context)
    {
        echo file_get_contents($request['id'].'.json');
        return context::NONE;
    }
    public static function create($request, $context)
    {
        return context::SUCCESS;
    }
    public static function saveJson($request, $context)
    {
        if (isset($request['data'])) {
            file_put_contents(sha1($request['data']).'.json', $request['data']);
        }
        return context::NONE;
    }
}
