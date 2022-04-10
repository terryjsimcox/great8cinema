import React from 'react';

import styled from 'styled-components';
import { colors } from '../containts/styles.defaults';

export default function TicketPrices() {
  return (
    <Container>
      <Title>Ticket Prices</Title>
      <Table>
        <TableItem>
          <p>Adults</p>
        </TableItem>
        <TableItem>
          <p>$8.00</p>
        </TableItem>
        <TableItem>
          <p>Children (3-11)</p>
        </TableItem>
        <TableItem>
          <p>$6.50</p>
        </TableItem>
        <TableItem>
          <p>Seniors (62+)</p>
        </TableItem>
        <TableItem>
          <p>$6.25</p>
        </TableItem>
        <TableItem>
          <p>Matinee</p>
        </TableItem>
        <TableItem>
          <p>$6.50</p>
        </TableItem>
        <TableItem>
          <p>* All tickets subject to applicable tax.</p>
        </TableItem>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: ${colors.white[200]};
`;

const Table = styled.ul`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;
const TableItem = styled.li`
  &:nth-child(even) > p {
    text-align: center;
    font-weight: bold;
  }
  & > p {
    padding: 0.5rem;
    color: ${colors.white[200]};
    font-size: 0.9rem;
    border: 1px solid ${colors.white[200]};
  }
  &:last-child {
    grid-column: 1/3;
  }
`;
