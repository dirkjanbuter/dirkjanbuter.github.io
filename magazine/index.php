<?php

$lc = "";
if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE']))
  $lc = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
if($lc == "nl"){
	header("Location: nl/");
}
else
{
  	header("Location: en/");
}
