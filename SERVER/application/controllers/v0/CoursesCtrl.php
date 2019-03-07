<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CoursesCtrl extends MY_Controller {
  use POSTPROCESS;
  use GETBYID;

  public function __construct () {
    parent::__construct('v0/CoursesMdl');

    $this->API = [
      'generic' => [
        'POST' => [
          'fn' => 'CREATE', 
          'checks' => [
            'loggedIn' => null,
            'body' => ['obligatoris' => ['name', 'description', 'reqInfo']]
          ]
        ],
      ],
      'id' => [
        'GET' => [
          'fn' => 'GETBYID'
        ],
      ],
      'byCompany' => [
        'GET' => [
          'fn' => 'GETBYPARENT'
        ],
      ],
    ];

  }

  protected function CREATE () {
    $body = $this->body;
    $companyId = $this->sessio['companyId'];

    $body['name'] = trim($body['name']);

    // Check description

    // Check reqInfo

    // put Course in DB
    $entity = $this->Model->entity(null, $companyId, $body['name'], $body['description'], $body['reqInfo'], time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CourseCtrl::CREATE');

    $this->_success();
  }

  protected function GETBYPARENT ($id) {
    $this->_success($this->_postProcessa($this->Model->getByCompany($id)));
  }
}
