<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SessionCtrl extends MY_Controller {
  
  public function __construct () {
    parent::__construct();

    $this->API = [
      'generic' => [
        'GET' =>  [
          'fn' => 'GET',
          'session_close' => false,
        ],
        'POST' => [
          'fn' => 'LOGIN', 
          'session_close' => false,
          'checks' => [
            'notLoggedIn' => null,
            'body' => [
              'obligatoris' => ['email', 'password'],
            ],
          ]
        ],
        'DELETE' => [
          'fn' => 'LOGOUT',
          'session_close' => false,
        ],
      ]
    ];
    
  }
  
  protected function GET () {
    $sessio = $this->session->userdata('sessio');
    
    if (!$sessio)
      $sessio = ['logged_in' => false];
    
    $this->_success($sessio);
  }
  
  protected function LOGIN () {
    $body = $this->body;

    $this->load->model('v0/CompaniesMdl', 'CompaniesMdl');
    $login = $this->CompaniesMdl->login($body['email'], $body['password']);
    
    if (!$login['success'])
      $this->_fail('INCORRECT', 200);
    
    $sessio = ['loggedIn' => true, 'companyId' => $login['companyId']];
    $this->session->set_userdata('sessio', $sessio);
    $this->_success();
  }
  
  protected function LOGOUT () {
    $success = session_destroy();
    
    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'SessionCtrl::LOGOUT');

    $this->_success($success);
  }
}