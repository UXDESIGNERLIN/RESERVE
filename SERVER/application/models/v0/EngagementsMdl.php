<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class EngagementsMdl extends MY_Model {
  public function __construct () {
    parent::__construct('engagements');
  }

  public function entity (
    $id = null, 
    $companyId = null, 
    $recipientId = null, 
    $type = null, 
    $body = null, 
    $future = null
  ) {
    $res = [];
    if (!is_null($id))          $res = array_merge($res, ['id' => $id]);
    if (!is_null($companyId))   $res = array_merge($res, ['companyId' => $companyId]);
    if (!is_null($recipientId)) $res = array_merge($res, ['recipientId' => $recipientId]);
    if (!is_null($type))        $res = array_merge($res, ['type' => $type]);
    if (!is_null($body))        $res = array_merge($res, ['body' => $body]);
    if (!is_null($future))      $res = array_merge($res, ['future' => $future]);
    return $res;
  }

  public function futurs($type, $recipientId) {
    return $this->db->where(['type' => $type, 'recipientId' => $recipientId])->get('engagements')->result();
  }

}