<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
//$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;


$route['api/v0/test'] = 'v0/TestCtrl/generic';
$route['api/v0/test/(:any)'] = 'v0/TestCtrl/generic/$1';


$route['api/v0/statistics'] = 'v0/StatisticsCtrl/generic';
$route['api/v0/support'] = 'v0/SupportCtrl/generic';

// GET
$route['api/v0/rollcall'] = 'v0/TrackingCtrl/pendingRollcall';

// GET POST DELETE
$route['api/v0/session'] = 'v0/SessionCtrl/generic';

// POST PUT
$route['api/v0/recover'] = 'v0/CompaniesCtrl/recover';

// GET POST PUT
$route['api/v0/company'] = 'v0/CompaniesCtrl/generic';
// GET
$route['api/v0/company/statistics'] = 'v0/StatisticsCtrl/ofCompany';
// PUT
$route['api/v0/company/verify'] = 'v0/CompaniesCtrl/verify';
// POST
$route['api/v0/company/engage'] = 'v0/EngagementCtrl/withCompany';


// GET
$route['api/v0/company/(:any)/courses'] = 'v0/CoursesCtrl/byCompany/$1';
// POST
$route['api/v0/course'] = 'v0/CoursesCtrl/generic';
// GET (PUT DELETE)
$route['api/v0/course/(:any)'] = 'v0/CoursesCtrl/id/$1';
// GET
$route['api/v0/course/(:any)/statistics'] = 'v0/StatisticsCtrl/ofCourse/$1';
// POST
$route['api/v0/course/(:any)/engage'] = 'v0/EngagementCtrl/withCourse/$1';


// GET
$route['api/v0/company/(:any)/classes'] = 'v0/ClassesCtrl/byCompany/$1';
// GET POST
$route['api/v0/course/(:any)/classes'] = 'v0/ClassesCtrl/byCourse/$1';
// GET (PUT DELETE)
$route['api/v0/class/(:any)'] = 'v0/ClassesCtrl/id/$1';
// PUT
$route['api/v0/class/(:any)/confirmation'] = 'v0/EngagementCtrl/confirmation/$1';
// PUT
//$route['api/v0/class/(:any)/rollcall'] = 'v0/TrackingCtrl/rollcall/$1';
// GET
$route['api/v0/class/(:any)/statistics'] = 'v0/StatisticsCtrl/ofClass/$1';
// POST
$route['api/v0/class/(:any)/engage'] = 'v0/EngagementCtrl/withClass/$1';


// GET POST
$route['api/v0/class/(:any)/reserves'] = 'v0/ReservesCtrl/byClass/$1';
// PUT DELETE
$route['api/v0/reserve/(:any)'] = 'v0/ReservesCtrl/id/$1';
// GET
$route['api/v0/reserve/(:any)/info'] = 'v0/ReservesCtrl/info/$1';
// PUT
$route['api/v0/reserve/(:any)/unsure_attendance'] = 'v0/ReservesCtrl/confirmation/$1/0';
$route['api/v0/reserve/(:any)/sure_attendance'] = 'v0/ReservesCtrl/confirmation/$1/1';


// GET
$route['api/v0/course_types'] = 'v0/CourseTypesCtrl/generic';





// POST
$route['api/im_interested'] = 'v0/InterestedEmailsCtrl/generic';
