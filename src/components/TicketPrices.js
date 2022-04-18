import React from "react";
import { v4 as uuid } from "uuid";
import { Tickets } from "../containts/TicketPrices";
import styled from "styled-components";
import { colors, fonts } from "../containts/styles.defaults";

export default function TicketPrices() {
  return (
    <Container>
      <Title>Ticket Prices</Title>
      <Table>
        {Tickets?.map((ticket) => (
          <TableItem key={uuid()}>
            <p>{ticket.name}</p>
            <p>{`$${ticket.price}`}</p>
          </TableItem>
        ))}
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
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const TableItem = styled.li`
  display: flex;

  & > p {
    margin: 0;
    padding: 0.5rem;
    color: ${colors.white[200]};
    font-family: ${fonts.EncodeSans}, sans-serif;
    font-size: 0.9rem;
    border: 1px solid ${colors.white[200]};
    &:nth-child(even) {
      font-weight: bold;
    }
  }
  & > p:first-child {
    width: 150px;
    justify-content: flex-start;
  }
  & > p:last-child {
    flex: 2;
  }
`;
