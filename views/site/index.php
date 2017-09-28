<?php

/* @var $this yii\web\View */

$this->title = 'Media Angular Application';
?>
<script type="text/javascript">
    System.import('media_app').catch(function(err){ console.error(err); });
</script>
<media-app>
  <div class="preloader-full">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
  
</media-app>