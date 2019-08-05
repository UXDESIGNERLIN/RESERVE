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
      /*
      'rollcall' => [
        'PUT' => [ // Store roll call data
          'fn' => 'UPSERT_ROLLCALL',
          'checks' => [
            'loggedIn' => true,
            'obligatori' => ['show', 'noshow']
          ]
        ]
      ],
      */
      'track' => [
        'GET' => [
          'fn' => 'TRACK_HISTORY',
          'checks' => [
            'loggedIn' => true,
          ]
        ]
      ]
    ];
  }

  protected function PENDING_ROLLCALLS () {
    $companyId = $this->sessio['companyId'];

    $this->load->model('v0/ClassesMdl');

    $this->_success($this->ClassesMdl->getPendingRollCall($companyId));
  }

  /*
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
      $this->_fail('NOT_ALLOWED', 403);

    // Check shows had reserve for class
    foreach ($shows as $show) {
      if (!$this->ReservesMdl->validReserve($show, $classId)) $this->_fail('INVALID_RESERVE', 400, $show);
    }

    // Check noshows had reserve for class
    foreach ($noshows as $noshow) {
      if (!$this->ReservesMdl->validReserve($noshow, $classId)) $this->_fail('INVALID_RESERVE', 400, $noshow);
    }

    // Check all reserves have 1 and only 1 show/noshow status.
    $_reserves = $this->ReservesMdl->getByParent($classId);
    foreach ($_reserves as $reserve) {
      $isShow = in_array($reserve->id, $shows);
      $isNoShow = in_array($reserves->id, $noshows);
      if (!($isShow ^ $isNoShow)) {
        $this->_fail('MISSING_RESERVES', 400);
      }
    }

    // Set reserve status accordingly
    $success = $this->ReservesMdl->rollcall($shows, $noshows);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'TrackingCtrl::UPSERT_ROLLCALL');

    $this->_success();
  }
  */

  protected function TRACK_HISTORY ($reserveId) {
    $this->load->model('v0/ReservesViewMdl');
    $companyId = $this->sessio['companyId'];

    // Get reserve
    $reserve = $this->ReservesViewMdl->getById($reserveId);

    // Check reserve exist
    if (empty($reserve))
      $this->_fail('NOT_FOUND', 400);

    // Check reserve is owned by user
    if ($reserve->companyId != $companyId)
      $this->_fail('NOT_ALLOWED', 403);

    // getUserReport with reserve email
    $userReport = $this->ReservesViewMdl->getUserReport($reserve->email, $companyId);

    $report = array_combine(
      array_map(function ($a) {
        return $a['status'];
      }, $userReport),
      array_map(function ($a) {
        return intval($a['count']);
      }, $userReport)
    );

    $report['pending'] = $report['pending'] ?? 0;
    $report['show'] = $report['show'] ?? 0;
    $report['noshow'] = $report['noshow'] ?? 0;

    // Do some magical statistic stuff (NOT FOR MVP)
    //$result = 50;
    //$total_reports = $report['pending'] + $report['show'] + $report['noshow'];
    //if ($total_reports == 0 || ($report['pending'] >= $total_reports/2)) return $result;
    //$result = $result - 20*($report['noshow']/$total_reports)
    
    $this->_success($report);
  }

}
