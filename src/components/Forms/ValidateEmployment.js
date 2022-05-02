import { REGEX } from '../../containts/REGEX';

export default function validateEmployment(values) {
  let errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = 'First Name is required.';
    return errors;
  }
  if (REGEX.text.test(values.firstName)) {
    errors.firstName = 'First Name must be 1 to 24 characters long.';
    return errors;
  }

  if (!values.lastName.trim()) {
    errors.firstName = 'First Name is required.';
    return errors;
  }

  if (REGEX.text.test(values.lastName)) {
    errors.lastName = 'Last Name must be 1 to 24 characters long.';
    return errors;
  }

  if (!values.address.trim()) {
    errors.address = 'Address is required.';
    return errors;
  }

  if (!values.city.trim()) {
    errors.city = 'City is required.';
    return errors;
  }

  if (!values.state.trim()) {
    errors.state = 'State is required.';
    return errors;
  }

  if (!values.zipcode.trim()) {
    errors.zipcode = 'Zip Code is required.';
    return errors;
  }
  if (REGEX.zipcode.test(values.zipcode)) {
    errors.zipcode = 'Zip Code need to be 5 digit in length.';
    return errors;
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
    return errors;
  }
  if (REGEX.phone.test(values.phone)) {
    errors.phone = 'Phone number need to be 10 digits in length.';
    return errors;
  }

  return errors;
}
