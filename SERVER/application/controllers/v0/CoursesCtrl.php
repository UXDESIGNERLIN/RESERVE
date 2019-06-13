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
            'body' => ['obligatoris' => ['name', 'description', 'reqInfo', 'type', 'contact', 'price', 'location']]
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
            'body' => ['obligatoris' => ['name', 'description', 'reqInfo', 'type', 'contact', 'price', 'location']]
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

  private function handleUpload () {
    // upload
    if (!isset($_FILES['upload']))
      $this->_fail('NO_UPLOAD', 400);
    
    if ($_FILES['upload']['error'] != 0)
      $this->_fail('UPLOAD_ERROR', 400);

    $fitxer = $_FILES['upload']['tmp_name'];

    if (!file_exists($fitxer))
      $this->_fail('UPLOAD_ERROR', 500);

    $_FILES['userfile'] = $_FILES['upload'];

    $config_upload['upload_path'] = './course_pictures/';
    $config_upload['allowed_types'] = 'gif|jpg|png';
    $config_upload['max_size'] = '512'; // 512KB
    $config_upload['min_width'] = '0';  $config_upload['max_width'] = '0';
    $config_upload['min_height'] = '0'; $config_upload['max_height'] = '0';
    $config_upload['encrypt_name'] = TRUE;
    $this->load->library('upload', $config_upload);

    if ($this->upload->do_upload() == FALSE) {
      $error = $this->upload->display_errors('', '');

      if ($error == $this->lang->line('upload_invalid_dimensions'))
        $this->_fail('FOTO_WRONG_DIMENSIONS', 400);

      if ($error == $this->lang->line('upload_invalid_filesize'))
        $this->_fail('FOTO_WRONG_SIZE', 400);

      if ($error == $this->lang->line('upload_invalid_filetype'))
        $this->_fail('FOTO_WRONG_FORMAT', 400);

      $this->_fail('CI_UPLOAD_ERROR', 500, $error);
    }

    $picture_name = $this->upload->data('file_name');

    return $picture_name;
  }

  protected function CREATE () {
    $this->load->model('v0/CourseTypesMdl');
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

    // Check type exists
    if (!$this->CourseTypesMdl->idExists($body['type']))
      $this->_fail('WRONG_TYPE', 400);

    // Upload the picture if needed
    $picture_name = null;
    if (isset($_FILES['upload']))
      $picture_name = $this->handleUpload();

    // put Course in DB
    $entity = $this->Model->entity(
      createUniqueId(), 
      $companyId, 
      $body['name'], 
      $body['description'], 
      $body['reqInfo'], 
      $body['type'], 
      $picture_name,
      $body['contact'],
      $body['location'],
      $body['price'],
      time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CourseCtrl::CREATE');

    $this->_success();
  }

  protected function UPDATE ($id) {
    $body = $this->body;
    $companyId = $this->sessio['companyId'];

    // Check course exists
    $course = $this->Model->getById($id);
    if (empty($course))
      $this->_fail('NOT_FOUND', 400);
      
    // check $id belongs to $companyId
    if ($course->companyId != $companyId)
      $this->_fail('NOT_ALLOWED', 403);

    $body['name'] = trim($body['name']);
    // Check name is not empty
    if (empty($body['name']))
      $this->_fail('COURSENAME_CANT_BE_EMPTY', 400);
    
    // Check name is not already used by the same company
    if ($this->Model->count($this->Model->entity(null, $companyId, $body['name'])) > 1)
     $this->_fail('COURSENAME_ALREADY_USED', 400);

    // Check reqInfo
    if (!is_array($body['reqInfo']) || !$this->Model->checkReqInfo($body['reqInfo']))
      $this->_fail('REQINFO_WRONG_FORMAT', 400);

    // Check reqInfo has email
    if (!in_array('email', $body['reqInfo'], true))
      $this->_fail('REQINFO_WRONG_FORMAT', 400);

    if ($body['type'] != $course->type)
      $this->_fail('CANT_CHANGE_TYPE');

    // Upload the picture if needed
    $picture_name = null;
    if (isset($_FILES['upload']))
      $picture_name = $this->handleUpload();

    // put Course in DB
    $entity = $this->Model->entity(
      null, 
      null, 
      $body['name'], 
      $body['description'], 
      $body['reqInfo'], 
      null, 
      $picture_name,
      $body['contact'],
      $body['location'],
      $body['price'],
      null);
    $success = $this->Model->update($id, $entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CourseCtrl::CREATE');

    if (isset($_FILES['upload']) && !empty($course->picuture))
      unlink('course_pictures/'.$course->picture);

    $this->_success();
  }

  protected function DELETE ($id) {
    // Check company is the owner of the course

    // Check classes use this course

  }
}
