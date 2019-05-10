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
    $this->load->helper('http_accept_language_helper');
    $this->load->model('v0/CoursesMdl');
    $this->load->model('v0/ClassesViewMdl');
    $this->load->model('v0/ReservesViewMdl');

    $companyId = $this->sessio['companyId'];

    $this->_success([
      'numCourses' => $this->CoursesMdl->count(['companyId' => $companyId], false), 
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
    $this->load->helper('http_accept_language_helper');
    $this->load->model('v0/CoursesMdl');
    $this->load->model('v0/ClassesViewMdl');
    $this->load->model('v0/ReservesViewMdl');

    $companyId = $this->sessio['companyId'];

    // Check course exists
    $course = $this->CoursesMdl->getById($courseId);
    if (empty($course))
      $this->_fail('NOT_FOUND', 400);
      
    // check $id belongs to $companyId
    if ($course->companyId != $companyId)
      $this->_fail('COURSE_NOT_YOURS', 400);

    $this->_success([
      'numClasses' => $this->ClassesViewMdl->countByCourse($courseId), 
      'languages' => HAL_Array(array_map(function ($v) { return $v->HTTP_ACCEPT_LANGUAGE; }, $this->ReservesViewMdl->languagesByCourse($courseId))),
      // % committment
      'genders' => $this->ReservesViewMdl->gendersByCourse($courseId),
      'ages' => $this->ReservesViewMdl->agesByCourse($courseId),
      'numUsers' => $this->ReservesViewMdl->courseUniqueUsers($courseId), 
      'numRepeaters' => $this->ReservesViewMdl->numUsersWhoRepeatCourse($courseId),
      'avgReserves' => $this->ClassesViewMdl->avgReservesPerClass($courseId) // Mean reserves / Class 
      // groupBy dies de la setmana (registres)
      // groupBy hores (registres)
    ]);
  }

  protected function GETCLASSSTATISTICS ($classId) {
    $this->load->helper('http_accept_language_helper');
    $this->load->model('v0/ClassesViewMdl');
    $this->load->model('v0/ReservesViewMdl');

    $companyId = $this->sessio['companyId'];

    // Check class exists
    $class = $this->ClassesViewMdl->getById($classId);
    if (empty($class))
      $this->_fail('NOT_FOUND', 400);
      
    // check $classId belongs to $companyId
    if ($class->companyId != $companyId)
      $this->_fail('COURSE_NOT_YOURS', 400);

    $this->_success([ 
      'languages' => HAL_Array(array_map(function ($v) { return $v->HTTP_ACCEPT_LANGUAGE; }, $this->ReservesViewMdl->languagesByClass($classId))),
      'genders' => $this->ReservesViewMdl->gendersByClass($classId),
      'ages' => $this->ReservesViewMdl->agesByClass($classId),
      'numRepeaters' => $this->ReservesViewMdl->numUsersInClassWhoRepeatCourse($classId, $class->courseId),
    ]);
  }
}
