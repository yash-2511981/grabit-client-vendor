const HOST = import.meta.env.VITE_SERVER_URL;

const AUTH_ROUTES = `${HOST}/ots/vendor`;
export const SIGN_IN = `${AUTH_ROUTES}/sign-in`;
export const SIGN_UP = `${AUTH_ROUTES}/sign-up`;
export const SIGN_OUT = `${AUTH_ROUTES}/sign-out`;
export const GET_VENDOR_INFO = `${AUTH_ROUTES}/get-vendor-info`;
