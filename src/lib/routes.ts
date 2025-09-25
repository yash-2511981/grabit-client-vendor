const HOST = import.meta.env.VITE_SERVER_URL;

const AUTH_ROUTES = `${HOST}/ots/vendor`;
export const SIGN_IN = `${AUTH_ROUTES}/sign-in`;
export const SIGN_UP = `${AUTH_ROUTES}/sign-up`;
export const SIGN_OUT = `${AUTH_ROUTES}/sign-out`;
export const GET_VENDOR_INFO = `${AUTH_ROUTES}/get-vendor-info`;
export const GET_ALL_PRODUCTS = `${AUTH_ROUTES}/get-all-products`;

//upload routes
export const ADD_PRODUCT = `${AUTH_ROUTES}/add-product`;
export const UPDATE_PRODUCT = `${AUTH_ROUTES}/update-product`;
export const DELETE_PRODUCT = `${AUTH_ROUTES}/delete-product`;
export const UPDATE_STATUS = `${AUTH_ROUTES}/update-restaurant-status`;
export const UPDATE_PERSONAL_DETAILS = `${AUTH_ROUTES}/update-restaurant-details`;
export const ADD_RESTAURANT_IMAGE = `${AUTH_ROUTES}/add-restaurant-image`;
