<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class NoSpamMdl extends MY_Model {

  public function __construct () {
    parent::__construct('noSpam');
  }

  public function entity (
    $email = null, 
    $companyId = null, 
    $ts = null
  ) {
    $res = [];
    if (!is_null($email))      $res = array_merge($res, ['email' => $email]);
    if (!is_null($companyId))  $res = array_merge($res, ['companyId' => $companyId]);
    if (!is_null($ts))         $res = array_merge($res, ['ts' => $ts]);
    return $res;
  }
}