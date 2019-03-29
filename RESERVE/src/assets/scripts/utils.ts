export function getUrlParam(p: number) {
  return window.location.pathname.split('/')[p+1];
}
