<?php

use yii\db\Migration;

class m170928_112722_deploy extends Migration
{

    public function up()
    {
      $sql = file_get_contents(Yii::getAlias('@app') . '/data/database.sql');
      $connect = Yii::$app->getDb();
      $connect->createCommand($sql)->execute();
      echo "Success!";
    }
/*
    public function down()
    {
        echo "m170928_112722_deploy cannot be reverted.\n";

        return false;
    }
    */
}
