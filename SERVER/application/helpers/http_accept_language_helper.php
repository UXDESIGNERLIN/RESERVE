<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('HAL')) {
  function HAL($http_accept_language) {
    $languages = [];
    $langFields = explode(',', $http_accept_language);
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
}

if (!function_exists('HAL_Array')) {
  function HAL_Array($http_accept_languages) {
    $http_accept_languages = preg_grep ("/^(?:[a-z\-]+(?:;q=(?:0.[0-9]|1|1\.0))?(?:,|$))+/mi", $http_accept_languages);

    $languages = array_reduce($http_accept_languages, function ($p, $c) {
      $userLanguages = HAL($c);
      foreach ($userLanguages as $l => $q) {
        if (!array_key_exists($l, $p)) $p[$l] = 0;
        $p[$l] += $q;
      }
      return $p;
    }, []);

    $entries = count($http_accept_languages);

    foreach ($languages as $lang => &$q) {
      $q = $q/$entries;
    }
    return $languages;
  }
}
