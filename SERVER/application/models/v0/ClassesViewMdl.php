<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClassesViewMdl extends CI_Model { // extends MY_Model {
  use POSTPROCESS; //, MDL_GETBYID;

  protected function postProcessa (&$result) {
    __remove__from__result($result, ['rollcall']); //__remove__from__result($result, ['classId', 'companyId', 'ts', 'deleted']);
    __to__integer($result, ['tsIni', 'len', 'spots', 'numReserves']);
    __to__boolean($result, ['confirmationSent', 'rollcall']);
    $result->reqInfo = explode(',', $result->reqInfo);
  }

  public function getById ($classId) {
    return $this->_postProcessa($this->db->where(['id' => $classId])->get('classesView')->row());
  }

  public function getAvailable ($companyId) {
    $query = $this->db->where([
      'companyId' => $companyId,
      'tsIni >' => time(),
    ])->where('numReserves < spots');

    return $this->_postProcessa($query->get('classesView')->result());
  }

  public function countByCompany ($companyId) {
    return $this->db->where(['companyId' => $companyId])->from('classesView')->count_all_results();
  }

  public function countByCourse ($courseId) {
    return $this->db->where(['courseId' => $courseId])->from('classesView')->count_all_results();
  }

  public function avgReservesPerClass ($courseId) {
    $query = "SELECT COALESCE(AVG(`numReserves`),0) as result FROM `classesView` WHERE `courseId` = ?";
    $result = $this->db->query($query, [$courseId])->row()->result;
    return floatval($result);
  }

  public function getPendingRollCall ($companyId) {
    // 'tsIni >' => time(),
    return array_map(
      function ($obj) {
        return $obj->id;
      },
      $this->db->select('id')->where(['companyId' => $companyId, 'rollcall' => 0, 'tsIni <' => time(), 'numReserves >' => 0])->get('classesView')->result()
    );
  }
}