<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TestCtrl extends MY_Controller {
  public function __construct () {
    parent::__construct();

    $this->API = [
      'generic' => [
        'GET' => [
          'fn' => 'TEST_COMPANY_STATS', 
        ],
      ],
    ];
  }

  protected function TEST_COMPANY_STATS ($companyId) {
    $this->load->model('v0/ReservesViewMdl');

    $companyLangs = array_map(function ($v) { return $v->HTTP_ACCEPT_LANGUAGE; }, $this->ReservesViewMdl->languagesByCompany($companyId));
    
    $companyLangs = preg_grep ("/^(?:[a-z\-]+(?:;q=(?:0.[0-9]|1|1\.0))?(?:,|$))+/mi", $companyLangs);

    function t ($in) {
      $languages = [];
      $langFields = explode(',', $in);
      $qTotal = 0;
      foreach ($langFields as $langField) {
        $fields = explode(';', $langField);
        $l = explode('-', $fields[0])[0];
        $q = floatval(explode('=', $fields[1] ?? 'q=1.0')[1]);
        if (!array_key_exists($l, $languages)) $languages[$l] = 0;
        $languages[$l] += $q;
        $qTotal += $q;
      }
      foreach ($languages as $lang => &$q) {
        $q = $q/$qTotal;
      }

      return $languages;
    }

    $languages = array_reduce($companyLangs, function ($p, $c) {
      $userLanguages = t($c);
      foreach ($userLanguages as $l => $q) {
        if (!array_key_exists($l, $p)) $p[$l] = 0;
        $p[$l] += $q;
      }
      return $p;
    }, []);

    $entries = count($companyLangs);

    foreach ($languages as $lang => &$q) {
      $q = $q/$entries;
    }

    var_dump($languages);
    /*
    $this->load->model('v0/CoursesMdl');
    $this->load->model('v0/ClassesViewMdl');
    $this->load->model('v0/ReservesViewMdl');

    $languages = array_reduce($this->ReservesViewMdl->languagesByCompany($companyId), function ($p, $c) {

    }, []);

    $this->_success([
      'numCourses' => $this->CoursesMdl->count(['idCompany' => $companyId], false), 
      'numClasses' => $this->ClassesViewMdl->countByCompany($companyId), 
      'languages' => $languages,
      // % committment
      'numUsers' => $this->ReservesViewMdl->companyUniqueUsers($companyId), 
      'numRepeaters' => $this->ReservesViewMdl->numUsersWhoRepeatCompany($companyId)
    ]);
    */
  }

  protected function TEST_MAIL2 () {
    $this->load->helper('email');

    sendMail('ignasimg@gmail.com', '<3', 'test works best', 'no reply');
  }

  protected function TEST_MAIL ($domain = 'myspotbook') {
    $this->load->library('email');

    $this->email->from('test@'.$domain.'.com', 'Test 2');
    $this->email->to('ignasimg@gmail.com');
    $this->email->subject('Test email subject 2');
    $this->email->message('Test email message text 2');

    var_dump($this->email->send());

    //$this->_success();
  }

  protected function TEST_USED_EMAIL () {
    $this->load->model('v0/CompaniesMdl', 'Model');

    var_dump($this->Model->usedEmail('ling@gmail.com', 1)); // Should be false
    var_dump($this->Model->usedEmail('ling@gmail.com', 2)); // Should be true
    var_dump($this->Model->usedEmail('ignasi@ausva04.com', 2)); // Should be false
    var_dump($this->Model->usedEmail('test@test.test', 1)); // Should be false
    var_dump($this->Model->usedEmail('aquest email no és a la DB', 5)); // Should be false
    var_dump($this->Model->usedEmail('test@test.test')); // Should be false
    var_dump($this->Model->usedEmail('ignasi@ausva04.com')); // Should be true
    
  }

  protected function TEST_AVAIL_CLASSES ($cid) {
    $this->load->model('v0/ClassesMdl', 'Model');

    $this->_success($this->Model->getAvailable($cid));
  }
}
