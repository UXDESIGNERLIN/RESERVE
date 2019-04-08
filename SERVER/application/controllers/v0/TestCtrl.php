<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TestCtrl extends MY_Controller {
  public function __construct () {
    parent::__construct();

    $this->API = [
      'generic' => [
        'GET' => [
          'fn' => 'TEST_AVAIL_CLASSES', 
        ],
      ],
    ];
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
