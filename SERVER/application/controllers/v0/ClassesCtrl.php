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
            'body' => ['obligatoris' => ['courseId', 'tsIni', 'len', 'spots']]
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

  protected function CREATE ($courseId) {
    $body = $this->body;

    // Check course exists
    $this->load->model('v0/CoursesMdl', 'CoursesMdl');
    $course = $this->CoursesMdl->getById($courseId);

    if (empty($course))
      $this->_fail('NOT_FOUND', 400);

    // Check company is the owner of idCourse
    if ($course->companyId != $this->sessio['companyId'])
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
    $entity = $this->Model->entity(createUniqueId(), $courseId, $body['tsIni'], $body['len'], $body['spots'], time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'ClassesCtrl::CREATE');

    $this->_success();
  }

  protected function UPDATE ($classId) {
    $body = $this->body;

    // Check class exists
    $class = $this->Model->getById($classId);

    if (empty($class))
      $this->_fail('NOT_FOUND', 400);

    // Can't update idCourse
    if ($class->courseId != $body['courseId'])
      $this->_fail('CLASS_CANT_UPDATE_COURSE', 400);

    // Check course exists
    $this->load->model('v0/CoursesMdl', 'CoursesMdl');
    $course = $this->CoursesMdl->getById($class->courseId);

    if (empty($course))
      $this->_fail('NOT_FOUND', 400);

    // Check company is the owner of courseId
    if ($course->companyId != $this->sessio['companyId'])
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
    $success = $this->Model->update($classId, $entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'ClassesCtrl::UPDATE');

    $this->_success();
  }
  
  protected function GETAVAILABLECLASSES ($companyId) {
    $this->_success($this->Model->getAvailable($companyId));
  }
}
