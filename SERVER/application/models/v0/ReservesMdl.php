<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservesMdl extends MY_Model {
  public function __construct() {
    parent::__construct('reserves');
  }

  public function entity(
    $id = null, 
    $idConvocatoria = null, 
    $email = null, 
    $fname = null, 
    $phone = null,
    $age = null,
    $gender = null,
    $ts = null
  ) {
    $res = [];
    if (!is_null($id))             $res = array_merge($res, ['id' => $id]);
    if (!is_null($idConvocatoria)) $res = array_merge($res, ['idConvocatoria' => $idConvocatoria]);
    if (!is_null($email))          $res = array_merge($res, ['email' => $email]);
    if (!is_null($fname))          $res = array_merge($res, ['fname' => $fname]);
    if (!is_null($phone))          $res = array_merge($res, ['phone' => $phone]);
    if (!is_null($age))            $res = array_merge($res, ['age' => $age]);
    if (!is_null($gender))         $res = array_merge($res, ['gender' => $gender]);
    if (!is_null($ts))             $res = array_merge($res, ['ts' => $ts]);
    return $res;
  }
}