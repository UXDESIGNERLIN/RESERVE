<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservesMdl extends MY_Model {
  use POSTPROCESS, /*MDL_GETBYID,*/ MDL_GETALL, MDL_GETBYPARENT, MDL_DELETEBYPARENT;

  public function __construct () {
    parent::__construct('reserves');

    $this->_parentField = 'classId';
  }

  protected function postProcessa (&$result) {
    __remove__from__result($result, ['REMOTE_ADDR', 'HTTP_USER_AGENT', 'HTTP_ACCEPT_LANGUAGE', 'ts', 'deleted']);
  }

  public function entity (
    $id = null, 
    $classId = null, 
    $email = null, 
    $fname = null, 
    $phone = null,
    $age = null,
    $gender = null,
    $remote_addr = null,
    $http_user_agent = null,
    $http_accept_language = null,
    $ts = null
  ) {
    $res = [];
    if (!is_null($id))             $res = array_merge($res, ['id' => $id]);
    if (!is_null($classId))        $res = array_merge($res, ['classId' => $classId]);
    if (!is_null($email))          $res = array_merge($res, ['email' => $email]);
    if (!is_null($fname))          $res = array_merge($res, ['fname' => $fname]);
    if (!is_null($phone))          $res = array_merge($res, ['phone' => $phone]);
    if (!is_null($age))            $res = array_merge($res, ['age' => $age]);
    if (!is_null($gender))         $res = array_merge($res, ['gender' => $gender]);
    if (!is_null($remote_addr))           $res = array_merge($res, ['REMOTE_ADDR' => $remote_addr]);
    if (!is_null($http_user_agent))       $res = array_merge($res, ['HTTP_USER_AGENT' => $http_user_agent]);
    if (!is_null($http_accept_language))  $res = array_merge($res, ['HTTP_ACCEPT_LANGUAGE' => $http_accept_language]);
    if (!is_null($ts))             $res = array_merge($res, ['ts' => $ts]);
    return $res;
  }

  public function validReserve ($reserveId, $classId) {
    return $this->exists(['id' => $reserveId, 'classId' => $classId]);
  }

  public function usedEmailOnClass ($classId, $email) {
    return $this->exists(['classId' => $classId, 'email' => $email]);
  }

  private function _view() {
    $CI =& get_instance();
    $CI->load->model('v0/ReservesViewMdl');
    return $CI->ReservesViewMdl;
  }

  public function getById ($reserveId) {
    return $this->_view()->getById($reserveId);
  }

  public function getByCompany ($companyId) {
    return $this->_view()->getByCompany($companyId);
  }

  public function cancelReserve ($reserveId, $client = false) {
    $status = $client ? 'usercancelled' : 'organizercancelled';
    return $this->update($reserveId, ['status' => $status, 'deleted' => 1]);
  }

  public function rollcall($shows, $noshows) {
    $this->update($shows, ['status' => 'show']);
    $this->update($noshows, ['status' => 'noshow']);
    //$this->db->set('status', 'show')->where_in('id', $shows)->update()
  }

  public function confirmAttendance(string $reserveId, bool $confirm) {
    //$this->update($reserveId, ['confirmation' => $confirm ? 'confirmed' : 'unconfirmed']);
    return $this->changeConfirmationStatus($reserveId, $confirm ? 'confirmed' : 'unconfirmed');
  }

  public function checkConfirmationStatus (string $status) {
    return in_array($status, ['pending', 'confirmed', 'unconfirmed'], true);
  }

  public function changeConfirmationStatus (string $reserveId, string $status) {
    if (!$this->checkConfirmationStatus($status)) return false;
    return $this->update($reserveId, ['confirmation' => $status]);
  }
}