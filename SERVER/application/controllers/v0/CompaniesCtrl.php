<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CompaniesCtrl extends MY_Controller {
  use POSTPROCESS;
  use CTRL_GETBYID;

  public function __construct () {
    parent::__construct('v0/CompaniesMdl');

    $this->API = [
      'generic' => [
        'POST' => [
          'fn' => 'CREATE', 
          'checks' => [
            'notLoggedIn' => null,
            'body' => ['obligatoris' => ['email', 'name', 'password']]
          ]
        ],
        'PUT' => [
          'fn' => 'UPDATE',
          'checks' => [
            'loggedIn' => null,
            'body' => [
              'obligatoris' => [ 'email', 'name', 'password' ],
              'opcionals' => [ 'new_password' => null ]
            ]
          ]
        ]
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
    $entity = $this->Model->entity(null, $body['email'], $body['password'], $body['name'], time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CompanyCtrl::CREATE');

    $this->_success();
  }

  protected function UPDATE () {
    $body = $this->body;
    $companyId = $this->sessio['companyId'];

    $body['email'] = trim($body['email']);
    $body['name'] = trim($body['name']);

    // Validate email
    if (!validEmail($body['email'])) {
      $this->_fail('EMAIL_WRONG_FORMAT', 400);
    }

    // Check email is unique besides for our company
    if ($this->Model->usedEmail($body['email'], $companyId)) {
      $this->_fail('EMAIL_IN_USE', 200);
    }

    // Check password is correct
    if (!$this->Model->confirmPassword($companyId, $body['password'])) {
      $this->_fail('INCORRECT_PASSWORD', 200);
    }

    $entity = $this->Model->entity(null, $body['email'], $body['new_password'], $body['name'], null);
    $success = $this->Model->update($companyId, $entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CompanyCtrl::UPDATE');

    $this->_success();
  }
}
