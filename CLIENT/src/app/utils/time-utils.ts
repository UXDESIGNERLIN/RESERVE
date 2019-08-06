// All the functions use seconds

export function localTS2UTCTS (localTS: number) {
  let local_ts_ms = localTS*1000;
  let offset_in_ms = (new Date(local_ts_ms)).getTimezoneOffset()*60*1000;

  let utc_ts_ms = +(new Date(local_ts_ms)) + offset_in_ms;
  return (utc_ts_ms/1000)|0;
}

export function UTCTS2localTS (UTCTS: number) {
  let utc_ts_ms = UTCTS*1000;
  let offset_in_ms = (new Date(utc_ts_ms)).getTimezoneOffset()*60*1000;

  let local_ts_ms = +(new Date(utc_ts_ms)) - offset_in_ms;
  return (local_ts_ms/1000)|0;
}

export function getUTCTS () {
  let UTC_ts_ms = +(new Date());
  return (UTC_ts_ms/1000)|0;
}

export function getLocalTS () {
  let UTC_ts_ms = +(new Date());
  return UTCTS2localTS((UTC_ts_ms/1000)|0);
}