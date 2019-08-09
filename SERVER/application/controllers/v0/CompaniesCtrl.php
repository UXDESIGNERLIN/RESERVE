<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CompaniesCtrl extends MY_Controller {
  use POSTPROCESS;
  use CTRL_GETBYID;

  public function __construct () {
    parent::__construct('v0/CompaniesMdl');

    $this->API = [
      'generic' => [
        'GET' => [
          'fn' => 'GETME',
          'checks' => [
            'loggedIn' => null,
          ]
        ],
        'POST' => [
          'fn' => 'CREATE', 
          'checks' => [
            'notLoggedIn' => null,
            'body' => ['obligatoris' => ['email', 'name', 'password']]
          ]
        ],
        'PUT' => [
          'fn' => 'UPDATE',
          'checks' => [
            'loggedIn' => null,
            'body' => [
              'obligatoris' => [ 'email', 'name', 'password' ],
              'opcionals' => [ 'new_password' => null ]
            ]
          ]
        ]
      ],
      /*
      'id' => [
        'GET' => [
          'fn' => 'GETBYID'
        ],
      ],
      */
      'verify' => [
        'PUT' => [
          'fn' => 'VERIFY',
          'checks' => [
            'notLoggedIn' => null,
            'body' => [
              'obligatoris' => ['challenge', 'email']
            ]
          ]
        ]
      ],
      'recover' => [
        'POST' => [
          'fn' => 'RECOVER',
          'checks' => [
            'notLoggedIn' => null,
            'body' => [
              'obligatoris' => ['email']
            ]
          ]
        ],
        'PUT' => [
          'fn' => 'RESSET_PASSWORD',
          'checks' => [
            'notLoggedIn' => null,
            'body' => [
              'obligatoris' => ['challenge', 'email', 'password']
            ]
          ]
        ]
      ]
    ];

    $this->load->helper('validacio');
  }

  protected function GETME () {
    return $this->GETBYID($this->sessio['companyId']);
  }

  protected function CREATE () {
    $body = $this->body;

    $body['email'] = trim($body['email']);
    $body['name'] = trim($body['name']);

    // Validate email
    if (!validEmail($body['email'])) {
      $this->_fail('EMAIL_WRONG_FORMAT', 400);
    }

    // Check email is unique
    if ($this->Model->usedEmail($body['email'])) {
      $this->_fail('EMAIL_IN_USE', 200);
    }

    // Generate challenge
    $challenge = bin2hex(random_bytes(8));

    // put Company in DB
    $entity = $this->Model->entity(createUniqueId(), $body['email'], $body['password'], $body['name'], $challenge, null, time());
    $success = $this->Model->insert($entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CompanyCtrl::CREATE');

    // Send e-mail
    $this->load->helper('email');
    $success = sendMail($body['email'], 'Activate your account', 'The code for activating your account is '.$challenge, 'no reply');

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CompanyCtrl::CREATE');

    $this->_success();
  }

  protected function UPDATE () {
    $body = $this->body;
    $companyId = $this->sessio['companyId'];

    $body['email'] = trim($body['email']);
    $body['name'] = trim($body['name']);

    $body['new_password'] = empty($body['new_password']) ? null : $body['new_password'];

    // Validate email
    if (!validEmail($body['email'])) {
      $this->_fail('EMAIL_WRONG_FORMAT', 400);
    }

    // Check email is unique besides for our company
    if ($this->Model->usedEmail($body['email'], $companyId)) {
      $this->_fail('EMAIL_IN_USE', 200);
    }

    // Check password is correct
    if (!$this->Model->confirmPassword($companyId, $body['password'])) {
      $this->_fail('INCORRECT_PASSWORD', 200);
    }

    $entity = $this->Model->entity(null, $body['email'], $body['new_password'], $body['name'], null, null, null);
    $success = $this->Model->update($companyId, $entity);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CompanyCtrl::UPDATE');

    $this->_success();
  }

  protected function VERIFY () {
    $body = $this->body;

    $challengeOutcome = $this->Model->checkChallenge($body['email'], $body['challenge'], false);

    if (!$challengeOutcome['success']) $this->_fail($challengeOutcome['reason'], 200); // NOT_FOUND / NOT_ACTIVE / INCORRECT_CHALLENGE / CHALLENGE_EXPIRED

    //if (!$this->Model->checkChallenge($body['email'], $body['challenge'], false))
    //  $this->_fail('INCORRECT_CHALLENGE', 200);

    $success = $this->Model->activate($body['email']);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CompaniesCtrl::VERIFY');

    $this->_success();
  }

  protected function RECOVER () {
    $body = $this->body;

    if (!$this->Model->checkActive($body['email'])) $this->_fail('NOT_ACTIVE', 200);
    
    // Create challenge
    $challenge = bin2hex(random_bytes(8));
    $challengeSet = $this->Model->setChallenge($body['email'], $challenge, time()+3600);

    if (!$challengeSet) return $this->_fail('UNHANDLED_ERROR', 500, 'CompaniesCtrl::RECOVER');

    // Send challenge
    $this->load->helper('email');
    $success = sendMail($body['email'], 'Resset your password', 'The code for resseting your password is '.$challenge, 'no reply');

    $this->_success();
  }

  protected function RESSET_PASSWORD () {
    $body = $this->body;

    $challengeOutcome = $this->Model->checkChallenge($body['email'], $body['challenge'], true);

    if (!$challengeOutcome['success']) $this->_fail($challengeOutcome['reason'], 200);

    $success = $this->Model->changePassword($body['email'], $body['password']);

    if (!$success)
      $this->_fail('UNHANDLED_ERROR', 500, 'CompaniesCtrl::RESSET_PASSWORD');

    $this->_success();
  }
}
