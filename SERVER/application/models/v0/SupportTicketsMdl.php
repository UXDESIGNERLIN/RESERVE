<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SupportTicketsMdl extends MY_Model {
  //use POSTPROCESS, MDL_GETBYID, MDL_GETALL, MDL_GETBYPARENT, MDL_DELETEBYPARENT;


  /*
  

  Tickets
    id
    topic
    closed

  https://www.zoho.com/desk/?src=top-header&ireft=ServiceDesk%20Plus


  */

  public function __construct () {
    parent::__construct('supportTickets');
  }

  protected function postProcessa (&$result) {
    __remove__from__result($result, ['REMOTE_ADDR', 'HTTP_USER_AGENT', 'HTTP_ACCEPT_LANGUAGE', 'ts', 'deleted']);
  }

  public function entity (
    $id = null, 
    $topic = null, 
    $closed = null, 
    $tsClose = null
  ) {
    $res = [];
    if (!is_null($id))             $res = array_merge($res, ['id' => $id]);
    if (!is_null($topic))          $res = array_merge($res, ['topic' => $topic]);
    if (!is_null($closed))         $res = array_merge($res, ['closed' => $closed]);
    if (!is_null($tsClose))        $res = array_merge($res, ['tsClosed' => $tsClosed]);
    return $res;
  }
}