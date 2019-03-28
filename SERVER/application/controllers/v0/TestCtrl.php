<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TestCtrl extends MY_Controller {
  public function __construct () {
    parent::__construct();

    $this->API = [
      'generic' => [
        'GET' => [
          'fn' => 'TEST', 
        ],
      ],
    ];
  }

  protected function TEST ($domain = 'myspotbook') {
    $this->load->library('email');

    $this->email->from('test@'.$domain.'.com', 'Test 2');
    $this->email->to('ignasimg@gmail.com');
    $this->email->subject('Test email subject 2');
    $this->email->message('Test email message text 2');

    var_dump($this->email->send());

    //$this->_success();
  }
}
