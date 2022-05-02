import React from 'react';
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
  Personal: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
    },
    {
      name: 'sn',
      label: 'Social Security Number',
      type: 'text',
      placeholder: 'Enter your social security number',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      placeholder: 'Enter your phone number',
    },
    {
      name: 'addres',
      label: 'Address',
      type: 'text',
      placeholder: 'Enter your address',
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter your city',
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
      placeholder: 'Enter your state',
    },
    {
      name: 'zipcode',
      label: 'Zip Code',
      type: 'text',
      placeholder: 'Enter your zip code',
    },
  ],
};

const EmploymentForm = () => {
  const form = useFormValidation(formState, validateEmployment);
  return (
    <Container>
      <Form onSubmit={form.handleSubmit}>
        {EmploymentInputs.Personal.map((fields) => {
          return (
            <FormInputGroup>
              <label htmlFor={fields.name}>{fields.label}</label>
              <input
                type={fields.type}
                id={fields.name}
                name={fields.name}
                placeholder={fields.placeholder}
                value={form.values[fields.name]}
                onBlur={(e) => form.handleBlur(e)}
                onChange={(e) => form.handleChange(e)}
              />
              <p>{form.errors[fields.name]}</p>
            </FormInputGroup>
          );
        })}
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
