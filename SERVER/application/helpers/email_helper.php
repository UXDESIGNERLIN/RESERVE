<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('sendMail')) {
  function sendMail($to, $subject, $html, $fromName, $from = 'noreply@myspotbook.com') {
    $CI =& get_instance();
    $CI->load->library('email');


    $placeholders = ['[%__TO__%]', '[%__CYEAR__%]'];
    $replacers = [$to, date("Y")];

    $html = str_replace($placeholders, $replacers, $html);
    

    $CI->email->from($from, $fromName);
    $CI->email->to($to);
    $CI->email->subject($subject);
    $CI->email->message($html);

    return $CI->email->send();
  }
}
