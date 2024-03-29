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

  public function checkChallenge ($email, $challenge, $checkActive) {
    $company = $this->_getSingle(['email' => $email]);

    // Check company exists, and has a challenge
    if (is_null($company) || is_null($company->challenge)) 
      return ['success' => false, 'reason' => 'NOT_FOUND'];

    // Check company is active if we need
    if ($checkActive && !$company->active)
      return ['success' => false, 'reason' => 'NOT_ACTIVE'];

    $challengeCorrect = $this->_comprovaHash($challenge, $company->challenge);

    // Check challenge is correct
    if (!$challengeCorrect)
      return ['success' => false, 'reason' => 'INCORRECT_CHALLENGE'];
    
    // Check challenge expires and is not expired
    if (!is_null($company->challengeExpiration) && $company->challengeExpiration < time()) 
      return ['success' => false, 'reason' => 'CHALLENGE_EXPIRED'];
    
    // Here we know the challenge was correct, hence we will return true, 
    // but to avoid problems, we erase the challenge first.
    $success = $this->update($company->id, ['challenge' => null, 'challengeExpiration' => null]);

    return ['success' => $success, 'reason' => 'UNHANDLED_ERROR'];
  }

  public function setChallenge ($email, $challenge, $expires) {
    $company = $this->_getSingle(['email' => $email]);
    return $this->update($company->id, ['challenge' => $this->_creaHash($challenge), 'challengeExpiration' => $expires]);
  }

  public function checkActive ($email) {
    $company = $this->_getSingle(['email' => $email]);

    if (is_null($company)) return false;

    return $company->active;
  }

  public function changePassword ($email, $password) {
    $company = $this->_getSingle(['email' => $email]);
    return $this->update($company->id, ['password' => $this->_creaHash($password)]);
  }

  public function activate ($email) {
    $company = $this->_getSingle(['email' => $email]);
    return $this->update($company->id, ['active' => true]);
  }

  public function delete ($id) {
    $CI->load->model('v0/CoursesMdl', 'CoursesMdl');
    $this->CoursesMdl->deleteByParent($id);
    $parent->delete($id);
  }

}