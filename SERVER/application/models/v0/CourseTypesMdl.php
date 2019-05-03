<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CourseTypesMdl extends CI_Model {

  public function getAll () {
    return $this->db->get('courseTypes')->result();
  }

  public function idExists ($id) {
    return $this->db->where(['id' => $id])->get('courseTypes')->num_rows() > 0;
  }
}