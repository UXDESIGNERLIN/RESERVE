<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SupportCtrl extends MY_Controller {
  public function __construct () {
    parent::__construct('v0/SupportMdl');

    $this->API = [
      'generic' => [
        'GET' => [
          'fn' => 'TEST',
        ],
        'POST' => [
          'fn' => 'CREATE', 
        ],
      ],
    ];
  }

  protected function TEST () {
    $a = [];
    var_dump($a['test'] ?? null);
  }

  protected function CREATE () {
    $body = $this->body;
    $topic = $body['topic'];
    $name = $body['name'] ?? null;
    $email = $body['email'] ?? null;
    $cid = $this->sessio['companyId'] ?? null; // Might be null
    $subject = trim($body['subject']);
    $text = trim($body['text']);

    if ($cid == null && $email == null)
      $this->_fail('LOST_CONNECTION', 400);

    $topics = ['FR', 'BUG', 'PAR', 'BIL', 'ENT', 'PRI', 'O'];
    if (!in_array($topic, $topics, true))
      $this->_fail('UNHANDLED_ERROR', 400);

    if (empty($subject))
      $this->_fail('EMPTY_SUBJECT', 400);

    if (empty($text))
      $this->_fail('EMPTY_TEXT', 400);

    $entity =

    
  }
}
