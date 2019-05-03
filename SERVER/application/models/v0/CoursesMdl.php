<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CoursesMdl extends MY_Model {
  use POSTPROCESS, MDL_GETBYID, MDL_GETALL, MDL_GETBYPARENT;

  public function __construct () {
    parent::__construct('courses');

    $this->_parentField = 'companyId';
  }

  public function checkReqInfo ($reqInfo) {
    // Pre:: $reqInfo is an array
    foreach ($reqInfo as $param) {
      if (!in_array($param, ['email', 'fname', 'phone', 'age', 'gender'], true)) return false;
    }
    return true;
  }

  protected function postProcessa (&$result) {
    __remove__from__result($result, ['ts', 'deleted']);
    $result->reqInfo = explode(',', $result->reqInfo);
  }

  public function entity (
    $id = null, 
    $companyId = null, 
    $name = null, 
    $description = null, 
    $reqInfo = null, 
    $type = null,
    $ts = null
  ) {
    $res = [];
    if (!is_null($id))          $res = array_merge($res, ['id' => $id]);
    if (!is_null($companyId))   $res = array_merge($res, ['companyId' => $companyId]);
    if (!is_null($name))        $res = array_merge($res, ['name' => $name]);
    if (!is_null($description)) $res = array_merge($res, ['description' => $description]);
    if (!is_null($reqInfo))     $res = array_merge($res, ['reqInfo' => implode(',',$reqInfo)]);
    if (!is_null($type))        $res = array_merge($res, ['type' => $type]);
    if (!is_null($ts))          $res = array_merge($res, ['ts' => $ts]);
    return $res;
  }

  public function nameInUse ($name, $companyId) {
    return $this->exists(['companyId' => $companyId, 'name' => $name]);
  }
}