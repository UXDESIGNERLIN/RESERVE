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
      'ofCompany' => [
        'GET' => [
          'fn' => 'GETCOMPANYSTATISTICS',
          'checks' => [
            'loggedIn' => true
          ]
        ]
      ],
      'ofCourse' => [
        'GET' => [
          'fn' => 'GETCOURSESTATISTICS',
          'checks' => [
            'loggedIn' => true
          ]
        ]
      ],
      'ofClass' => [
        'GET' => [
          'fn' => 'GETCLASSSTATISTICS',
          'checks' => [
            'loggedIn' => true
          ]
        ]
      ]
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

  protected function GETCOMPANYSTATISTICS () {
    $companyId = $this->sessio['companyId'];
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

  protected function GETCOURSESTATISTICS ($courseId) {
    $companyId = $this->sessio['companyId'];
    // % of committment
    // Mean Users / Class
    // % of users who joined this course more than once
  }

  protected function GETCLASSSTATISTICS ($classId) {
    $companyId = $this->sessio['companyId'];

  }
}
