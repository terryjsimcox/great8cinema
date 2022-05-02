import { REGEX } from '../../containts/REGEX';

export default function validateEmployment(values) {
  let errors = {};
  console.log(values);
  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required.';
  } else if (!REGEX.text.test(values.firstName)) {
    errors.firstName = 'First name must be 1 to 24 characters long.';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  } else if (!REGEX.text.test(values.lastName)) {
    errors.lastName = 'Last name must be 1 to 24 characters long.';
  }
  if (!values.sn.trim()) {
    errors.sn = 'Social Sercurty number is required.';
  }

  // if (!REGEX.text.test(values.lastName)) {
  //   errors.lastName = 'Last name must be 1 to 24 characters long.';
  // }

  if (!values.address.trim()) {
    errors.address = 'Address is required.';
  }

  if (!values.city.trim()) {
    errors.city = 'City is required.';
  }

  if (!values.state.trim()) {
    errors.state = 'State is required.';
  }

  if (!values.zipcode.trim()) {
    errors.zipcode = 'Zip Code is required.';
  } else if (!REGEX.zipcode.test(values.zipcode)) {
    errors.zipcode = 'Zip Code need to be 5 digit in length.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!REGEX.phone.test(values.phone)) {
    errors.phone = 'Phone number need to be 10 digits in length.';
  }

  return errors;
}
