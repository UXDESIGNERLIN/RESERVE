<?php
defined('BASEPATH') OR exit('No direct script access allowed');

trait GETBYID {
  protected function GETBYID ($id) {
    $entity = $this->Model->getById($id);
    
    if (empty($entity))
      $this->_fail('NOT_FOUND', 400);
    
    $this->_success($this->_postProcessa($entity));
  }
}

trait GETALL {
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

  protected function GETALL () {
    $this->_success($this->_postProcessa($this->Model->getAll()));
  }

  protected function GETALLANDFILTER () {
    $entity = $this->Model->getAllAndFilter($this->query['s']);
    $this->_success($this->_postProcessa($entity));
  }
}

trait DELETE {
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