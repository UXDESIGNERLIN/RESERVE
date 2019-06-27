<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InterestedEmailsMdl extends MY_Model {

  public function __construct () {
    parent::__construct('interestedEmails');
  }

  public function entity (
    $id = null, 
    $email = null, 
    $http_user_agent = null,
    $http_accept_language = null
  ) {
    $res = [];
    if (!is_null($id))                    $res = array_merge($res, ['id' => $id]);
    if (!is_null($email))                 $res = array_merge($res, ['email' => $email]);
    if (!is_null($http_user_agent))       $res = array_merge($res, ['HTTP_USER_AGENT' => $http_user_agent]);
    if (!is_null($http_accept_language))  $res = array_merge($res, ['HTTP_ACCEPT_LANGUAGE' => $http_accept_language]);
    return $res;
  }

}