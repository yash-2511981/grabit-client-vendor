const HOST = import.meta.env.VITE_SERVER_URL;

const AUTH_ROUTES = `${HOST}/ots/vendor`;
//auth request
export const SIGN_IN = `${AUTH_ROUTES}/sign-in`;
export const SIGN_UP = `${AUTH_ROUTES}/sign-up`;
export const SIGN_OUT = `${AUTH_ROUTES}/sign-out`;
export const UPDATE_PASSWORD = `${AUTH_ROUTES}/update-password`;

//fetching vendor related info
export const GET_VENDOR_INFO = `${AUTH_ROUTES}/get-vendor-info`;
export const GET_ALL_PRODUCTS = `${AUTH_ROUTES}/get-all-products`;
export const GET_ORIGINAL_BANK_DETAILS = `${AUTH_ROUTES}/get-original-bank-details`;
export const GET_BANK_DETAILS = `${AUTH_ROUTES}/get-bank-details`;

//uploading and updating products
export const GET_PRODUCT_IMG_UPLOAD_URL = `${AUTH_ROUTES}/get-upload-url-product`;
export const GET_UPDATE_PRODUCT_IMG_UPLOAD_URL = `${AUTH_ROUTES}/get-upload-url-to-update-product`;
export const ADD_PRODUCT = `${AUTH_ROUTES}/add-product`;
export const UPDATE_PRODUCT = `${AUTH_ROUTES}/update-product`;
export const DELETE_PRODUCT = `${AUTH_ROUTES}/delete-product`;

//updating restaurant data
export const UPDATE_STATUS = `${AUTH_ROUTES}/update-restaurant-status`;
export const UPDATE_PERSONAL_DETAILS = `${AUTH_ROUTES}/update-restaurant-details`;

//uploading and updating restaurant image
export const ADD_RESTAURANT_IMAGE = `${AUTH_ROUTES}/get-upload-url-restaurnat-img`;
export const SAVE_RESTAURANT_IMG = `${AUTH_ROUTES}/save-restaurant-img`;

//adding and updating bank details
export const ADD_BANK_DETAILS = `${AUTH_ROUTES}/add-bank-details`;

//document upload end points
export const GET_URL_FOR_PRIVATE_DOC = `${AUTH_ROUTES}/get-upload-url-vendor-doc`;

export const UPLOAD_FOOD_LICENSE = `${AUTH_ROUTES}/upload-food-license`;
export const UPLOAD_AADHAR = `${AUTH_ROUTES}/upload-aadhar-card`;
export const UPLOAD_PAN = `${AUTH_ROUTES}/upload-pan-card`;

//get signed url for private docs

export const GET_VENDOR_DOC = `${AUTH_ROUTES}/get-vendor-docs`;
export const GET_VIEW_URL = `${AUTH_ROUTES}/get-doc-access`;

//account settings
export const UPDATE_PERMISSIONS = `${AUTH_ROUTES}/update-permission`;
