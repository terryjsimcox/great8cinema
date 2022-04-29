import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import styled from 'styled-components';
import Input from './Input';
import TextArea from './TextArea';
import { colors, fonts, borderRadius } from '../../containts/styles.defaults';

const TEXT_REGEX = /^[A-z0-9]{1,24}$/;
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const PHONE_REGEX = /^([0-9]{10}$)/;
const MESSAGE_REGEX = /^[A-z0-9!@#$%&*()-_=+ '":;?{}[\]/\\.]{1,500}$/;
const ERROR_MSG = {
  text: '1 to 24 Characters. Must begin with a letter.',
  email: 'Email is required. Needs @ and a Top Level Domain like ".com".',
  phone: 'Phone is required. Needs to be 10 digit number.',
  message: 'A message is required. ',
};

const ContactUsForm = () => {
  const [btnDisable, setBtnDisable] = useState(true);
  const [firstRender, setFirstRender] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState();
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState();
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [subject, setSubject] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [validSubject, setValidSubject] = useState(false);
  const [subjectFocus, setSubjectFocus] = useState(false);

  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [validMessage, setValidMessage] = useState(false);
  const [messageFocus, setMessageFocus] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const formData = {
      firstName: firstName.toString(),
      lastName: lastName.toString(),
      email: email.toString(),
      phone: phone.toString(),
      subject: subject.toString(),
      message: message.toString(),
    };
    const result = await emailjs.send(
      'service_k8q4ut5',
      'template_eh4y1y8',
      formData,
      'agIAQlRAMiwNnacIq'
    );

    if (result.text === 'OK') {
      e.target.reset();
      setBtnDisable(false);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }
  };

  useEffect(() => {
    setValidFirstName(TEXT_REGEX.test(firstName));
    if (!validFirstName) {
      setFirstNameError(ERROR_MSG.name);
    } else {
      setFirstNameError('');
    }
  }, [firstName, validFirstName]);

  useEffect(() => {
    setValidLastName(TEXT_REGEX.test(lastName));
    if (!validLastName) {
      setLastNameError(ERROR_MSG.name);
    } else {
      setLastNameError('');
    }
  }, [lastName, validLastName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    if (!validEmail && !firstRender) {
      setEmailError(ERROR_MSG.email);
    } else {
      setEmailError('');
    }
  }, [email, validEmail, firstRender]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
    if (!validPhone && !firstRender) {
      setPhoneError(ERROR_MSG.phone);
    } else {
      setPhoneError('');
    }
  }, [phone, validPhone, firstRender]);

  useEffect(() => {
    setValidSubject(TEXT_REGEX.test(subject));
    if (!validSubject && !firstRender) {
      setSubjectError(ERROR_MSG.phone);
    } else {
      setSubjectError('');
    }
  }, [subject, validSubject, firstRender]);

  useEffect(() => {
    setValidMessage(MESSAGE_REGEX.test(message));
    if (!validMessage && !firstRender) {
      setMessageError(ERROR_MSG.message);
    } else {
      setMessageError('');
    }
  }, [message, validMessage, firstRender]);

  useEffect(() => {
    if (
      validFirstName &&
      validLastName &&
      validEmail &&
      validPhone &&
      validSubject &&
      validMessage
    ) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [
    validFirstName,
    validLastName,
    validEmail,
    validPhone,
    validSubject,
    validMessage,
  ]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <Form onSubmit={sendEmail}>
      <Title>Contact Us</Title>
      <InputGroup>
        <Container>
          <Input
            label='First Name'
            type='text'
            name='firstName'
            value={firstName}
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => {
              setValidFirstName(TEXT_REGEX.test(firstName));
              if (!validFirstName) setFirstNameError(ERROR_MSG.text);
              setFirstNameFocus(false);
            }}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <p>{!validFirstName && firstNameError}</p>
        </Container>
        <Container>
          <Input
            label='Last Name'
            type='text'
            name='lastName'
            value={lastName}
            onFocus={() => setLastNameFocus(true)}
            onBlur={() => {
              setValidLastName(TEXT_REGEX.test(lastName));
              if (!validLastName) setLastNameError(ERROR_MSG.text);
              setLastNameFocus(false);
            }}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <p>{!validLastName && lastNameError}</p>
        </Container>
        <Container>
          <Input
            label='Email'
            type='email'
            name='email'
            value={email}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => {
              setValidEmail(EMAIL_REGEX.test(email));
              if (!validEmail) setEmailError(ERROR_MSG.email);
              setEmailFocus(false);
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p>{!validEmail && emailError}</p>
        </Container>
        <Container>
          <Input
            label='Phone'
            type='tel'
            name='phone'
            value={phone}
            onFocus={() => setPhoneFocus(true)}
            onBlur={() => {
              setValidPhone(PHONE_REGEX.test(phone));
              if (!validPhone) setPhoneError(ERROR_MSG.phone);
              setPhoneFocus(false);
            }}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <p>{!validPhone && phoneError}</p>
        </Container>
        <Container>
          <Input
            label='Subject'
            type='text'
            name='subject'
            value={subject}
            onFocus={() => setSubjectFocus(true)}
            onBlur={() => {
              setValidSubject(TEXT_REGEX.test(subject));
              if (!validSubject) setSubjectError(ERROR_MSG.text);
              setSubjectFocus(false);
            }}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <p>{!validSubject && subjectError}</p>
        </Container>
        <Container>
          <TextArea
            label='Message'
            name='message'
            value={message}
            onFocus={() => setMessageFocus(true)}
            onBlur={(e) => {
              setValidMessage(e.target.value !== '');
              if (!validMessage) setMessageError(ERROR_MSG.message);
              setMessageFocus(false);
            }}
            onChange={(e) => {
              setMessage(e.target.value);
            }}></TextArea>
          <p>{!validMessage && messageError}</p>
        </Container>
      </InputGroup>
      <Submit>
        <button type='submit' disabled={btnDisable}>
          Submit
        </button>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  /* height: calc(1rem + 0.5rem); */
  & p {
    position: relative;
    left: calc(30% + 0.5rem);
    width: 50%;
    margin-top: 0.5rem;
    color: ${colors.red[500]};
    font-family: ${fonts.EncodeSans};
    letter-spacing: 0.04rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem 0.5rem;
  width: 100%;
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
    &:disabled {
      opacity: 0.5;
      &:hover {
        background-color: ${colors.secondary[700]};
        cursor: default;
      }
    }
  }
`;

function debounce(cb, delay = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
