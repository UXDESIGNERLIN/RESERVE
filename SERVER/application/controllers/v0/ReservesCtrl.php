<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservesCtrl extends MY_Controller {
  use POSTPROCESS;
  use CTRL_GETBYID;
  //use CTRL_GETBYPARENT;

  public function __construct () {
    parent::__construct('v0/ReservesMdl');

    $this->API = [
      //'generic' => [
      //],
      'id' => [
        /*
        'GET' => [
          'fn' => 'GETBYID',
          'checks' => [
            'loggedIn' => null,
          ]
        ],
        */
        'DELETE' => [
          'fn' => 'DELETE',
          'checks' => [
            'loggedIn' => true
          ]
        ]
      ],
      'byClass' => [
        'GET' => [
          'fn' => 'GETBYPARENT',
          'checks' => [
            'loggedIn' => true
          ]
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
      'confirmation' => [
        'PUT' => [
          'fn' => 'CONFIRM',
          //'checks' => [
          //  'body' => [
          //    'obligatoris' => ['email']
          //  ]
          //]
        ]
      ],
    ];

    $this->load->helper('validacio');
  }

  protected function CREATE ($classId) {
    $body = $this->body;

    $body['fname'] = is_null($body['fname']) || empty($body['fname']) ? null : trim($body['fname']);
    $body['email'] = is_null($body['email']) || empty($body['email']) ? null : trim($body['email']);
    $body['phone'] = is_null($body['phone']) || empty($body['phone']) ? null : trim($body['phone']);
    $body['age'] = is_null($body['age']) || empty($body['age']) ? null : intval($body['age']);
    $body['gender'] = is_null($body['gender']) || empty($body['gender']) ? null : $body['gender'];

    // Check class exists
    $this->load->model('v0/ClassesMdl', 'ClassesMdl');
    $class = $this->ClassesMdl->getById($classId);

    if (empty($class))
      $this->_fail('NOT_FOUND', 400);

    // Check class still open
    if ($class->tsIni < time())
      $this->_fail('ALREADY_STARTED', 400);

    // Check class has free spots
    if ($class->spots <= $class->numReserves)
      $this->_fail('FULL_CLASS', 400);

    

    // Check dades rebudes a body compleixen dades demanades per course->reqInfo
    if (in_array('fname', $class->reqInfo) && empty($body['fname']))
      $this->_fail('FNAME_REQUIRED', 400);
    
    if (in_array('age', $class->reqInfo) && empty($body['age']))
      $this->_fail('AGE_REQUIRED', 400);

    if (in_array('gender', $class->reqInfo) && $body['gender'] != 'm' && $body['gender'] != 'f')
      $this->_fail('GENDER_REQUIRED', 400);
    
    if (in_array('email', $class->reqInfo)) {
      if (empty($body['email']))
        $this->_fail('EMAIL_REQUIRED', 400);

      if (!validEmail($body['email']))
        $this->_fail('EMAIL_WRONG_FORMAT', 400);

      if ($this->Model->usedEmailOnClass($classId, $body['email']))
        $this->_fail('ALREADY_REGISTERED', 400);
    }
      
    if (in_array('phone', $class->reqInfo)) {
      if (empty($body['phone']))
        $this->_fail('PHONE_REQUIRED', 400);
      
      if (!validPhone($body['phone']))
        $this->_fail('PHONE_WRONG_FORMAT', 400);

      $body['phone'] = phoneNumberToE164($body['phone']);
    }

    // put Reservation in DB
    $entity = $this->Model->entity(createUniqueId(), $classId, $body['email'], $body['fname'], $body['phone'], $body['age'], $body['gender'], $_SERVER['REMOTE_ADDR'], $_SERVER['HTTP_USER_AGENT'], $_SERVER['HTTP_ACCEPT_LANGUAGE'], time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'ReservesCtrl::CREATE');

    $this->load->helper('email');
    sendMail($body['email'], 'You\'ve a spot!', 'You reserved a spot for '.$class->name.' that will take place from '.$class->tsIni.' to '.($class->tsIni + $class->len).' see you soon!', 'no reply');

    // Comprovar si hi ha engagements pendents de tipus 'CLASS' i recipientId $classId
    $this->load->model('v0/EngagementsMdl');
    $futurs = $this->EngagementsMdl->futurs('CLASS', $classId);

    foreach ($futurs as $futur) {
      $mailInfo = json_decode($futur->body, true);
      sendMail($body['email'], $mailInfo['subject'], $mailInfo['msgbody'], 'no reply');
    }

    $this->_success();
  }

  protected function GETBYPARENT ($classId) {
    $companyId = $this->sessio['companyId'];

    // Check class exists & user is the owner
    $this->load->model('v0/ClassesViewMdl');
    $class = $this->ClassesViewMdl->getById($classId);

    if (empty($class))
      $this->_fail('NOT_FOUND', 400);

    if ($class->companyId != $companyId)
      $this->_fail('NOT_ALLOWED', 403);

    $this->_success($this->_postProcessa($this->Model->getByParent($classId)));
  }

  protected function DELETE ($id) {
    $companyId = $this->sessio['companyId'];

    // Check reservation exists & user is the owner
    $reservation = $this->Model->getById($id);

    if (empty($reservation))
      $this->_fail('NOT_FOUND', 400);

    if ($reservation->companyId != $companyId)
      $this->_fail('NOT_ALLOWED', 403);

    if ($reservation->tsIni < time())
      $this->_fail('TOO_LATE_TO_CANCEL', 400);

    $success = $this->Model->cancelReserve($id);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'ReservesCtrl::DELETE');

    $this->load->helper('email');
    sendMail($reservation->email, 'Your spot has been cancelled!', 'Your spot for '.$reservation->courseName.' that is going to take place from '.$reservation->tsIni.' to '.($reservation->tsIni + $reservation->len).' has been cancelled due to organization reasons!', 'no reply');

    $this->_success();
  }

  protected function CONFIRM ($id, $confirmationValue) { 
    // $confirmationValue is a 0 or 1 to be interepreted as unconfirmed / confirmed
    $body = $this->body;
    
    // Obtenir reserva
    $reserva = $this->Model->getById($id);

    // Check reserve exists
    if (empty($reserva))
      $this->_fail('NOT_FOUND', 400);

    // Check email is owner of reserve
    //if ($reserva->email != $body['email'])
    //  $this->_fail('NOT_FOUND', 400);

    // Obtenir classe
    $this->load->model('v0/ClassesMdl');
    $classe = $this->ClassesMdl->getById($id);

    // Classe ha començat? -> Error
    if (time() >= $reserva->tsIni)
      $this->_fail('CANT_DO_OPERATION_AFTER_CLASS_STARTED', 400);

    // Reserva ja confirmada / desconfirmada -> Error
    if ($reserva->confirmation != 'pending')
      $this->_fail('CANT_CHANGE_YOUR_MIND', 400);

    // Classe no confirmada -> Error
    if (!$classe->confirmationSent)
      $this->_fail('CLASS_NOT_CONFIRMED_YET', 400);

    $this->Model->confirmAttendance($id, !!$confirmationValue);

    $this->_success();
  }
}
