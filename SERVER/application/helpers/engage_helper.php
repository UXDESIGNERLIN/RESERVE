<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('engageMail')) {

  // $recipients és un array de reserveView

  // $fromName és el nom de l'organitzador

  // $data és un array associatiu amb propietats
  //  'subject' => Subject del correu electrònic
  //  'body' => Body del correu electronic (a incloure dins el template)
  //  'template' => template

  function engageMail($recipients, $fromName, $data) {
    $CI =& get_instance();
    $CI->load->helper('email');

    $all_fine = true;
    $res = [];
    foreach ($recipients as $recipient) {
      $replacers = [
        '[%SPOTID%]' => $recipient->id,
        '[%ORGANIZER%]' => $fromName,
        '[%NAME_OR_EMAIL%]' => is_null($recipient->fname) ? $recipient->email : $recipient->fname,

        '[%CLASS_ID%]' => $recipient->classId,
        '[%ACTIVITY_NAME%]' => $recipient->courseName,
        '[%ACTIVITY_TIMESTART%]' => date('l M jS \at H:i', $recipient->tsIni),
        
        '[%MSG_BODY%]' => $data['body'],
      ];

      $_res = sendMail($recipient->email, $data['subject'], $CI->load->view('emails/'.$data['template'], '', TRUE), $replacers, $fromName);
      
      if (!$_res) 
        $all_fine = false;

      $res[] = $_res;
    }

    return ($all_fine) ? true : $res;
  }
}
