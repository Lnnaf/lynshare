export const getUrlPath = (pathname: string) => {
  return pathname.replace(/^\/|\/$/g, '').split('/');
}