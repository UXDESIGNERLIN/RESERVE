<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservesCtrl extends MY_Controller {
  use POSTPROCESS;
  use GETBYID;
  use GETBYPARENT;

  public function __construct () {
    parent::__construct('v0/ReservesMdl');

    $this->API = [
      'generic' => [
      ],
      'id' => [
        'GET' => [
          'fn' => 'GETBYID'
        ],
      ],
      'byClass' => [
        'GET' => [
          'fn' => 'GETBYPARENT'
        ],
        'POST' => [
          'fn' => 'CREATE', 
          'checks' => [
            'body' => [
              'opcionals' => ['email' => null, 'fname' => null, 'phone' => null, 'age' => null, 'gender' => null]
            ]
          ]
        ],
      ],
    ];

  }

  protected function CREATE ($idClass) {
    $body = $this->body;

    // Check class exists
    $this->load->model('v0/ClassesMdl', 'ClassesMdl');
    $class = $this->ClassesMdl->getById($idClass);

    if (empty($class))
      $this->_fail('NOT_FOUND', 400);

    // Check class still open
    if ($class->tsIni < time())
      $this->_fail('ALREADY_STARTED', 400);

    // Check class has free spots
    // ... Highly depends on updating db to MariaDB

    // Check dades rebudes a body compleixen dades demanades per class->reqInfo

    // Check e-mail format
    // Check phone format


    // put Course in DB
    $entity = $this->Model->entity(null, $idClass, $body['email'], $body['fname'], $body['phone'], $body['age'], $body['gender'], time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'ReservesCtrl::CREATE');

    $this->_success();
  }
}
