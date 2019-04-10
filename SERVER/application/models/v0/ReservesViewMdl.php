<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservesViewMdl extends CI_Model { // extends MY_Model {
  use POSTPROCESS; //, MDL_GETBYID;

  protected function postProcessa (&$result) {
    __remove__from__result($result, ['idClass', 'idCourse', 'idCompany', 'deleted']);
    __to__integer($result, ['ts', 'tsIni', 'len']);
  }

  public function getById ($reserveId) {
    return $this->_postProcessa($this->db->where(['id' => $reserveId])->get('reservesView')->row());
  }

  public function getByCompany($companyId) {
    $query = $this->db->where([
      'idCompany' => $companyId
    ]);

    return $this->_postProcessa($query->get('reservesView')->result());
  }
}