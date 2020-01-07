<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class EngagementCtrl extends MY_Controller {
  public function __construct () {
    parent::__construct();

    $this->API = [
      'withCompany' => [
        'POST' => [
          'fn' => 'ENGAGEWITHCOMPANY',
          'checks' => [
            'loggedIn' => true,
            'body' => [
              'obligatoris' => ['subject', 'msgbody'],
              'opcionals' => ['futureEngagement' => false]
            ]
          ]
        ]
      ],
      'withCourse' => [
        'POST' => [
          'fn' => 'ENGAGEWITHCOURSE',
          'checks' => [
            'loggedIn' => true,
            'body' => [
              'obligatoris' => ['subject', 'msgbody'],
              'opcionals' => ['futureEngagement' => false]
            ]
          ]
        ]
      ],
      'withClass' => [
        'POST' => [
          'fn' => 'ENGAGEWITHCLASS',
          'checks' => [
            'loggedIn' => true,
            'body' => [
              'obligatoris' => ['subject', 'msgbody', 'futureEngagement']
            ]
          ]
        ]
      ],
      'confirmation' => [
        'PUT' => [
          'fn' => 'SEND_CONFIRMATION',
          'checks' => [
            'loggedIn' => true
          ]
        ]
      ]
    ];

    $this->load->model('v0/ReservesViewMdl');
  }

  protected function ENGAGEWITHCOMPANY () {
    $body = $this->body;
    $companyId = $this->sessio['companyId'];

    //$this->_ENGAGE($this->ReservesViewMdl->getAllUserEmailsForCompany($companyId), $body);
    $this->_ENGAGEV2('COMPANY', $companyId, $body);
  }

  protected function ENGAGEWITHCOURSE ($courseId) {
    $this->load->model('v0/CoursesMdl');

    $body = $this->body;
    $companyId = $this->sessio['companyId'];

    // Check course exists
    $course = $this->CoursesMdl->getById($courseId);
    if (empty($course))
      $this->_fail('NOT_FOUND', 400);
      
    // check $courseId belongs to $companyId
    if ($course->companyId != $companyId)
      $this->_fail('NOT_ALLOWED', 403);

    //$this->_ENGAGE($this->ReservesViewMdl->getAllUserEmailsForCourse($courseId), $body);
    $this->_ENGAGEV2('COURSE', $courseId, $body);
  }

  protected function ENGAGEWITHCLASS ($classId) {
    $this->load->model('v0/ClassesViewMdl');

    $body = $this->body;
    $companyId = $this->sessio['companyId'];

    // Check class exists
    $class = $this->ClassesViewMdl->getById($classId);
    if (empty($class))
      $this->_fail('NOT_FOUND', 400);
      
    // check $classId belongs to $companyId
    if ($class->companyId != $companyId)
      $this->_fail('NOT_ALLOWED', 403);

    // Check if future is set, class didn't start yet
    if (time() >= $class->tsIni && $body['futureEngagement']) 
      $this->_fail('CANT_DO_OPERATION_AFTER_CLASS_STARTED', 400);

    //$this->_ENGAGE($this->ReservesViewMdl->getAllUserEmailsForClass($classId), $body);
    $this->_ENGAGEV2('CLASS', $classId, $body);
  }

  /*
  private function _ENGAGE($mailList, $body) {
    $this->load->model('v0/CompaniesMdl');
    $this->load->helper('email');

    $company = $this->CompaniesMdl->getById($this->sessio['companyId']);

    if (empty($company))
      $this->_fail('UNHANDLED_ERROR', 500, 'EngagementCtrl::ENGAGE');

    $fromName = $company->name ?? 'Organizer';

    foreach ($mailList as $mail) {
      sendMail($mail, $body['subject'], $body['msgbody'], $fromName, 'noreply@myspotbook.com');
    }

    $this->_success();
  }
  */

  private function _ENGAGEV2 ($type, $recipientId, $body) {
    $this->load->model('v0/CompaniesMdl');
    $this->load->model('v0/EngagementsMdl');
    $this->load->helper('email');

    $companyId = $this->sessio['companyId'];

    // Check Body is valid
    if (empty($body['subject'])) // Has subject (non empty)
      $this->_fail('SUBJECT_CANT_BE_EMPTY', 400);
    
    if (empty($body['msgbody'])) // Has msgbody (non empty)
      $this->_fail('MESSAGE_BODY_CANT_BE_EMPTY', 400);
    
    $realBody = [
      'subject' => $body['subject'],
      'msgbody' => $body['msgbody']
    ];
    $future = $body['futureEngagement'] || false;

    // Obtain company information
    $company = $this->CompaniesMdl->getById($companyId);

    if (empty($company))
      $this->_fail('UNHANDLED_ERROR', 500, 'EngagementCtrl::ENGAGE');

    $fromName = $company->name ?? 'Organizer';

    // Obtain mailList
    //$mailList = [];
    $spotbook = [];
    switch ($type) {
      case 'COMPANY' :
        //$mailList = $this->ReservesViewMdl->getAllUserEmailsForCompany($recipientId);
        $spotbook = $this->ReservesViewMdl->getAllUniqueUsersForCompany($recipientId);
        if ($future) 
          $this->_fail('CANT_ENGAGE_WITH_FUTURE_OF_COMPANY', 400);
      break;
      case 'COURSE' : 
        //$mailList = $this->ReservesViewMdl->getAllUserEmailsForCourse($recipientId);
        $spotbook = $this->ReservesViewMdl->getAllUniqueUsersForCourse($recipientId);
        if ($future) 
          $this->_fail('CANT_ENGAGE_WITH_FUTURE_OF_COURSE', 400);
      break;
      case 'CLASS' : 
        //$mailList = $this->ReservesViewMdl->getAllUserEmailsForClass($recipientId);
        $spotbook = $this->ReservesViewMdl->getAllUniqueUsersForClass($recipientId);
      break;
    }

    // Store Engagement in DB
    $entity = $this->EngagementsMdl->entity(createUniqueId(), $companyId, $recipientId, $type, json_encode($realBody), $future);
    $success = $this->EngagementsMdl->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'EngagementCtrl::ENGAGE');

    $placeholders = ['[%__SPOTID__%]', '[%EMAIL%]', '[%ORGANIZER%]'];

    //foreach ($mailList as $mail) {
    foreach ($spotbook as $spot) {

      $replacers = [$spot->id, $spot->email, $fromName];

      $subject = str_replace($placeholders, $replacers, $realBody['subject']);
      $msgbody = str_replace($placeholders, $replacers, $realBody['msgbody']);

      sendMail($spot->email, $subject, $msgbody, $fromName, 'noreply@myspotbook.com');
    }

    $this->_success();
  }

  protected function SEND_CONFIRMATION ($classId) {
    $this->load->model('v0/ClassesMdl');
    $companyId = $this->sessio['companyId'];
    
    $class = $this->ClassesMdl->getById($classId);
    if (empty($class))
      $this->_fail('NOT_FOUND', 400);
      
    // check $classId belongs to $companyId
    if ($class->companyId != $companyId)
      $this->_fail('NOT_ALLOWED', 403);

    // Comprovar que la classe no hagi començat ja.
    if (time() >= $class->tsIni)
      $this->_fail('CANT_DO_OPERATION_AFTER_CLASS_STARTED', 400);

    // Comprovar que la classe no hagi estat ja "confirmada".
    if ($class->confirmationSent)
      $this->_fail('CANT_CONFIRM_TWICE', 400);

    // Actualitzar classe (confirmada).
    $this->ClassesMdl->sentConfirmation($classId);

    // Enviar e-mails
    $this->_ENGAGEV2('CLASS', $classId, [
      'subject' => 'Confirm the class', 
      'msgbody' => '<h1>CONFIRM</h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]</p>', 
      'futureEngagement' => true
    ]);
  }
}
