<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SupportMessagesMdl extends MY_Model {
  //use POSTPROCESS, MDL_GETBYID, MDL_GETALL, MDL_GETBYPARENT, MDL_DELETEBYPARENT;


  /*
  

  Tickets
    id
    topic
    closed


  SupportMessages
    ticketId
    name
    email
    subject
    text
    ts

  https://www.zoho.com/desk/?src=top-header&ireft=ServiceDesk%20Plus


  */

  public function __construct () {
    parent::__construct('supportMessages');
  }

  protected function postProcessa (&$result) {
    __remove__from__result($result, ['REMOTE_ADDR', 'HTTP_USER_AGENT', 'HTTP_ACCEPT_LANGUAGE', 'ts', 'deleted']);
  }

  public function entity (
    $idTicket = null, 
    $idCompany = null,
    $name = null,
    $email = null, 
    $subject = null, 
    $text = null,
    $remote_addr = null,
    $http_user_agent = null,
    $http_accept_language = null,
    $ts = null
  ) {
    $res = [];
    if (!is_null($id))             $res = array_merge($res, ['id' => $id]);
    if (!is_null($idClass))        $res = array_merge($res, ['idClass' => $idClass]);
    if (!is_null($email))          $res = array_merge($res, ['email' => $email]);
    if (!is_null($fname))          $res = array_merge($res, ['fname' => $fname]);
    if (!is_null($phone))          $res = array_merge($res, ['phone' => $phone]);
    if (!is_null($age))            $res = array_merge($res, ['age' => $age]);
    if (!is_null($gender))         $res = array_merge($res, ['gender' => $gender]);
    if (!is_null($remote_addr))           $res = array_merge($res, ['REMOTE_ADDR' => $remote_addr]);
    if (!is_null($http_user_agent))       $res = array_merge($res, ['HTTP_USER_AGENT' => $http_user_agent]);
    if (!is_null($http_accept_language))  $res = array_merge($res, ['HTTP_ACCEPT_LANGUAGE' => $http_accept_language]);
    if (!is_null($ts))             $res = array_merge($res, ['ts' => $ts]);
    return $res;
  }
}