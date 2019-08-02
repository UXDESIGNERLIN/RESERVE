<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClassesMdl extends MY_Model {
  use POSTPROCESS, MDL_GETBYID, MDL_GETALL, MDL_GETBYPARENT;

  public function __construct () {
    parent::__construct('classes');

    $this->_parentField = 'courseId';
  }

  protected function postProcessa (&$result) {
    __remove__from__result($result, ['ts', 'deleted']);
    __to__boolean($result, ['confirmationSent', 'rollcall']);
  }

  public function entity (
    $id = null, 
    $courseId = null, 
    $tsIni = null, 
    $len = null, 
    $spots = null, 
    $ts = null
  ) {
    $res = [];
    if (!is_null($id))          $res = array_merge($res, ['id' => $id]);
    if (!is_null($courseId))    $res = array_merge($res, ['courseId' => $courseId]);
    if (!is_null($tsIni))       $res = array_merge($res, ['tsIni' => $tsIni]);
    if (!is_null($len))         $res = array_merge($res, ['len' => $len]);
    if (!is_null($spots))       $res = array_merge($res, ['spots' => $spots]);
    if (!is_null($ts))          $res = array_merge($res, ['ts' => $ts]);
    return $res;
  }

  public function getById ($classId) {
    $CI =& get_instance();
    $CI->load->model('v0/ClassesViewMdl');
    return $CI->ClassesViewMdl->getById($classId);
  }

  public function getAvailable ($companyId) {
    $CI =& get_instance();
    $CI->load->model('v0/ClassesViewMdl');
    return $CI->ClassesViewMdl->getAvailable($companyId);
    /*
    return $this->db->where(['idCompany' => $companyId])->get('classesView')->result();
    */
  }

  public function getPendingRollCall ($companyId) {
    $CI =& get_instance();
    $CI->load->model('v0/ClassesViewMdl');
    return $CI->ClassesViewMdl->getPendingRollCall($companyId);
  }

  public function sentConfirmation ($classId) {
    return $this->update($classId, ['confirmationSent' => true]);
  }

  public function finishedRollcall ($classId) {
    return $this->update($classId, ['rollcall' => true]);
  }
}