<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;

class AbstractController extends Controller
{
  
  public $jsonBody = null;
  
  public function beforeAction($action)
  {
    $this->jsonBody = json_decode(Yii::$app->request->getRawBody());
    if ($this->jsonBody)
      $this->jsonBody = (array)$this->jsonBody;
    return parent::beforeAction($action);
  }
  
}