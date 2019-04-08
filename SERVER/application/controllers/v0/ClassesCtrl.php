<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClassesCtrl extends MY_Controller {
  use POSTPROCESS;
  use CTRL_GETBYID;
  use CTRL_GETBYPARENT;

  public function __construct () {
    parent::__construct('v0/ClassesMdl');

    $this->API = [
      'generic' => [
      ],
      'id' => [
        'GET' => [
          'fn' => 'GETBYID'
        ],
        'PUT' => [
          'fn' => 'UPDATE',
          'checks' => [
            'loggedIn' => null,
            'body' => ['obligatoris' => ['idCourse', 'tsIni', 'len', 'spots']]
          ]
        ]
      ],
      'byCourse' => [
        'GET' => [
          'fn' => 'GETBYPARENT'
        ],
        'POST' => [
          'fn' => 'CREATE', 
          'checks' => [
            'loggedIn' => null,
            'body' => ['obligatoris' => ['tsIni', 'len', 'spots']]
          ]
        ],
      ],
      'byCompany' => [
        'GET' => [
          'fn' => 'GETAVAILABLECLASSES'
        ]
      ]
    ];

  }

  protected function CREATE ($idCourse) {
    $body = $this->body;

    // Check course exists
    $this->load->model('v0/CoursesMdl', 'CoursesMdl');
    $course = $this->CoursesMdl->getById($idCourse);

    if (empty($course))
      $this->_fail('NOT_FOUND', 400);

    // Check company is the owner of idCourse
    if ($course->idCompany != $this->sessio['companyId'])
      $this->_fail('NOT_ALLOWED', 403);

    // Check tsIni > time()
    if ($body['tsIni'] <= time())
      $this->_fail('CANT_PLAN_BACK_IN_TIME', 400);

    // Check len > 0
    if ($body['len'] <= 0)
      $this->_fail('BLACKHOLE_DURATION', 400);

    // Check spots > 0
    if ($body['spots'] <= 0)
      $this->_fail('BUY_SOME_CHAIRS', 400);

    // put Course in DB
    $entity = $this->Model->entity(null, $idCourse, $body['tsIni'], $body['len'], $body['spots'], time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'ClassesCtrl::CREATE');

    $this->_success();
  }

  protected function UPDATE ($idClass) {
    $body = $this->body;

    // Check class exists
    $class = $this->Model->getById($idClass);

    if (empty($class))
      $this->_fail('NOT_FOUND', 400);

    // Can't update idCourse
    if ($class->idCourse != $body['idCourse'])
      $this->_fail('CLASS_CANT_UPDATE_COURSE', 400);

    // Check course exists
    $this->load->model('v0/CoursesMdl', 'CoursesMdl');
    $course = $this->CoursesMdl->getById($class->idCourse);

    if (empty($course))
      $this->_fail('NOT_FOUND', 400);

    // Check company is the owner of idCourse
    if ($course->idCompany != $this->sessio['companyId'])
      $this->_fail('NOT_ALLOWED', 403);

    // Check tsIni > time()
    if ($body['tsIni'] <= time())
      $this->_fail('CANT_PLAN_BACK_IN_TIME', 400);

    // Check len > 0
    if ($body['len'] <= 0)
      $this->_fail('BLACKHOLE_DURATION', 400);

    // Check spots > 0
    if ($body['spots'] <= 0)
      $this->_fail('BUY_SOME_CHAIRS', 400);

    // put Course in DB
    $entity = $this->Model->entity(null, null, $body['tsIni'], $body['len'], $body['spots'], time());
    $success = $this->Model->update($idClass, $entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'ClassesCtrl::UPDATE');

    $this->_success();
  }
  
  protected function GETAVAILABLECLASSES ($idCompany) {
    $this->_success($this->Model->getAvailable($idCompany));
  }
}
