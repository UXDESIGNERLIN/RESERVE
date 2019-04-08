<?php
defined('BASEPATH') OR exit('No direct script access allowed');

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

function __to__integer (&$result, $fields) {
  if (is_array($result)) {
    foreach ($fields as $field) {
      if (array_key_exists($field, $result))
        $result[$field] = intval($result[$field]);
    }
  }
  else {
    foreach ($fields as $field) {
      if (property_exists($result, $field))
        $result->$field = intval($result->$field);
    }
  }
}

function __stdobj__to__assocarray (&$result) {
  $result = (array) $result;
}

trait POSTPROCESS {
  private function postProcessa(&$result) {}
  
  private function _postProcessa($results) {
    if (is_array($results)) {
      foreach ($results as $result) {
        $this->postProcessa($result);
      }
    }
    else if (!is_null($results)) {
      $this->postProcessa($results);
    }
    return $results;
  }
}

trait APICHECKS {
  private function check_loggedIn() {
    if (!$this->sessio['loggedIn']) {
      $this->_fail('NOT_LOGGED_IN', 401);
    }
  }
  
  private function check_notLoggedIn() {
    if ($this->sessio['loggedIn']) {
      $this->_fail('ALREADY_LOGGED_IN', 409);
    }
  }

  private function check_body($specs) {
    $this->_check_params($specs, $this->body);
  }

  private function check_post($specs) {
    $this->_check_params($specs, $this->post);
  }
  
  private function check_query($specs) {
    $this->_check_params($specs, $this->query);
  }
  
  private function _check_params($specs, &$params) {
    if (isset($specs['obligatoris'])) {
      $obligatoris = $specs['obligatoris'];
      foreach ($obligatoris as $variable) {
        if (!isset($params[$variable]))
          $this->_fail('MISSING_PARAMETER', 400, $variable);
      }
    }
    if (isset($specs['opcionals'])) {
      $opcionals = $specs['opcionals'];
      foreach ($opcionals as $variable => $valor) {
        if (!isset($params[$variable])) {
          $params[$variable] = $valor;
        }
      }
    }
  }
}

/*
*   CONTROLLER TRAITS
*/

trait CTRL_GETBYID {
  protected function GETBYID ($id) {
    $entity = $this->Model->getById($id);
    
    if (empty($entity))
      $this->_fail('NOT_FOUND', 400);
    
    $this->_success($this->_postProcessa($entity));
  }
}

trait CTRL_GETBYPARENT {
  protected function GETBYPARENT ($idParent) {
    $this->_success($this->_postProcessa($this->Model->getByParent($idParent)));
  }
}

trait CTRL_GETALL {
  protected function GETALL () {
    $this->_success($this->_postProcessa($this->Model->getAll()));
  }
}

trait CTRL_SEARCH {
  protected function SEARCH () {
    $entity = $this->Model->getAllAndFilter($this->query['s']);
    $this->_success($this->_postProcessa($entity));
  }
}

trait CTRL_DELETE {
  protected function _DELETE($id) {
    $id = urldecode($id);
    
    $success = $this->Model->delete($id);
    
    return $success;
  }
  
  protected function DELETE ($id) {
    $success = $this->_DELETE($id);
      
    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'MyCtrl::DELETE');
    
    $this->_success();
  }
}



/*
*   MODEL TRAITS
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

trait MDL_DELETEBYPARENT {
  private $_parentField = 'idParent';

  public function deleteByParent($idParent) {
    $this->_update([$_parentField => $idParent], ['deleted' => 1]);
  }
}