<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CompaniesMdl extends MY_Model {

  public function __construct() {
    parent::__construct('companies');
  }
  
  private function _comprovaHash($password, $hash) {
    return password_verify($password, $hash);
  }
  
  private function _creaHash($password) {
    return password_hash($password, PASSWORD_DEFAULT);
  }

  protected function postProcessa(&$result) {
    if (isset($result->password))
      unset($result->password);
  }

  public function entity($id = null, $email = null, $password = null, $name = null, $ts = null) {
    $res = [];
    if (!is_null($id))          $res = array_merge($res, ['id' => $id]);
    if (!is_null($email))       $res = array_merge($res, ['email' => $email]);
    if (!is_null($password))    $res = array_merge($res, ['password' => $this->_creaHash($password)]);
    if (!is_null($name))        $res = array_merge($res, ['name' => $name]);
    if (!is_null($ts))          $res = array_merge($res, ['ts' => $ts]);
    return $res;
  }

  public function usedEmail($email) {
    return $this->_exists($email, 'email');
  }

  public function login($email, $password) {
    $query = $this->db
      ->where('email', $email)
      ->get($this->_table);
    
    $company = $query->row();
    
    if (count($usuari) == 0) return ['success' => false];
    
    $success = $this->_comprovaHash($password, $company->password);
    
    return ['success' => $success, 'companyId' => $company->id];
  }

  /*
  
  
  public function entity($id = null, $name = null, $description = null, $topic = null, $plantilla = null, $partner = null, $smsname = null) {
    $res = [];
    if (!is_null($id))          $res = array_merge($res, ['id' => $id]);
    if (!is_null($name))        $res = array_merge($res, ['name' => $name]);
    if (!is_null($description)) $res = array_merge($res, ['description' => $description]);
    if (!is_null($topic))       $res = array_merge($res, ['topic' => $topic]);
    if (!is_null($plantilla))   $res = array_merge($res, ['plantilla' => $plantilla]);
    if (!is_null($partner))     $res = array_merge($res, ['partner' => $partner]);
    if (!is_null($smsname))     $res = array_merge($res, ['smsname' => $smsname]);
    //if (!is_null($instructor))  $res = array_merge($res, ['instructor' => $instructor]);
    return $res;
  }
  
  public function getAllAndFilter($term) {
    return parent::_getAllAndFilter($term, ['id', 'name']);
  }
  
  public function usedTopic($topicId, $id = null) {
    return parent::_existsNotBy($topicId, 'topic', $id);
  }
  
  public function usedId($id, $_id = null) {
    return parent::_existsNotBy($id, 'id', $_id);
  }
  
  public function usedName($name, $id = null) {
    return parent::_existsNotBy($name, 'name', $id);
  }

  public function usedPartner($partner) {
    return parent::_exists($partner, 'partner');
  }

  public function usedPlantilla($plantilla) {
    return parent::_exists($plantilla, 'plantilla');
  }
  */
}