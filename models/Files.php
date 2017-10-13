<?php

namespace app\models;

use Yii;
use yii\helpers\Inflector;

/**
 * This is the model class for table "Files".
 *
 * @property integer $id
 * @property string $name
 * @property integer $size
 * @property string $path
 * @property string $mime
 * @property string $dateAdd
 * @property string $hash
 */
class Files extends \yii\db\ActiveRecord
{
  
    public static $dir = '/files';
    
    public $formats = [
      'image' => ['image/png', 'image/gif'],
      'audio' => ['audio/mp3'],
      'video' => ['video/quicktime']
    ];
  
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'Files';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'size', 'path', 'mime', 'dateAdd', 'hash'], 'required'],
            [['name', 'path', 'mime'], 'string'],
            [['size'], 'integer'],
            [['dateAdd'], 'safe'],
            [['hash'], 'string', 'max' => 40],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'size' => 'Size',
            'path' => 'Path',
            'mime' => 'Mime',
            'dateAdd' => 'Date Add',
            'hash' => 'Hash',
        ];
    }
  
    public static function createFile($file)
    {
      $model = new self();
      $model->name = $file['name'];
      $model->mime = $file['type'];
      $model->size = $file['size'];
      $model->hash = sha1_file($file['tmp_name']);
      $path = self::$dir . '/' . sha1_file($file['tmp_name']) . '_' . \app\components\StringHelper::transliterate($model->name);
      move_uploaded_file($file['tmp_name'], (Yii::getAlias('@webroot') . $path));
      $model->path = $path;
      $model->dateAdd = date("Y-m-d H:i:s", time());
      $model->save();
      return $model->id;
    }
  
    public function createFileFromBase64($baseCode, $fileName)
    {
      $fileBase = base64_decode($baseCode);
      $path = '/tmp/' . $fileName;
      
      file_put_contents($path, $fileBase);
       
      $file = [
        'name' => $fileName,
        'type' => mime_content_type($path),
        'size' => filesize($path),
        'tmp_name' => $path
      ];
      
      return self::createFile($file);
    }
  
    public function getFullPath()
    {
      return Yii::getAlias('@webroot') . $this->path;
    }
  
    public function isVideo()
    {
      return strpos($this->mime, 'video') !== false;
    }
  
    public function isAudio()
    {
      return strpos($this->mime, 'audio') !== false;
    }
  
    public function isImage()
    {
      return strpos($this->mime, 'image') !== false;
    }
  
    public function getMediaParams()
    {
      $res = [
        'width' => 0,
        'height' => 0,
        'length' => 0
      ];
      if ($this->isImage())
      {
        $size = getimagesize($this->getFullPath());
        if (isset($size[0]) && isset($size[1]))
        {
          $res['width'] = $size[0];
          $res['height'] = $size[1];
        }
      }
      if ($this->isAudio())
      {
        $time = exec("ffmpeg -i " . escapeshellarg($this->getFullPath()) . " 2>&1 | grep 'Duration' | cut -d ' ' -f 4 | sed s/,//");
        list($hms, $milli) = explode('.', $time);
        list($hours, $minutes, $seconds) = explode(':', $hms);
        $total_seconds = ($hours * 3600) + ($minutes * 60) + $seconds;
        $res['length'] = $total_seconds;
      }
      if ($this->isVideo())
      {
        $logfile = Yii::getAlias('@webroot') . '/files/' . sha1(microtime()) . '.log';
        exec("ffmpeg -i " . escapeshellarg($this->getFullPath()) . " -vstats 2>$logfile");
        $output = file_get_contents($logfile);
        $regex_sizes = "/Video: ([^,]*), ([^,]*), ([0-9]{1,4})x([0-9]{1,4})/";
        if (preg_match($regex_sizes, $output, $regs)) {
            $res['width'] = $regs [3] ? $regs [3] : 0;
            $res['height'] = $regs [4] ? $regs [4] : 0;
        }

        $regex_duration = "/Duration: ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}).([0-9]{1,2})/";
        if (preg_match($regex_duration, $output, $regs)) {
            $hours = $regs [1] ? $regs [1] : 0;
            $mins = $regs [2] ? $regs [2] : 0;
            $secs = $regs [3] ? $regs [3] : 0;
            $res['length'] = $hours * 3600 + $mins * 60 + $secs;
        }
      }
      return $res;
    }
  
}
