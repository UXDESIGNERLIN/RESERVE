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
            'body' => ['obligatoris' => ['subject', 'msgbody']]
          ]
        ]
      ],
      'withCourse' => [
        'POST' => [
          'fn' => 'ENGAGEWITHCOURSE',
          'checks' => [
            'loggedIn' => true,
            'body' => ['obligatoris' => ['subject', 'msgbody']]
          ]
        ]
      ],
      'withClass' => [
        'POST' => [
          'fn' => 'ENGAGEWITHCLASS',
          'checks' => [
            'loggedIn' => true,
            'body' => ['obligatoris' => ['subject', 'msgbody']]
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

    //$this->_ENGAGE($this->ReservesViewMdl->getAllUserEmailsForClass($classId), $body);
    $this->_ENGAGEV2('CLASS', $classId, $body);
  }

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

  private function _ENGAGEV2 ($type, $recipientId, $body) {
    $this->load->model('v0/CompaniesMdl');
    $this->load->model('v0/EngagementMdl');
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
    $future = $body['future'] || false;

    // Obtain company information
    $company = $this->CompaniesMdl->getById($companyId);

    if (empty($company))
      $this->_fail('UNHANDLED_ERROR', 500, 'EngagementCtrl::ENGAGE');

    $fromName = $company->name ?? 'Organizer';

    // Obtain mailList
    $mailList = [];
    switch ($type) {
      case 'COMPANY' :
        $mailList = $this->ReservesViewMdl->getAllUserEmailsForCompany($recipientId);
        $future = false;
      break;
      case 'COURSE' : 
        $mailList = $this->ReservesViewMdl->getAllUserEmailsForCourse($recipientId);
        $future = false;
      break;
      case 'CLASS' : 
        $mailList = $this->ReservesViewMdl->getAllUserEmailsForClass($recipientId);
      break;
    }

    // Store Engagement in DB
    $entity = $this->EngagementMdl->entity(createUniqueId(), $companyId, $recipientId, $type, JSON_encode($realBody), $future);
    $success = $this->EngagementMdl->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'EngagementCtrl::ENGAGE');

    foreach ($mailList as $mail) {
      // Parse body as needed.
      sendMail($mail, $realBody['subject'], $realBody['msgbody'], $fromName, 'noreply@myspotbook.com');
    }

    $this->_success();
  }
}
