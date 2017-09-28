<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;

use app\models\Files;
use app\models\Media;

class MediaController extends AbstractController
{
  
  public function beforeAction($action)
  {            
      $this->enableCsrfValidation = false;
      return parent::beforeAction($action);
  }
  
  public function actionList()
  {
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    $sort = Yii::$app->request->get('sort', null);
    $direction = Yii::$app->request->get('direction', null);
    $q = Yii::$app->request->get('query', null);
    $query = Media::find();
    if ($sort)
    {
      switch($sort){
        case 'name':{
          $query->leftJoin('Files', 'Media.fileId = Files.id')
                ->orderBy(['Files.name' => $direction == 'desc' ? SORT_DESC :SORT_ASC]);
          break;
        }
        case 'mime':{
          $query->leftJoin('Files', 'Media.fileId = Files.id')
                ->orderBy(['Files.mime' => $direction == 'desc' ? SORT_DESC :SORT_ASC]);
          break;
        }
        case 'length':{
          $query->orderBy(['length' => $direction == 'desc' ? SORT_DESC :SORT_ASC]);
          break;
        }
      }
    }
    if ($q && !empty($q))
    {
      $fids = [];
      $flist = Files::find()->where(['LIKE', 'name', $q])->all();
      foreach($flist as $fli)
      {
        $fids[] = $fli->id;
      }
      $query->andWhere(['fileId' => $fids]);
    }
    $list = $query->with(['file'])->asArray()->all();
    return [
      'result' => true,
      'list' => $list
    ];
  }
  
  public function actionSave()
  {
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    if (isset($this->jsonBody['id']) && $this->jsonBody['id'])
    {
      $model = Media::find()->where(['id' => $this->jsonBody['id']])->one();
    }
    if (!(isset($model) && $model))
    {
      $model = new Media();
    }
    $model->attributes = $this->jsonBody;
    $file = Files::find()->where(['id' => $model->fileId])->one();
    $model->attributes = $file->getMediaParams();
    if ($model->save())
    {
      $file->name = $this->jsonBody['name'];
      $file->save();
      return [
        'result' => true
      ];
    }
    return [
        'result' => false
      ];
  }
  
  public function actionLoad()
  {
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    $id = Yii::$app->request->get('id', null);
    if ($id)
    {
      $model = Media::find()->where(['id' => $id])->with(['file'])->asArray()->one();
      if ($model)
      {
        $model['name'] = isset($model['file']['name']) ? $model['file']['name'] : '';
        return [
          'result' => true,
          'item' => $model
        ];
      }
    }
    return [
      'result' => false
    ];
  }
  
  public function actionDelete()
  {
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    $id = Yii::$app->request->get('id', null);
    if ($id)
    {
      $model = Media::find()->where(['id' => $id])->one();
      if ($model)
        $model->delete();
      return [
        'result' => true
      ];
    }
    return [
      'result' => false
    ];
  }
  
  public function actionUpload()
  {
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    if (isset($_FILES['file']) && isset($_FILES['file']['tmp_name']))
    {
      $fileId = Files::createFile($_FILES['file']);
      if ($fileId)
      {
        return [
          'result' => true,
          'fileId' => $fileId,
          'message' => 'Upload file success!'
        ];
      }
    }
    return [
      'result' => false,
      'message' => 'Upload file error!'
    ];
  }
  
}