<?php
defined('BASEPATH') OR exit('No direct script access allowed');




class TestCtrl extends MY_Controller {
  public function __construct () {
    parent::__construct();

    $this->API = [
      'generic' => [
        'GET' => [
          'fn' => 'TEST_MAIL3', 
        ],
      ],
    ];
  }

  protected function TEST_MAIL3 ($classId) {
    $this->load->helper('engage');

    engageMail('CLASS', $classId, [
      'from' => 'Organitzador mega cool',
      'subject' => '',
      'body' => 'Prova sense subject i amb placeholders [%SPOTID%]',
      'template' => 'engage',
      'futur' => false
    ]);
  }

  protected function TEST_MAIL_STYLE () {
    $this->load->library('email');

    $this->email->from('noreply@myspotbook.com', 'Test 2');
    $this->email->to('ignasimg@gmail.com');
    $this->email->subject('Test email subject 2');
    $this->email->message($this->load->view('emails/test_email_stripo', '', TRUE));

    var_dump($this->email->send());
  }

  protected function TEST_IDS () {
    var_dump($_POST);
    /*
    $id = createUniqueId();
    echo $id."<br>";
    var_dump(getIdInfo($id));
    */
  }

  protected function TEST_COMPANY_STATS ($companyId) {
    $this->load->helper('http_accept_language_helper');

    $this->load->model('v0/CoursesMdl');
    $this->load->model('v0/ClassesViewMdl');
    $this->load->model('v0/ReservesViewMdl');

    $this->_success([
      'numCourses' => $this->CoursesMdl->count(['idCompany' => $companyId], false), 
      'numClasses' => $this->ClassesViewMdl->countByCompany($companyId), 
      'languages' => HAL_Array(array_map(function ($v) { return $v->HTTP_ACCEPT_LANGUAGE; }, $this->ReservesViewMdl->languagesByCompany($companyId))),
      // % committment
      'genders' => $this->ReservesViewMdl->gendersByCompany($companyId),
      'ages' => $this->ReservesViewMdl->agesByCompany($companyId),
      'numUsers' => $this->ReservesViewMdl->companyUniqueUsers($companyId), 
      'numRepeaters' => $this->ReservesViewMdl->numUsersWhoRepeatCompany($companyId)
    ]);
  }

  protected function TEST_MAIL2 () {
    $this->load->helper('email');

    //sendMail('ignasimg@gmail.com', '<3', 'test works best', 'no reply');

    $success = sendMail('ignasimg@gmail.com', 'Activate your account', $this->load->view('emails/verify', '', TRUE), ['[%CHALLENGE%]' => '1234']);
    var_dump($success);
  }

  protected function TEST_MAIL ($domain = 'myspotbook') {
    $this->load->library('email');

    $this->email->from('test@'.$domain.'.com', 'Test 2');
    $this->email->to('ignasimg@gmail.com');
    $this->email->subject('Test email subject 2');
    $this->email->message('Test email message text 2');

    var_dump($this->email->send());

    //$this->_success();
  }

  protected function TEST_USED_EMAIL () {
    $this->load->model('v0/CompaniesMdl', 'Model');

    var_dump($this->Model->usedEmail('ling@gmail.com', 1)); // Should be false
    var_dump($this->Model->usedEmail('ling@gmail.com', 2)); // Should be true
    var_dump($this->Model->usedEmail('ignasi@ausva04.com', 2)); // Should be false
    var_dump($this->Model->usedEmail('test@test.test', 1)); // Should be false
    var_dump($this->Model->usedEmail('aquest email no és a la DB', 5)); // Should be false
    var_dump($this->Model->usedEmail('test@test.test')); // Should be false
    var_dump($this->Model->usedEmail('ignasi@ausva04.com')); // Should be true
    
  }

  protected function TEST_AVAIL_CLASSES ($cid) {
    $this->load->model('v0/ClassesMdl', 'Model');

    $this->_success($this->Model->getAvailable($cid));
  }
}
