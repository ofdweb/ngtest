<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Media".
 *
 * @property integer $id
 * @property integer $fileId
 * @property integer $width
 * @property integer $height
 * @property integer $length
 */
class Media extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'Media';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['fileId', 'width', 'height', 'length'], 'required'],
            [['fileId', 'width', 'height', 'length'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'fileId' => 'File ID',
            'width' => 'Width',
            'height' => 'Height',
            'length' => 'Length',
        ];
    }
  
    public function getFile()
    {
      return $this->hasOne(Files::className(), ['id' => 'fileId']);
    }
  
}
