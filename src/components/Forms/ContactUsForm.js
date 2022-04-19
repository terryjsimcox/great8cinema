import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import Input from './Input';
import TextArea from './TextArea';
import { ContactInputs } from '../../containts/ContactForm.defaults';
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

  const sendEmail = async (e) => {
    e.preventDefault();
    const result = await emailjs.send(
      'service_k8q4ut5',
      'template_eh4y1y8',
      formState,
      'agIAQlRAMiwNnacIq'
    );

    if (result.text === 'OK') {
      e.target.reset();
      return setFormState(initialState);
    }
    console.error(result);
  };
  return (
    <Form onSubmit={sendEmail}>
      <Title>Contact Us</Title>
      <InputGroup>
        <Input
          label='First Name'
          type='text'
          name='firstName'
          value={formState.firstName}
          onChange={(e) => {
            setFormState({ ...formState, firstName: e.target.value });
          }}
        />
        <Input
          label='Last Name'
          type='text'
          name='lastName'
          value={formState.lastName}
          onChange={(e) => {
            setFormState({ ...formState, lastName: e.target.value });
          }}
        />
        <Input
          label='Email'
          type='email'
          name='email'
          value={formState.email}
          onChange={(e) => {
            setFormState({ ...formState, email: e.target.value });
          }}
        />
        <Input
          label='Phone'
          type='tel'
          name='phone'
          value={formState.phone}
          onChange={(e) => {
            setFormState({ ...formState, phone: e.target.value });
          }}
        />
        <Input
          label='Subject'
          type='text'
          name='subject'
          value={formState.subject}
          onChange={(e) => {
            setFormState({ ...formState, subject: e.target.value });
          }}
        />
        <TextArea
          label='Message'
          name='message'
          value={formState.message}
          onChange={(e) => {
            setFormState({ ...formState, message: e.target.value });
          }}></TextArea>
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
  width: 960px;
  padding: 0.5rem;
  @media only screen and (max-width: 960px) {
    width: 100%;
    align-items: center;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem 0.5rem;
  width: 80%;
  padding: 1rem;
  @media only screen and (max-width: 960px) {
    width: 90%;
    padding: 0;
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
  @media only screen and (max-width: 960px) {
    width: 90%;
  }
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
    @media only screen and (max-width: 960px) {
      width: 100%;
      margin: 0;
    }
  }
`;
