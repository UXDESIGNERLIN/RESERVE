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


// GET POST DELETE
$route['api/v0/session'] = 'v0/SessionCtrl/generic';



// GET POST PUT
$route['api/v0/company'] = 'v0/CompaniesCtrl/generic';
// GET
$route['api/v0/company/statistics'] = 'v0/StatisticsCtrl/ofCompany';
// GET
//$route['api/v0/company/(:num)'] = 'v0/CompaniesCtrl/id/$1';
// PUT
$route['api/v0/company/(:num)/verify'] = 'v0/CompaniesCtrl/verify/$1';



// GET
$route['api/v0/company/(:num)/courses'] = 'v0/CoursesCtrl/byCompany/$1';
// POST
$route['api/v0/course'] = 'v0/CoursesCtrl/generic';
// GET (PUT DELETE)
$route['api/v0/course/(:num)'] = 'v0/CoursesCtrl/id/$1';


// GET
$route['api/v0/company/(:num)/classes'] = 'v0/ClassesCtrl/byCompany/$1';
// GET POST
$route['api/v0/course/(:num)/classes'] = 'v0/ClassesCtrl/byCourse/$1';
// GET (PUT DELETE)
$route['api/v0/class/(:num)'] = 'v0/ClassesCtrl/id/$1';



// GET POST
$route['api/v0/class/(:num)/reserves'] = 'v0/ReservesCtrl/byClass/$1';
// GET (DELETE)
$route['api/v0/reserve/(:num)'] = 'v0/ReservesCtrl/id/$1';