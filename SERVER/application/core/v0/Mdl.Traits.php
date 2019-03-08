<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//function __remove__from__results(&$result, $fields) {
//  foreach ($fields as $field) {
//    if (isset($result->$field))
//      unset($result->$field);
//  }
//}

function __remove__from__result (&$result, $fields) {
  if (is_array($result)) {
    foreach ($fields as $field) {
      if (array_key_exists($field, $result))
        unset($result[$field]);
    }
  }
  else {
    foreach ($fields as $field) {
      if (property_exists($result, $field))
        unset($result->$field);
    }
  }
}

function __stdobj__to__assocarray (&$result) {
  $result = (array) $result;
}
/*
trait POSTPROCESS {
  private function postProcessa(&$result) {}
  
  private function _postProcessa($results) {
    if (is_array($results)) {
      foreach ($results as $result) {
        $this->postProcessa($result);
      }
    }
    else {
      $this->postProcessa($results);
    }
    return $results;
  }
}
*/

trait MDL_GETBYID {
  public function getById ($id, $ignoreDeleted = true) {
    return $this->_postProcessa($this->_getSingle(['id' => $id], $ignoreDeleted));
  }
}

trait MDL_GETALL {
  public function getAll ($ignoreDeleted = true) {
    return $this->_postProcessa($this->_getMany([], $ignoreDeleted));
  }
}

trait MDL_GETBYPARENT {
  private $_parentField = 'idParent';

  public function getByParent ($idParent) {
    return $this->_postProcessa($this->_getMany([$this->_parentField => $idParent]));
  }
}