import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const TextArea = ({ label, name, value, onChange }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledTextArea
        name={name}
        value={value}
        onChange={onChange}></StyledTextArea>
    </Container>
  );
};

export default TextArea;

const Container = styled.div`
  display: flex;
  width: 100%;
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
const StyledTextArea = styled.textarea`
  width: 70%;
  height: 200px;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: ${fonts.weight[500]};
  font-family: ${fonts.EncodeSans};
  border-radius: 5px;
  resize: none;
  @media only screen and (max-width: 960px) {
    width: 100%;
  }
`;
