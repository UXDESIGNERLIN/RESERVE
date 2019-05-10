<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservesViewMdl extends CI_Model { // extends MY_Model {
  use POSTPROCESS; //, MDL_GETBYID;

  protected function postProcessa (&$result) {
    __remove__from__result($result, ['classId', 'courseId', 'companyId', 'deleted']);
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
    $query = "SELECT COUNT(DISTINCT(`email`)) as `result` FROM `reservesView` WHERE `companyId` = ?";
    $result = $this->db->query($query, [$companyId])->row()->result;
    return intval($result);
  }

  public function courseUniqueUsers ($courseId) {
    $query = "SELECT COUNT(DISTINCT(`email`)) as `result` FROM `reservesView` WHERE `courseId` = ?";
    $result = $this->db->query($query, [$courseId])->row()->result;
    return intval($result);
  }

  public function numUsersWhoRepeatCompany ($companyId) {
    $query = "SELECT COUNT(*) as `result` FROM (SELECT COUNT(*) as `times` FROM `reservesView` WHERE `companyId` = ? GROUP BY `email`) TempTable WHERE `times` > 1";
    $result = $this->db->query($query, [$companyId])->row()->result;
    return intval($result);
  }

  public function numUsersWhoRepeatCourse ($courseId) {
    $query = "SELECT COUNT(*) as `result` FROM (SELECT COUNT(*) as `times` FROM `reservesView` WHERE `courseId` = ? GROUP BY `email`) TempTable WHERE `times` > 1";
    $result = $this->db->query($query, [$courseId])->row()->result;
    return intval($result);
  }

  public function numUsersInClassWhoRepeatCourse ($classId, $courseId) {
    $query = "SELECT COUNT(*) as `result` FROM (SELECT `email`, COUNT(*) as `times` FROM `reservesView` WHERE `courseId` = ? GROUP BY `email`) `TempTable` WHERE `times` > 1 AND `email` IN (SELECT `email` FROM `reservesView` WHERE `classId` = ?)";
    $result = $this->db->query($query, [$courseId, $classId])->row()->result;
    return intval($result);
  }

  public function languagesByCompany ($companyId) {
    // Si cada usuari val 1
    // SELECT GROUP_CONCAT(HTTP_ACCEPT_LANGUAGE) FROM `reservesView` GROUP BY email

    // Si cada reserva val 1
    // SELECT `HTTP_ACCEPT_LANGUAGE` FROM `reservesView` WHERE `idCompany` = 5

    $query = "SELECT `HTTP_ACCEPT_LANGUAGE` FROM `reservesView` WHERE `companyId` = ?";
    $result = $this->db->query($query, [$companyId])->result();
    return $result;
  }

  public function languagesByCourse ($courseId) {
    $query = "SELECT `HTTP_ACCEPT_LANGUAGE` FROM `reservesView` WHERE `courseId` = ?";
    $result = $this->db->query($query, [$courseId])->result();
    return $result;
  }

  public function languagesByClass ($classId) {
    $query = "SELECT `HTTP_ACCEPT_LANGUAGE` FROM `reservesView` WHERE `classId` = ?";
    $result = $this->db->query($query, [$classId])->result();
    return $result;
  }

  public function gendersByCompany ($companyId) {
    $query = "SELECT SUM(CASE WHEN `gender` = 'm' then 1 else 0 end) AS males, SUM(CASE WHEN `gender` = 'f' then 1 else 0 end) AS females, SUM(CASE WHEN `gender` IS NULL then 1 else 0 end) AS unknown FROM `reservesView` WHERE `companyId` = ?";
    $result = $this->db->query($query, [$companyId])->row();
    __to__integer($result, ['males', 'females', 'unknown']);
    return $result;
  }

  public function gendersByCourse ($courseId) {
    $query = "SELECT SUM(CASE WHEN `gender` = 'm' then 1 else 0 end) AS males, SUM(CASE WHEN `gender` = 'f' then 1 else 0 end) AS females, SUM(CASE WHEN `gender` IS NULL then 1 else 0 end) AS unknown FROM `reservesView` WHERE `courseId` = ?";
    $result = $this->db->query($query, [$courseId])->row();
    __to__integer($result, ['males', 'females', 'unknown']);
    return $result;
  }

  public function gendersByClass ($classId) {
    $query = "SELECT SUM(CASE WHEN `gender` = 'm' then 1 else 0 end) AS males, SUM(CASE WHEN `gender` = 'f' then 1 else 0 end) AS females, SUM(CASE WHEN `gender` IS NULL then 1 else 0 end) AS unknown FROM `reservesView` WHERE `classId` = ?";
    $result = $this->db->query($query, [$classId])->row();
    __to__integer($result, ['males', 'females', 'unknown']);
    return $result;
  }

  public function agesByCompany ($companyId) {
    /*
    *  grp1     < 18
    *  grp2     18 ~ 29
    *  grp3     30 ~ 49
    *  grp4     >= 50
    *  unknown  NULL
    */
    $query = "SELECT AVG(`age`) AS mean, SUM(CASE WHEN `age` < 18 then 1 else 0 end) AS grp1, SUM(CASE WHEN `age` >= 18 AND `age` < 30 then 1 else 0 end) AS grp2, SUM(CASE WHEN `age` >= 30 AND `age` < 50 then 1 else 0 end) AS grp3, SUM(CASE WHEN `age` >= 50 then 1 else 0 end) AS grp4, SUM(CASE WHEN `age` IS NULL then 1 else 0 end) AS unknown FROM `reservesView` WHERE `companyId` = ?";
    $result = $this->db->query($query, [$companyId])->row();
    __to__integer($result, ['grp1', 'grp2', 'grp3', 'grp4', 'unknown']);
    __to__float($result, ['mean']);
    return $result;
  }

  public function agesByCourse ($courseId) {
    $query = "SELECT AVG(`age`) AS mean, SUM(CASE WHEN `age` < 18 then 1 else 0 end) AS grp1, SUM(CASE WHEN `age` >= 18 AND `age` < 30 then 1 else 0 end) AS grp2, SUM(CASE WHEN `age` >= 30 AND `age` < 50 then 1 else 0 end) AS grp3, SUM(CASE WHEN `age` >= 50 then 1 else 0 end) AS grp4, SUM(CASE WHEN `age` IS NULL then 1 else 0 end) AS unknown FROM `reservesView` WHERE `courseId` = ?";
    $result = $this->db->query($query, [$courseId])->row();
    __to__integer($result, ['grp1', 'grp2', 'grp3', 'grp4', 'unknown']);
    __to__float($result, ['mean']);
    return $result;
  }

  public function agesByClass ($classId) {
    $query = "SELECT AVG(`age`) AS mean, SUM(CASE WHEN `age` < 18 then 1 else 0 end) AS grp1, SUM(CASE WHEN `age` >= 18 AND `age` < 30 then 1 else 0 end) AS grp2, SUM(CASE WHEN `age` >= 30 AND `age` < 50 then 1 else 0 end) AS grp3, SUM(CASE WHEN `age` >= 50 then 1 else 0 end) AS grp4, SUM(CASE WHEN `age` IS NULL then 1 else 0 end) AS unknown FROM `reservesView` WHERE `classId` = ?";
    $result = $this->db->query($query, [$classId])->row();
    __to__integer($result, ['grp1', 'grp2', 'grp3', 'grp4', 'unknown']);
    __to__float($result, ['mean']);
    return $result;
  }

  public function getAllUserEmailsForCompany ($companyId) {
    $query = "SELECT DISTINCT `email` FROM `reservesView` WHERE `companyId` = ? AND `email` NOT IN (SELECT `email` FROM `noSpam` WHERE noSpam.companyId = ?)";
    $result = $this->db->query($query, [$companyId, $companyId])->result();
    return $result;
  }

  public function getAllUserEmailsForCourse ($courseId) {
    $query = "SELECT DISTINCT `email` FROM `reservesView` WHERE `courseId` = ? AND `email` NOT IN (SELECT `email` FROM `noSpam` WHERE noSpam.companyId = reservesView.companyId)";
    $result = $this->db->query($query, [$courseId])->result();
    return $result;
  }

  public function getAllUserEmailsForClass ($classId) {
    $query = "SELECT DISTINCT `email` FROM `reservesView` WHERE `classId` = ? AND `email` NOT IN (SELECT `email` FROM `noSpam` WHERE noSpam.companyId = reservesView.companyId)";
    $result = $this->db->query($query, [$classId])->result();
    return $result;
  }
}