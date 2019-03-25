<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InsightsCtrl extends MY_Controller {

  public function __construct () {
    parent::__construct();

    $this->API = [
      'generic' => [
        'POST' => [
          'fn' => 'CREATE', 
          'checks' => [
            'loggedIn' => null,
            'body' => ['obligatoris' => ['name', 'description', 'reqInfo']]
          ]
        ],
      ],
      'byCourse' => [
        'GET' => [
          'fn' => 'GETBYCOURSE',
          'checks' => [
            'loggedIn' => null,
          ]
        ],
      ],
      'byCompany' => [
        'GET' => [
          'fn' => 'GETBYCOMPANY',
          'checks' => [
            'loggedIn' => null,
          ]
        ],
      ],
    ];
  }

  protected function GETBYCOURSE ($courseId) {

  }

  protected function GETBYCOMPANY ($companyId) {
    
  }
}
