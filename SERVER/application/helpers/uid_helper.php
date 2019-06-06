<?php 

defined('BASEPATH') OR exit('No direct script access allowed');

if (!function_exists('_makeMask')) {
  function _makeMask($seed, $ts) {
    $rand_array = unpack("N2", $seed); // 2 valors: 32 bit unsigned big endian.
    $rand_top = $rand_array[1];
    $rand_bottom = $rand_array[2];
    
    $shift = $ts & 0b111111;
    $local_shift = ($shift >= 32) ? $shift - 32 : $shift;
    $mask_top = ($rand_top >> $local_shift) | ($rand_bottom << (32 - $local_shift)) & 0xFFFFFFFF;
    $mask_bottom = ($rand_bottom >> $local_shift) | ($rand_top << (32 - $local_shift)) & 0xFFFFFFFF;
    return ['top' => $mask_top, 'bottom' => $mask_bottom];
  } 
}

if (!function_exists('createUniqueId')) {
  function createUniqueId($ip = null) {
    if ($ip == null) $ip = $_SERVER['REMOTE_ADDR'];
    $ts = time()&0xFFFFFFFF;
    $ip = ip2long($ip)&0xFFFFFFFF;
    $rand = random_bytes(8);

    $mask = _makeMask($rand, $ts);

    return strtoupper(
      str_pad(dechex($ts), 8, '0', STR_PAD_LEFT).
      str_pad(dechex($ip^$mask['top']^$mask['bottom']), 8, '0', STR_PAD_LEFT).
      str_pad(bin2hex($rand), 16, '0', STR_PAD_LEFT)
    );
  }
}

if (!function_exists('getIdInfo')) {
  function getIdInfo($id) {
    $ts = hexdec(substr($id, 0, 8));
    $ip = substr($id, 8, 8);
    $rand = hex2bin(substr($id, 16, 16));

    $mask = _makeMask($rand, $ts);

    return [
      'ts' => $ts,
      'ip' => long2ip(hexdec($ip)^$mask['top']^$mask['bottom'])
    ];
  }
}