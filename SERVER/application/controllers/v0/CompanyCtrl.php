<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CompanyCtrl extends MY_Controller {
  
  public function __construct () {
    parent::__construct(); //'v0/CompanyModel');

    $this->API = [
      'generic' => [
        'POST' => [
          'fn' => 'CREATE', 
          'checks' => [
            'notLoggedIn' => null,
            'body' => ['obligatoris' => ['email', 'name', 'password']]
          ]
        ],
      ],
      'id' => [
        'GET' =>    [
          'fn' => 'GETBYID',
        ],
      ],
    ];

    $this->load->helper('validacio');
  }

  protected function CREATE () {
    $body = $this->body;

    $body['email'] = trim($body['email']);
    $body['name'] = trim($body['name']);

    // Validar email
    // Check email is unique
    // put company in db

    $this->_success();
  }

  protected function GETBYID ($id) {
    $this->_success(['test' => 'best']);
  }
}
