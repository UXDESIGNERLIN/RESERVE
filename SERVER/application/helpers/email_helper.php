<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('sendMail')) {
  function sendMail($to, $subject, $html, $substitutions = [], $fromName = 'no-reply', $from = 'noreply@myspotbook.com') {
    $CI =& get_instance();
    $CI->load->library('email');


    $placeholders = array_merge(array_keys($substitutions), ['[%__TO__%]', '[%__CYEAR__%]']);
    $replacers = array_merge(array_values($substitutions), [$to, date("Y")]);

    $subject = str_replace($placeholders, $replacers, $subject);
    $html = str_replace($placeholders, $replacers, $html);


    $CI->email->from($from, $fromName);
    $CI->email->to($to);
    $CI->email->subject($subject);
    $CI->email->message($html);

    return $CI->email->send();
  }
}
