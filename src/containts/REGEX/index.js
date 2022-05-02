export const TEXT_REGEX = /^[A-z0-9]{1,24}$/;
export const EMAIL_REGEX = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
export const PHONE_REGEX = /^([0-9]{10}$)/;
export const MESSAGE_REGEX = /^[A-z0-9!@#$%&*()-_=+ '":;?{}[\]/\\.]{1,500}$/;

export const REGEX = {
  text: /^[A-z0-9]{1,24}$/,
  email: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
  phone: /^([0-9]{10}$)/,
  zipcode: /^([0-9]{5}$)/,
  textarea: /^[A-z0-9!@#$%&*()-_=+ '":;?{}[\]/\\.]{1,500}$/,
};
