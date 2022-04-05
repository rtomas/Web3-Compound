import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableBody, TableCell, TableRow, Paper } from '@mui/material';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { formatResultCripto, cropAddress, formatTokenUnits } from '../utils/etherHelper';

interface ListBorrowProps {
  account: string;
}

const BORROW_QUERY = gql`
  query ($address: String) {
    borrowEntities(where: { address: $address }, orderBy: id, orderDirection: desc) {
      id
      amount
    }
  }
`;

function ListBorrow(props: ListBorrowProps) {
  const { loading, error, data } = useQuery(BORROW_QUERY, {
    variables: {
      address: props.account,
    },
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Transac. id</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
            {loading && <div>loading</div>}
            {error && <div>{error}</div>}
            {data?.borrowEntities.map((borrow, index) => (
              <TableRow key={index}>
                <TableCell>{borrow.id}</TableCell>
                <TableCell>{formatResultCripto(formatTokenUnits(borrow.amount, 18))} DAI</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListBorrow;
