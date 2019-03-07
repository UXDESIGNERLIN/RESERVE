<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClassesCtrl extends MY_Controller {
  use POSTPROCESS;
  use GETBYID;

  public function __construct () {
    parent::__construct('v0/ClassesMdl');

    $this->API = [
      'generic' => [
      ],
      'id' => [
        'GET' => [
          'fn' => 'GETBYID'
        ],
      ],
      'byCourse' => [
        'GET' => [
          'fn' => 'GETBYPARENT'
        ],
        'POST' => [
          'fn' => 'CREATE', 
          'checks' => [
            'loggedIn' => null,
            'body' => ['obligatoris' => ['tsIni', 'tsFi', 'spots']]
          ]
        ],
      ],
    ];

  }

  protected function CREATE ($idCourse) {
    $body = $this->body;

    // Check company is the owner of idCourse

    // Check tsIni

    // Check tsFi

    // Check tsIni > tsFi

    // put Course in DB
    $entity = $this->Model->entity(null, $idCourse, $body['tsIni'], $body['tsFi'], $body['spots'], time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'ClassesCtrl::CREATE');

    $this->_success();
  }

  protected function GETBYPARENT ($id) {
    $this->_success($this->_postProcessa($this->Model->getByCourse($id)));
  }
}
