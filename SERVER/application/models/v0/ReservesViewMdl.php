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

  public function companyUniqueUsers ($companyId) {
    $query = "SELECT COUNT(DISTINCT(`email`)) as `result` FROM `reservesView` WHERE `idCompany` = ?";
    $result = $this->db->query($query, [$companyId])->row()->result;
    return intval($result);
  }

  public function courseUniqueUsers ($courseId) {
    $query = "SELECT COUNT(DISTINCT(`email`)) as `result` FROM `reservesView` WHERE `idCourse` = ?";
    $result = $this->db->query($query, [$courseId])->row()->result;
    return intval($result);
  }

  public function numUsersWhoRepeatCompany ($companyId) {
    $query = "SELECT COUNT(*) as `result` FROM (SELECT COUNT(*) as `times` FROM `reservesView` WHERE `idCompany` = ? GROUP BY `email`) TempTable WHERE `times` > 1";
    $result = $this->db->query($query, [$companyId])->row()->result;
    return intval($result);
  }

  public function numUsersWhoRepeatCourse ($courseId) {
    $query = "SELECT COUNT(*) as `result` FROM (SELECT COUNT(*) as `times` FROM `reservesView` WHERE `idCourse` = ? GROUP BY `email`) TempTable WHERE `times` > 1";
    $result = $this->db->query($query, [$courseId])->row()->result;
    return intval($result);
  }

  public function languagesByCompany ($companyId) {
    // Si cada usuari val 1
    // SELECT GROUP_CONCAT(HTTP_ACCEPT_LANGUAGE) FROM `reservesView` GROUP BY email

    // Si cada reserva val 1
    // SELECT `HTTP_ACCEPT_LANGUAGE` FROM `reservesView` WHERE `idCompany` = 5

    $query = "SELECT `HTTP_ACCEPT_LANGUAGE` FROM `reservesView` WHERE `idCompany` = ?";
    $result = $this->db->query($query, [$companyId])->result();
    return $result;
  }

  //public function numUsersWho
}