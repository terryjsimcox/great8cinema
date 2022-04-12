import React, { useState } from 'react';

import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../../containts/styles.defaults';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};
const ContactUsForm = () => {
  const [formState, setFormState] = useState(initialState);
  return (
    <Form>
      <Title>Contact Us</Title>
      <InputGroup>
        <label>First Name:</label>
        <input
          type='text'
          name='firstName'
          value={formState.firstName}
          onChange={(e) =>
            setFormState({ ...formState, firstName: e.target.value })
          }
        />
        <label>Last Name:</label>
        <input
          type='text'
          name='lastName'
          value={formState.lastName}
          onChange={(e) =>
            setFormState({ ...formState, lastName: e.target.value })
          }
        />
        <label> Email:</label>
        <input
          type='email'
          name='email'
          value={formState.email}
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
        />
        <label>Phone:</label>
        <input
          type='tel'
          name='phone'
          value={formState.phone}
          onChange={(e) =>
            setFormState({ ...formState, phone: e.target.value })
          }
        />
        <label>Subject:</label>
        <input
          type='text'
          name='subject'
          value={formState.subject}
          onChange={(e) =>
            setFormState({ ...formState, subject: e.target.value })
          }
        />
        <label>Message:</label>
        <textarea
          name='message'
          value={formState.message}
          onChange={(e) =>
            setFormState({ ...formState, message: e.target.value })
          }></textarea>
      </InputGroup>
      <Submit>
        <button type='submit'>Submit</button>
      </Submit>
    </Form>
  );
};

export default ContactUsForm;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  & button {
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.2fr;
  gap: 1rem 0.5rem;
  width: 950px;
  padding: 1rem;
  & label {
    grid-column: 1/2;
    color: ${colors.white[200]};
    text-align: right;
  }
  & input {
    grid-column: 2/3;
    height: 2rem;
    border-radius: 4px;
    outline: none;
    border: none;
  }
  & textarea {
    grid-column: 2/3;
    height: 200px;
    border-radius: 4px;
  }
`;
const Title = styled.h3`
  margin: 2rem;
  color: ${colors.white[200]};
  font-size: 2rem;
`;
const Submit = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2rem;
  & button {
    width: 25%;
    margin-top: 4rem;
    margin-right: 4rem;
    padding: 1rem 2rem;
    color: ${colors.white[100]};
    font-size: 1.2rem;
    font-family: ${fonts.EncodeSans};
    letter-spacing: ${fonts.letterSpacing};
    background-color: ${colors.secondary[700]};
    border: none;
    border-radius: ${borderRadius.sm};
    cursor: pointer;
    &:hover {
      background-color: ${colors.secondary[500]};
    }
  }
`;
