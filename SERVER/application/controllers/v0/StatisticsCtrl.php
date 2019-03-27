<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class StatisticsCtrl extends MY_Controller {
  public function __construct () {
    parent::__construct();

    $this->API = [
      'generic' => [
        'GET' => [
          'fn' => 'GETALL', 
        ],
      ],
    ];
  }

  protected function GETALL () {
    $this->load->model('v0/CompaniesMdl');
    $this->load->model('v0/ClassesMdl');
    $this->load->model('v0/ReservesMdl');
    $companies = $this->CompaniesMdl->count([], false);
    $activities = $this->ClassesMdl->count([], false);
    $reserves = $this->ReservesMdl->count([], false);
    $this->_success(['companies' => $companies, 'activities' => $activities, 'reserves' => $reserves, 'commitment' => 98.6]);
  }
}
