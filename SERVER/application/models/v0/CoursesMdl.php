<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CoursesMdl extends MY_Model {
  public function __construct() {
    parent::__construct('cursos');
  }

  public function entity(
    $id = null, 
    $idCompany = null, 
    $name = null, 
    $description = null, 
    $reqInfo = null, 
    $ts = null
  ) {
    $res = [];
    if (!is_null($id))          $res = array_merge($res, ['id' => $id]);
    if (!is_null($idCompany))   $res = array_merge($res, ['idCompany' => $idCompany]);
    if (!is_null($name))        $res = array_merge($res, ['name' => $name]);
    if (!is_null($description)) $res = array_merge($res, ['description' => $description]);
    if (!is_null($reqInfo))     $res = array_merge($res, ['reqInfo' => $reqInfo]);
    if (!is_null($ts))          $res = array_merge($res, ['ts' => $ts]);
    return $res;
  }
}