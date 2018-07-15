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
        $c=file_get_contents('config.cfg');
        $e=explode(PHP_EOL, $c);
        foreach ($e as $l) {
            $_n = explode(' ', $l);
            if ($_n[1]==$request['id']) {
                echo file_get_contents('users/'.$_n[0].'.json');
                return context::NONE;
            }
        }
        echo "0x1";
        return context::NONE;
    }
    public static function create($request, $context)
    {
        return context::SUCCESS;
    }

    public static function getDirectory($request, $context)
    {
        if (isset($request['name'])) {
            $r = scandir('users/'.$request['name']);
            if (!$r) {
                mkdir('users/'.$request['name']);
                echo json_encode(array());
            } else {
                array_shift($r);
                array_shift($r);

                echo json_encode($r);
            }
        }
        return context::NONE;
    }

    public static function saveJson($request, $context)
    {
        if (isset($request['data'],$request['user'],$request['name'])) {
            file_put_contents('users/'.$request['user'].'/'.$request['name'].'.json', $request['data']);
            file_put_contents('config.cfg', $request['user'].'/'.$request['name'].' '.substr(sha1($request['data'].$request['name']), 0, 5).PHP_EOL, FILE_APPEND | LOCK_EX);
        }

        return context::NONE;
    }
    public static function getJson($request, $context)
    {
        if (isset($request['user'],$request['name'])) {
            echo file_get_contents('users/'.$request['user'].'/'.$request['name'].'.json');
        }
        return context::NONE;
    }
    public static function getHash($request, $context)
    {
        if (isset($request['user'],$request['name'])) {
            $c=file_get_contents('config.cfg');

            $e=explode(PHP_EOL, $c);
            foreach ($e as $l) {
                // var_dump($_n[0]."=>".$request['user'].'/'.$request['name']);
                $_n = explode(' ', $l);
                if ($_n[0]==$request['user'].'/'.$request['name']) {
                    echo $_n[1];
                    return context::NONE;
                }
            }
        }
        echo "0x1";
        return context::NONE;
    }
    public static function exportData($request, $context)
    {
        if (isset($request['data'])) {
            exec('rm -rf temp/');
            $name = sha1($request['data']);
            $dir= 'temp/'.$name;
            mkdir($dir);
            file_put_contents($dir.'/data.json', $request['data']);

            $zip = new ZipArchive();
            $filename = $dir.'/archive.zip';

            if ($zip->open($filename, ZipArchive::CREATE)!==true) {
                echo "0x0";
                return context::NONE;
            }

            $zip->addFromString("data.json", $request['data']);
            $zip->addFile('temp/base/play.js', 'play.js');
            $zip->addFile('temp/base/index.html', 'index.html');
            $zip->addFile('temp/base/play.css', 'play.css');
            $zip->addFile('temp/base/replay.svg', 'replay.svg');

            $zip->close();
            echo $filename;
            return context::NONE;
        }
        return context::NONE;
    }
}
