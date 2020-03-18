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

  private function _ENGAGEV2 ($type, $recipientId, $body, $template = 'engage') {
    $this->load->model('v0/CompaniesMdl');
    $this->load->model('v0/EngagementsMdl');
    $this->load->helper('engage');

    $companyId = $this->sessio['companyId'];

    // Must have subject
    if (empty($body['subject']))
      $this->_fail('SUBJECT_CANT_BE_EMPTY', 400);
    
    // If we use the engage template, there must be a body to the message
    if ($template == 'engage' && empty($body['msgbody']))
      $this->_fail('MESSAGE_BODY_CANT_BE_EMPTY', 400);
    
    $future = $body['futureEngagement'] || false;

    // Obtain company information
    $company = $this->CompaniesMdl->getById($companyId);

    if (empty($company))
      $this->_fail('UNHANDLED_ERROR', 500, 'EngagementCtrl::ENGAGE');

    $fromName = $company->name ?? 'MySpotBook partner';

    // Obtain recipients
    $spotbook = [];
    switch ($type) {
      case 'COMPANY' :
        $spotbook = $this->ReservesViewMdl->getAllUniqueUsersForCompany($recipientId);
        if ($future) 
          $this->_fail('CANT_ENGAGE_WITH_FUTURE_OF_COMPANY', 400);
      break;
      case 'COURSE' :
        $spotbook = $this->ReservesViewMdl->getAllUniqueUsersForCourse($recipientId);
        if ($future) 
          $this->_fail('CANT_ENGAGE_WITH_FUTURE_OF_COURSE', 400);
      break;
      case 'CLASS' :
        $spotbook = $this->ReservesViewMdl->getAllUniqueUsersForClass($recipientId);
      break;
    }

    $data = [
      'subject' => $body['subject'],
      'body' => $body['msgbody'],
      'template' => $template
    ];

    // Store Engagement in DB
    $entity = $this->EngagementsMdl->entity(createUniqueId(), $companyId, $recipientId, $type, json_encode($data), $future);
    $success = $this->EngagementsMdl->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'EngagementCtrl::ENGAGE');

    engageMail($spotbook, $fromName, $data);

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
      'futureEngagement' => true
    ], 'confirmation');
  }
}
