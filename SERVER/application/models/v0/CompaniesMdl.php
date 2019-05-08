<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CompaniesMdl extends MY_Model {
  use POSTPROCESS, MDL_GETBYID, MDL_GETALL;

  public function __construct () {
    parent::__construct('companies');
  }
  
  private function _comprovaHash ($password, $hash) {
    return password_verify($password, $hash);
  }
  
  private function _creaHash ($password) {
    return password_hash($password, PASSWORD_DEFAULT);
  }

  protected function postProcessa (&$result) {
    __remove__from__result($result, ['password', 'challenge', 'challengeExpiration', 'active', 'ts', 'deleted']);
  }

  public function entity ($id = null, $email = null, $password = null, $name = null, $challenge = null, $challengeExpiration = null, $ts = null) {
    $res = [];
    if (!is_null($id))          $res = array_merge($res, ['id' => $id]);
    if (!is_null($email))       $res = array_merge($res, ['email' => $email]);
    if (!is_null($password))    $res = array_merge($res, ['password' => $this->_creaHash($password)]);
    if (!is_null($name))        $res = array_merge($res, ['name' => $name]);
    if (!is_null($challenge))           $res = array_merge($res, ['challenge' => $this->_creaHash($challenge)]);
    if (!is_null($challengeExpiration)) $res = array_merge($res, ['challengeExpiration' => $challengeExpiration]);
    if (!is_null($ts))          $res = array_merge($res, ['ts' => $ts]);
    return $res;
  }

  public function usedEmail($email, $companyId = null) {
    return $this->existsNotBy(['email' => $email], $companyId);
  }

  public function login ($email, $password) {
    /*
    $company = $this->_getSingle(['email' => $email]);

    if (is_null($company)) return ['success' => false];
    
    $success = $this->_comprovaHash($password, $company->password);
    
    return ['success' => $success, 'companyId' => $company->id];
    */
    $company = $this->_getSingle(['email' => $email]);
    if (!$this->_checkPassword($company, $password)) return ['success' => false, 'reason' => 'INCORRECT_IDPASS'];

    if (!$company->active) return ['success' => false, 'reason' => 'NOT_ACTIVE'];

    return ['success' => true, 'companyId' => $company->id];
  }

  public function confirmPassword ($companyId, $password) {
    return $this->_checkPassword($this->_getSingle(['id' => $companyId]), $password);
  }

  private function _checkPassword ($company, $password) {
    if (is_null($company)) return false;
    return $this->_comprovaHash($password, $company->password);
  }

  public function checkChallenge ($companyId, $challenge) {
    $company = $this->_getSingle(['id' => $companyId]);

    // Check company exists, and has a challenge
    if (is_null($company) || is_null($company->challenge)) 
      return false;

    $challengeCorrect = $this->_comprovaHash($challenge, $company->challenge);

    // Check challenge is correct
    if (!$challengeCorrect)
      return false;
    
    // Check challenge expires and is not expired
    if (!is_null($company->challengeExpiration) && $company->challengeExpiration < time()) 
      return false;
    
    // Here we know the challenge was correct, hence we will return true, 
    // but to avoid problems, we erase the challenge first.
    $this->update($companyId, ['challenge' => null, 'challengeExpiration' => null]);

    return true;
  }

  public function delete ($id) {
    $CI->load->model('v0/CoursesMdl', 'CoursesMdl');
    $this->CoursesMdl->deleteByParent($id);
    $parent->delete($id);
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