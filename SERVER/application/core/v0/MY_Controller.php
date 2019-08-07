<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once 'Traits.php';

//define('ROLE', ['ADMIN' => 4, 'TUTOR' => 2, 'USER' => 1]);

class MY_Controller extends CI_Controller {
  use APICHECKS;
  
  public function __construct ($modelName = null) {
    parent::__construct();

    date_default_timezone_set('UTC'); // Why do we need it for? time() always uses UTC
    
    //var_dump($_SERVER);

    if (ENVIRONMENT !== 'production') {
      if (isset($_SERVER['HTTP_ORIGIN'])) // https://gist.github.com/mkoistinen/2d8509b0b0be45ed76fed95f89b8596d
        header("Access-Control-Allow-Origin: ".$_SERVER['HTTP_ORIGIN']);
      //header("Access-Control-Allow-Origin: http://localhost:4200");
      //header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Credentials: true");
      header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
      header("Access-Control-Max-Age: 1000");
      header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
      
      if ("OPTIONS" === $_SERVER['REQUEST_METHOD']) {
        die();
      }
    }
    
    $this->sessio = $this->session->userdata('sessio') ?? ['loggedIn' => false, 'companyId' => null];
    //$this->usuari = $this->_getUsuari($this->sessio['companyId']);
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

  private function sessionClose() {
    // We won't bother with session object.
    session_write_close();
  }
      
  public function _remap($method, $params = array()) {
    $rm = $this->input->server('REQUEST_METHOD');
    
    // Check API defines the url endpoint
    if (!array_key_exists($method, $this->API)) {
      $this->_fail('API_ERROR', 500);
    }
    
    // Check API defined request method for this endpoint.
    if (!array_key_exists($rm, $this->API[$method])) {
      $this->_fail('METHOD_NOT_ALLOWED', 405);
    }
    
    $fn = $this->API[$method][$rm];
    
    if (!isset($fn['session_close']) or $fn['session_close'])
      $this->sessionClose();
    
    $this->query = $this->input->get(null, true);
    $this->post = $this->input->post(null, true);
    $this->body = $this->_JSONInputStream();
    // Run all checks according API description
    if (array_key_exists('checks', $fn)) {
      $checks = $fn['checks'];
      foreach ($checks as $check => $check_params) {
        $check_params = [$check_params];
        call_user_func_array(array($this, 'check_'.$check), $check_params);
      }
    }

    // UrlDecode all URL parameters
    foreach ($params as &$param) {
      $param = urldecode($param);
    }
    
    // Call API Method
    call_user_func_array(array($this, $fn['fn']), $params);
  }
}
