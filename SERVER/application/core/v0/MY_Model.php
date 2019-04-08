<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Model extends CI_Model {

  public function __construct($table) {
    parent::__construct();
    $this->_table = $table;
  }
  
  protected function _getBy ($entity, $ignoreDeleted = true) {
    //return $this->db->where($entity);
    $query = $this->db->where($entity);
    if ($ignoreDeleted) {
      $query = $query->where('deleted', 0);
    }
    return $query;
  }

  protected function _getMany ($entity = [], $ignoreDeleted = true) {
    return $this->_getBy($entity, $ignoreDeleted)->get($this->_table)->result();
  }

  protected function _getSingle ($entity = [], $ignoreDeleted = true) {
    return $this->_getBy($entity, $ignoreDeleted)->get($this->_table)->row();
  }

  public function exists($entity = [], $ignoreDeleted = true) {
    return $this->count($entity, $ignoreDeleted) > 0;
  }

  public function existsNotBy($entity = [], $notBy, $ignoreDeleted = true) {
    if (!is_null($notBy)) $entity['id <>'] = $notBy;
    return $this->count($entity, $ignoreDeleted) > 0;
  }
  
  public function count($entity = [], $ignoreDeleted = true) {
    return $this->_getBy($entity, $ignoreDeleted)->get($this->_table)->num_rows();
  }

  public function insert($entity) {
    return $this->db->insert($this->_table, $entity);
  }
  
  protected function _update($entity, $newentity) {
    return $this->db->set($newentity)->where($entity)->update($this->_table);
  }

  public function update($id, $entity) {
    return $this->_update(['id' => $id], $entity);
  }

  public function delete($id) {
    return $this->update($id, ['deleted' => 1]);
  }

  protected function createUniqueId() {
    $ts = time();
    $pid = getmypid();
    $rand = random_bytes(6);

    return dechex($ts&0xFFFFFFFF).dechex($pid&0xFFFF).bin2hex($rand);
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

  //public function getAll($ignoreDeleted = true) {
  //  $query = $this->db;
  //  if ($ignoreDeleted) {
  //    $query = $query->where('deleted', 0);
  //  }
  //  return $this->_postProcessa($query->get($this->table)->result_array());
  //}
  
  /*
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
  */

  

  //public function getById($id, $ignoreDeleted = true) {
  //  $query = $this->db->where('id', $id);
  //  if ($ignoreDeleted) {
  //    $query = $query->where('deleted', 0);
  //  }
  //  return $this->_postProcessa($query->get($this->table)->row_array());
  //}
  
  /*
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
  */

  /*
  public function delete($value, $field = 'id') {
    return $this->db
        ->where($field, $value)
        ->delete($this->_table);
  }
  */
  
}