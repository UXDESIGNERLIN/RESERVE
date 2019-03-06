<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//define('ROLE', ['ADMIN' => 4, 'TUTOR' => 2, 'USER' => 1]);

class MY_Controller extends CI_Controller {
  
  public function __construct ($modelName = null) {
    parent::__construct();

    date_default_timezone_set('Europe/Madrid');
    /*
    *
    *     TO REMOVE ON PRODUCTION
    *  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    */
    header("Access-Control-Allow-Origin: http://localhost:8080");
    //header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Max-Age: 1000");
    header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
    
    if ("OPTIONS" === $_SERVER['REQUEST_METHOD']) {
      die();
    }
    /*
    *  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    *     TO REMOVE ON PRODUCTION
    *  
    */
    
    $this->sessio = $this->session->userdata('sessio') ?? ['logged_in' => false, 'cid' => null];
    //$this->usuari = $this->_getUsuari($this->sessio['NIS']);
    $this->query = [];
    $this->body = [];
    
    if (isset($modelName))
      $this->load->model($modelName, 'Model');
  }
  
  /*
  private function _getUsuari($NIS = null) {
    if (is_null($NIS)) return null;
    $this->load->model('v1/VistaUsuarisModel', 'VistaUsuarisModel');
    return (array) $this->VistaUsuarisModel->getById($NIS);
  }
  */
  
  /*
  private function _getRank() {
    if (is_null($this->usuari)) return 0;
    if ($this->sessio['credited']) {
      if ($this->usuari['instructor'] && $this->usuari['admin']) return ROLE['ADMIN'] | ROLE['TUTOR'] | ROLE['USER'];
      if ($this->usuari['instructor']) return ROLE['TUTOR'] | ROLE['USER'];
      if ($this->usuari['admin']) return ROLE['ADMIN'] | ROLE['USER'];
    }
    return ROLE['USER'];
  }
  */
  
  private function _JSONInputStream() {
    $dades = json_decode($this->input->raw_input_stream, true);
    if (is_null($dades)) $dades = array();
    return $dades;
  }
  
  protected function _success($dades = null, $status = 200, $codi = null) {
    $this->_retorna(true, $dades, $codi, $status);
  }
  
  protected function _fail($codi, $status, $dades = null) {
    $this->_retorna(false, $dades, $codi, $status);
  }
  
  private function _retorna($success, $dades = null, $code = null, $status = 200) {
    $this->output->set_status_header($status);
    if (is_null($dades)) $dades = '';
    if (is_null($code)) $code = '';
    if (is_object($dades)) $dades = (array) $dades;
    $answer = ['success' => $success, 'code' => $code, 'data' => $dades];
    die(json_encode($answer));
    //die(chr(28).json_encode($answer).chr(28).'<div>BIG {BULLSHIT}</div>');
  }
  
  private function check_loggedIn() {
    if (!$this->sessio['logged_in']) {
      $this->_fail('NOT_LOGGED_IN', 401);
    }
  }
  
  private function check_notLoggedIn() {
    if ($this->sessio['logged_in']) {
      $this->_fail('ALREADY_LOGGED_IN', 409);
      //$this->_retorna(['code' => 'ALREADY_LOGGED_IN'], 409);
    }
  }
  /*
  private function check_rank($rank) {
    $userRank = $this->_getRank();
    
    if (($rank & $userRank) == 0)
      $this->_fail('NOT_ALLOWED', 403);
  }
  
  protected function isAdmin() {
    return ($this->_getRank() & 4);
  }
  */
  private function check_body($specs) {
    $this->_check_params($specs, $this->body);
  }

  private function check_post($specs) {
    $this->_check_params($specs, $this->post);
  }
  
  private function check_query($specs) {
    $this->_check_params($specs, $this->query);
  }
  
  private function sessionClose() {
    // We won't bother with session object.
    session_write_close();
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
      
  public function _remap($method, $params = array()) {
    $rm = $this->input->server('REQUEST_METHOD');
    
    if (!array_key_exists($method, $this->API)) {
      $this->_fail('API_ERROR', 500);
    }
    
    if (!array_key_exists($rm, $this->API[$method])) {
      $this->_fail('METHOD_NOT_ALLOWED', 405);
    }
    
    $fn = $this->API[$method][$rm];
    
    if (!isset($fn['session_close']) or $fn['session_close'])
      $this->sessionClose();
    
    $this->query = $this->input->get(null, true);
    $this->post = $this->input->post(null, true);
    $this->body = $this->_JSONInputStream();
    
    if (array_key_exists('checks', $fn)) {
      $checks = $fn['checks'];
      foreach ($checks as $check => $check_params) {
        $check_params = [$check_params];
        call_user_func_array(array($this, 'check_'.$check), $check_params);
      }
    }
    
    call_user_func_array(array($this, $fn['fn']), $params);
  }
  
  
  // ---------------------------------
  /*
  protected function postProcessa(&$result) {}
  
  protected function _postProcessa($results) {
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
    $entity = $this->Model->getAllAndFilter($this->query['s']);
    $this->_success($this->_postProcessa($entity));
  }
  
  protected function GETBYID ($id) {
    $id = urldecode($id);
    
    $entity = $this->Model->getById($id);
    
    if (empty($entity))
      $this->_fail('NOT_FOUND', 400);
    
    $this->_success($this->_postProcessa($entity));
  }
  
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
  */
}
