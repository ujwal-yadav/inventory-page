import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { useInventoryTable } from './InventoryTable.hooks';

export default function InventoryTable() {
  const { isLoading, inventoryData } = useInventoryTable();

  if (isLoading)
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );

  if (!inventoryData?.length)
    return (
      <Typography variant="h6" align="center">
        No Products available
      </Typography>
    );

  return (
    <>
      <Typography
        variant="h5"
        component="h1"
        sx={{ paddingBottom: 2, fontWeight: 600 }}
      >
        Inventory
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Brand Code</StyledTableCell>
              <StyledTableCell>Brand Name</StyledTableCell>
              <StyledTableCell>Product Code</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Product Category</StyledTableCell>
              <StyledTableCell>Stock</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row.brand.code}</StyledTableCell>
                <StyledTableCell>{row.brand.name}</StyledTableCell>
                <StyledTableCell>{row.code}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.product_category.name}</StyledTableCell>
                <StyledTableCell>{row.minimum_stock}</StyledTableCell>
                <StyledTableCell>₹{row.price}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: '550',
    [theme.breakpoints.up('md')]: {
      fontSize: 20,
      padding: 25,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    [theme.breakpoints.up('md')]: {
      fontSize: 20,
      padding: 20,
    },
  },
}));
