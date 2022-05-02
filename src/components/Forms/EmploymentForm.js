import React from 'react';
import { v4 as uuid } from 'uuid';
import { useFormValidation } from '../../hooks';
import validateEmployment from './ValidateEmployment';
import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const formState = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  phone: '',
  sn: '',
};

const EmploymentInputs = {
  Personal: {
    FirstName: {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
    },
    LastName: {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
    },
    SN: {
      name: 'sn',
      label: 'Social Security Number',
      type: 'text',
      placeholder: 'Enter your social security number',
    },
    Phone: {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      placeholder: 'Enter your phone number',
    },
    Address: {
      name: 'addres',
      label: 'Address',
      type: 'text',
      placeholder: 'Enter your address',
    },
    City: {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter your city',
    },
    State: {
      name: 'state',
      label: 'State',
      type: 'text',
      placeholder: 'Enter your state',
    },
    Zipcode: {
      name: 'zipcode',
      label: 'Zip Code',
      type: 'text',
      placeholder: 'Enter your zip code',
    },
  },
};

const EmploymentForm = () => {
  const form = useFormValidation(formState, validateEmployment);
  return (
    <Container>
      <Form onSubmit={form.handleSubmit}>
        {}
        <FormBtn>
          <button type='submit'>Submit</button>
        </FormBtn>
      </Form>
    </Container>
  );
};

export default EmploymentForm;

const Container = styled.div``;

const Form = styled.form``;

const FormInputGroup = styled.div`
  & > label {
    color: ${colors.white[200]};
  }
  & > p {
    color: ${colors.white[200]};
  }
`;

const FormBtn = styled.div``;

function createInputsGroups(field, values, handleBlur, handleChange, errors) {
  console.log(field);
  return (
    <FormInputGroup>
      <label htmlFor={[field].name}>{field.label}</label>
      <input
        type={[field].type}
        id={field.name}
        name={field.name}
        value={values[field.name]}
        onBlur={(e) => handleBlur(e)}
        onChange={(e) => handleChange(e)}
      />
      <p>{errors[field.name]}</p>
    </FormInputGroup>
  );
}
