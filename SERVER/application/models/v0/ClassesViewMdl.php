<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClassesViewMdl extends CI_Model { // extends MY_Model {
  use POSTPROCESS; //, MDL_GETBYID;

  protected function postProcessa (&$result) {
    __remove__from__result($result, ['idClass', 'idCompany', 'ts', 'deleted']);
    __to__integer($result, ['tsIni', 'len', 'spots', 'numReserves']);
  }

  public function getById ($classId) {
    return $this->_postProcessa($this->db->where(['id' => $classId])->get('classesView')->row());
  }

  public function getAvailable($companyId) {
    $query = $this->db->where([
      'idCompany' => $companyId,
      'tsIni >' => time(),
    ])->where('numReserves < spots');

    return $this->_postProcessa($query->get('classesView')->result());
  }
}