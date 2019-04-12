<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CourseTypesCtrl extends MY_Controller {
  use POSTPROCESS;
  use CTRL_GETALL;

  public function __construct () {
    parent::__construct('v0/CourseTypesMdl');

    $this->API = [
      'generic' => [
        'GET' => [
          'fn' => 'GETALL', 
          'checks' => [
            //'loggedIn' => null,
          ]
        ],
      ],
    ];

  }
}
