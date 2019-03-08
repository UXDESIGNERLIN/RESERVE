<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservesCtrl extends MY_Controller {
  use POSTPROCESS;
  use CTRL_GETBYID;
  use CTRL_GETBYPARENT;

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

    $this->load->helper('validacio');
  }

  protected function CREATE ($idClass) {
    $body = $this->body;

    $body['fname'] = trim($body['fname']);
    $body['email'] = trim($body['email']);
    $body['phone'] = trim($body['phone']);
    $body['age'] = intval($body['age']);

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

    // Check dades rebudes a body compleixen dades demanades per course->reqInfo
    $this->load->model('v0/CoursesMdl', 'CoursesMdl');
    $course = $this->CoursesMdl->getById($class->idCourse);

    if (empty($course))
      $this->_fail('UNHANDLED_ERROR', 500, 'ReservesCtrl::CREATE');

    if (in_array('fname', $course->reqInfo) && empty($body['fname']))
      $this->_fail('FNAME_REQUIRED', 400);
    
    if (in_array('age', $course->reqInfo) && empty($body['age']))
      $this->_fail('AGE_REQUIRED', 400);

    if (in_array('gender', $course->reqInfo) && $body['gender'] != 'm' && $body['gender'] != 'f')
      $this->_fail('GENDER_REQUIRED', 400);
    
    if (in_array('email', $course->reqInfo)) {
      if (empty($body['email']))
        $this->_fail('EMAIL_REQUIRED', 400);

      if (!validEmail($body['email']))
        $this->_fail('EMAIL_WRONG_FORMAT', 400);
    }
      
    if (in_array('phone', $course->reqInfo)) {
      if (empty($body['phone']))
        $this->_fail('PHONE_REQUIRED', 400);
      
      if (!validPhone($body['phone']))
        $this->_fail('PHONE_WRONG_FORMAT', 400);

      $body['phone'] = phoneNumberToE164($body['phone']);
    }

    // put Reservation in DB
    $entity = $this->Model->entity(null, $idClass, $body['email'], $body['fname'], $body['phone'], $body['age'], $body['gender'], time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'ReservesCtrl::CREATE');

    $this->_success();
  }
}
