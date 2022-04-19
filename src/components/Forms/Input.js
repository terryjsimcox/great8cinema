import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const Input = ({ label, type, name, value, onChange }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput type={type} name={name} value={value} onChange={onChange} />
    </Container>
  );
};

export default Input;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media only screen and (max-width: 960px) {
    flex-direction: column;
    justify-content: center;
  }
`;
const Label = styled.label`
  width: 30%;
  margin-right: 0.5rem;
  text-align: right;
  color: ${colors.white[200]};
  font-size: 1.2rem;
  @media only screen and (max-width: 960px) {
    text-align: left;
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;
const StyledInput = styled.input`
  width: 70%;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: ${fonts.weight[500]};
  font-family: ${fonts.EncodeSans};
  border-radius: 5px;
  outline: none;
  border: none;
  @media only screen and (max-width: 960px) {
    width: 100%;
  }
`;
