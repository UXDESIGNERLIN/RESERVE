<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TrackingCtrl extends MY_Controller {
  use POSTPROCESS;
  use CTRL_GETBYID;

  public function __construct () {
    parent::__construct();

    $this->API = [
      'pendingRollcall' => [
        'GET' => [ // Get list of classes pending roll call
          'fn' => 'PENDING_ROLLCALLS',
          'checks' => [
            'loggedIn' => true,
          ]
        ],
      ],
      'rollcall' => [
        'PUT' => [ // Store roll call data
          'fn' => 'UPSERT_ROLLCALL',
          'checks' => [
            'loggedIn' => true,
            'obligatori' => ['show', 'noshow']
          ]
        ]
      ],
    ];
  }

  protected function PENDING_ROLLCALLS () {
    $companyId = $this->sessio['companyId'];

    $this->load->model('v0/ClassesMdl');

    $this->_success($this->ClassesMdl->getPendingRollCall($companyId));
  }

  protected function UPSERT_ROLLCALL ($classId) {
    $this->load->model('v0/ClassesViewMdl');
    $this->load->model('v0/ReservesMdl');
    $companyId = $this->sessio['companyId'];
    $shows = $body['show'];
    $noshows = $body['noshow'];

    // Check class exists
    $class = $this->ClassesViewMdl->getById($classId);
    if (empty($class))
      $this->_fail('NOT_FOUND', 400);

    // Check class belongs to company
    if ($class->companyId != $companyId)
      $this->_fail('COURSE_NOT_YOURS', 400);

    // Check shows had reserve for class
    foreach ($shows as $show) {
      if (!$this->ReservesMdl->validReserve($show, $classId)) $this->_fail('INVALID_RESERVE', 400, $show);
    }

    // Check noshows had reserve for class
    foreach ($noshows as $noshow) {
      if (!$this->ReservesMdl->validReserve($noshow, $classId)) $this->_fail('INVALID_RESERVE', 400, $noshow);
    }

    // Set reserve status accordingly
  }
}
