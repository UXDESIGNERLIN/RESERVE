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
    $this->load->model('v0/CoursesMdl');
    //$this->load->model('v0/ClassesMdl');
    $this->load->model('v0/ReservesViewMdl');
    /*
    // # Courses
    $numCourses = $this->CoursesMdl->count(['idCompany' => $companyId], false);
    // # Classes
    $numClasses = $this->ClassesMdl->count(['idCompany' => $companyId], false);
    // # Users
    $numUsers = $this->ReservesViewMdl->companyUniqueUsers($companyId);
    // languages
    // % of committment
    // % of users who repeatedly join any class from your company
    $numRepeaters = $this->ReservesViewMdl->numUsersWhoRepeatCompany($companyId);
    */
    $this->_success([
      'numCourses' => $this->CoursesMdl->count(['idCompany' => $companyId], false), 
      //'numClasses' => $this->ClassesMdl->count(['idCompany' => $companyId], false), 
      // languages
      // % committment
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
