import React from 'react';
import styled from 'styled-components';
import EmploymentForm from './Forms/EmploymentForm';

const Employment = () => {
  return (
    <Container>
      <EmploymentForm />
    </Container>
  );
};

export default Employment;

const Container = styled.div`
  position: relative;
  top: 7rem;
  display: flex;
  justify-content: center;
`;
