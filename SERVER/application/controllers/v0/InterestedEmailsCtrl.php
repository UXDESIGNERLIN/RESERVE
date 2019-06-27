<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InterestedEmailsCtrl extends MY_Controller {

  public function __construct () {
    parent::__construct('v0/InterestedEmailsMdl');

    $this->API = [
      'generic' => [
        'POST' => [
          'fn' => 'CREATE', 
          //'checks' => [
          //  'body' => ['obligatoris' => ['name', 'description', 'reqInfo']]
          //]
        ],
      ],
    ];
  }

  protected function CREATE () {
    $body = $this->body;

    $entity = $this->Model->entity(createUniqueId(), $body['email'], $_SERVER['HTTP_USER_AGENT'], $_SERVER['HTTP_ACCEPT_LANGUAGE']);
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500);

    $this->_success();
  }

}
