<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClassesMdl extends MY_Model {
  use POSTPROCESS, MDL_GETBYID, MDL_GETALL, MDL_GETBYPARENT;

  public function __construct () {
    parent::__construct('classes');

    $this->_parentField = 'idCourse';
  }

  public function entity (
    $id = null, 
    $idCourse = null, 
    $tsIni = null, 
    $len = null, 
    $spots = null, 
    $ts = null
  ) {
    $res = [];
    if (!is_null($id))          $res = array_merge($res, ['id' => $id]);
    if (!is_null($idCourse))    $res = array_merge($res, ['idCourse' => $idCourse]);
    if (!is_null($tsIni))       $res = array_merge($res, ['tsIni' => $tsIni]);
    if (!is_null($len))         $res = array_merge($res, ['len' => $len]);
    if (!is_null($spots))       $res = array_merge($res, ['spots' => $spots]);
    if (!is_null($ts))          $res = array_merge($res, ['ts' => $ts]);
    return $res;
  }
}