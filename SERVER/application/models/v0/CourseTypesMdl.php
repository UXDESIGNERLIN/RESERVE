<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CourseTypesMdl extends MY_Model {
  use POSTPROCESS, MDL_GETALL;

  public function __construct () {
    parent::__construct('courseTypes');
  }
}