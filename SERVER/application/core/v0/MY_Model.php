<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Model extends CI_Model {

  public function __construct($table) {
    parent::__construct();
    $this->_table = $table;
  }
  
  protected function postProcessa(&$result) {}
  
  protected function _postProcessa($results) {
    if (is_array($results)) {
      foreach ($results as $result) {
        $this->postProcessa($result);
      }
    }
    else {
      $this->postProcessa($results);
    }
    return $results;
  }
  
  public function getAll() {
    $query = $this->db->get($this->_table);
    return $this->_postProcessa($query->result());
  }
  
  protected function _getAllAndFilter($term, $fields) {
    $query = $this->db;
    if (!is_null($term))
      $query = $query->or_like(array_fill_keys($fields, $term));
    $query = $query->get($this->_table);
    return $this->_postProcessa($query->result());
  }
  
  protected function _exists($value, $field) {
    $query = $this->_queryGetBy($value, $field);
    return $query->num_rows() > 0;
  }
  
  protected function _existsArray($array) {
    $query = $this->_queryGetByArray($array);
    return $query->num_rows() > 0;
  }
  
  protected function _existsNotBy($value, $field, $notBy) {
    $query = $this->db->where($field, $value);
    if (!is_null($notBy)) $query = $query->where('id <>', $notBy);
    $query = $query->get($this->_table);
    return $query->num_rows() > 0;
  }
  
  protected function _queryGetBy($value, $field) {
    //return $this->_queryGetBy([$field => $value]);
    return $this->db
      ->where($field, $value)
      ->get($this->_table);
  }
  
  protected function _queryGetByArray($array) {
    return $this->db
      ->where($array)
      ->get($this->_table);
  }

  public function getById($id) {
    $query = $this->_queryGetBy($id, 'id');
    return $this->_postProcessa($query->row());
  }
  
  public function insert($entity) {
    return $this->db->insert($this->_table, $entity);
  }
  
  public function insert_batch($entities) {
    return $this->db->insert_batch($this->_table, $entities);
  }
  
  private function _insert_or_update($entity) {
    $coleqval = [];
    foreach ($entity as $key => $value) {
      $coleqval[] = $key.'=\''.$value.'\'';
    }
    
    return $this->db->insert_string($this->_table, $entity).' ON DUPLICATE KEY UPDATE '.implode(', ', $coleqval);
  }
  
  public function insert_or_update($entity) {
    $this->db->query($this->_insert_or_update($entity));
    
    return true;
    //return $this->db->affected_rows() == 1;
  }
  
  public function insert_or_update_batch($entities) {
    // Per si m'hi vull barallar alguna hora.
    // http://stackoverflow.com/questions/6346674/pdo-support-for-multiple-queries-pdo-mysql-pdo-mysqlnd
    $success = true;
    foreach ($entities as $entity) {
      $success = $success && $this->insert_or_update($entity);
    }
    return $success;
  }
  
  public function update($id, $entity) {
    return $this->db
      ->set($entity)
      ->where('id', $id)
      ->update($this->_table);
  }

  public function delete($value, $field = 'id') {
    return $this->db
        ->where($field, $value)
        ->delete($this->_table);
  }
  
  private $_cachedLastId = 0;
  public function lastId() {
    $last_id = $this->db->insert_id();
    if ($last_id === 0) {
      $last_id = $this->_cachedLastId;
    }
    else {
      $this->_cachedLastId = $last_id;
    }
    return $last_id;
  }
  
}