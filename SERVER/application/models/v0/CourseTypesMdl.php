<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CourseTypesMdl extends CI_Model {

  public function getAll () {
    return $this->db->get('courseTypes')->result();
  }
}