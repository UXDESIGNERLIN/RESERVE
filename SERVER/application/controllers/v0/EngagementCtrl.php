<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class StatisticsCtrl extends MY_Controller {
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

    $this->_ENGAGE($this->ReservesViewMdl->getAllUserEmailsForCompany($companyId), $body);
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
      $this->_fail('COURSE_NOT_YOURS', 400);

    $this->_ENGAGE($this->ReservesViewMdl->getAllUserEmailsForCourse($courseId), $body);
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
      $this->_fail('COURSE_NOT_YOURS', 400);

    $this->_ENGAGE($this->ReservesViewMdl->getAllUserEmailsForClass($classId), $body);
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
  }
}
