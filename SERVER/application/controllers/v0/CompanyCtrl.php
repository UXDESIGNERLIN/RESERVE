<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CompanyCtrl extends MY_Controller {
  use GETBYID;
  use GETALL;


  public function __construct () {
    parent::__construct('v0/CompaniesMdl');

    $this->API = [
      'generic' => [
        'GET' => [
          'fn' => 'GETALL',
        ],
        'POST' => [
          'fn' => 'CREATE', 
          'checks' => [
            'notLoggedIn' => null,
            'body' => ['obligatoris' => ['email', 'name', 'password']]
          ]
        ],
      ],
      'id' => [
        'GET' => [
          'fn' => 'GETBYID'
        ],
      ],
    ];

    $this->load->helper('validacio');
  }

  protected function CREATE () {
    $body = $this->body;

    $body['email'] = trim($body['email']);
    $body['name'] = trim($body['name']);

    // Validate email
    if (!validEmail($body['email'])) {
      $this->_fail('EMAIL_WRONG_FORMAT', 400);
    }

    // Check email is unique
    if ($this->Model->usedEmail($body['email'])) {
      $this->_fail('EMAIL_IN_USE', 200);
    }

    // put Company in DB
    $entity = $this->Model->entity(null, $body['email'], $body['password'], $body['name']);
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CompanyCtrl::CREATE');

    $this->_success();
  }

  /*
  protected function GETBYID ($id) {
    $entity = $this->Model->getById($id);
    
    if (empty($entity))
      $this->_fail('NOT_FOUND', 400);
    
    $this->_success($this->_postProcessa($entity));
  }
  */
}
