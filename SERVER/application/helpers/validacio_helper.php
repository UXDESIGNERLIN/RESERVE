<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// CHECK :: https://github.com/giggsey/libphonenumber-for-php

if (!function_exists('validEmail')) {
  function validEmail($email) {
    // NOTA: Aquesta expressió regular funcionarà en la majoria de casos, però no és 100% correcta.
    // return preg_match('/^(?:[a-zA-Z0-9\_\-]+\.?)+@(?:[a-zA-Z0-9]+\.)+[a-zA-Z]{2,4}$/i', $email);
    // Per una versió 100% correcta
    return filter_var($email, FILTER_VALIDATE_EMAIL);
    // La raó de no fer servir la versió 100% correcta és que si volem fer la mateixa validació en javascript haurem d'implementar el regexp de FILTER_VALIDATE_EMAIL en javascript.
    // El regexp de FILTER_VALIDATE_EMAIL està a: http://svn.php.net/viewvc/php/php-src/branches/PHP_5_3/ext/filter/logical_filters.c?r1=297250&r2=297350&pathrev=303779
    // O per l'ultima versió... a saber si fa el mateix: https://github.com/php/php-src/blob/master/ext/filter/logical_filters.c
  }
}

if (!function_exists('validPhone')) {
  function validPhone($phone, $country = 'ES') {
    $phoneUtil = \libphonenumber\PhoneNumberUtil::getInstance();
    try {
        $NumberProto = $phoneUtil->parse($phone, $country);
        return $phoneUtil->isValidNumber($NumberProto);
    } catch (\libphonenumber\NumberParseException $e) {
        return false;
    }
  }
}

if (!function_exists('phoneNumberToE164')) {
  function phoneNumberToE164 ($phone, $country = 'ES') {
    $phoneUtil = \libphonenumber\PhoneNumberUtil::getInstance();
    try {
        $NumberProto = $phoneUtil->parse($phone, $country);
        return $phoneUtil->format($NumberProto, \libphonenumber\PhoneNumberFormat::E164);
    } catch (\libphonenumber\NumberParseException $e) {
        return null;
    }
  }
}

if (!function_exists('phoneNumberToNational')) {
  function phoneNumberToNational ($phone, $country = 'ES') {
    $phoneUtil = \libphonenumber\PhoneNumberUtil::getInstance();
    try {
        $NumberProto = $phoneUtil->parse($phone, $country);
        return $phoneUtil->format($NumberProto, \libphonenumber\PhoneNumberFormat::NATIONAL);
    } catch (\libphonenumber\NumberParseException $e) {
        return null;
    }
  }
}
if (!function_exists('phoneNumberToMSISDN')) {
  function phoneNumberToMSISDN ($phone, $country = 'ES') {
    return substr(phoneNumberToE164($phone, $country), 1);
  }
}