<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CoursesCtrl extends MY_Controller {
  use POSTPROCESS;
  use CTRL_GETBYID;
  use CTRL_GETBYPARENT;

  public function __construct () {
    parent::__construct('v0/CoursesMdl');

    $this->API = [
      'generic' => [
        'POST' => [
          'fn' => 'CREATE', 
          'checks' => [
            'loggedIn' => null,
            'body' => ['obligatoris' => ['name', 'description', 'reqInfo']]
          ]
        ],
      ],
      'id' => [
        'GET' => [
          'fn' => 'GETBYID'
        ],
        'PUT' => [
          'fn' => 'UPDATE',
          'checks' => [
            'loggedIn' => null,
            'body' => ['obligatoris' => ['name', 'description', 'reqInfo']]
          ]
        ],
        'DELETE' => [
          'fn' => 'DELETE',
          'checks' => [
            'loggedIn' => null,
            'query' => [
              'opcionals' => ['sideEffects' => false]
            ]
          ]
        ]
      ],
      'byCompany' => [
        'GET' => [
          'fn' => 'GETBYPARENT'
        ],
      ],
    ];

  }

  protected function CREATE () {
    $body = $this->body;
    $companyId = $this->sessio['companyId'];

    $body['name'] = trim($body['name']);

    // Check name is not empty
    if (empty($body['name']))
      $this->_fail('COURSENAME_CANT_BE_EMPTY', 400);
    
    // Check name is not already used by the same company
    if ($this->Model->nameInUse($body['name'], $companyId))
      $this->_fail('COURSENAME_ALREADY_USED', 400);

    // Check description

    // Check reqInfo
    if (!is_array($body['reqInfo']) || !$this->Model->checkReqInfo($body['reqInfo']))
      $this->_fail('REQINFO_WRONG_FORMAT', 400);

    // Check reqInfo has email
    if (!in_array('email', $body['reqInfo'], true))
      $this->_fail('REQINFO_WRONG_FORMAT', 400);

    // put Course in DB
    $entity = $this->Model->entity(null, $companyId, $body['name'], $body['description'], $body['reqInfo'], time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CourseCtrl::CREATE');

    $this->_success();
  }

  protected function UPDATE ($id) {
    $body = $this->body;
    $companyId = $this->sessio['companyId'];

    $body['name'] = trim($body['name']);

    // check $id belongs to $companyId

    // Check name is not empty
    if (empty($body['name']))
      $this->_fail('COURSENAME_CANT_BE_EMPTY', 400);
    
    // Check name is not already used by the same company
    //if ($this->Model->nameInUse($body['name'], $companyId))
    //  $this->_fail('COURSENAME_ALREADY_USED', 400);

    // Check description

    // Check reqInfo
    if (!is_array($body['reqInfo']) || !$this->Model->checkReqInfo($body['reqInfo']))
      $this->_fail('REQINFO_WRONG_FORMAT', 400);

    // Check reqInfo has email
    if (!in_array('email', $body['reqInfo'], true))
      $this->_fail('REQINFO_WRONG_FORMAT', 400);

    // put Course in DB
    $entity = $this->Model->entity(null, null, $body['name'], $body['description'], $body['reqInfo'], null);
    $success = $this->Model->update($id, $entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CourseCtrl::CREATE');

    $this->_success();
  }

  protected function DELETE ($id) {
    // Check company is the owner of the course

    // Check classes use this course

  }
}
