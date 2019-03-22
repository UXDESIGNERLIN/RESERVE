<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SupportCtrl extends MY_Controller {
  public function __construct () {
    parent::__construct();

    $this->API = [
      'generic' => [
        'GET' => [
          'fn' => 'TEST',
        ],
        'POST' => [
          'fn' => 'CREATE', 
        ],
      ],
    ];
  }

  protected function TEST () {
    //$this->_success('hola');
  }

  protected function CREATE () {
    // pot tenir 
  }
}
