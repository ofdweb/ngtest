<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;

class TemplatesController extends Controller
{
  
  public function actionMediaList()
  {
    return $this->renderPartial('_media_list');
  }
  
  public function actionMediaEdit()
  {
    return $this->renderPartial('_media_edit');
  }
  
}