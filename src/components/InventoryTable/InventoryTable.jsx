import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useInventoryTable } from './InventoryTable.hooks';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@emotion/react';

export default function InventoryTable() {
  const theme = useTheme();
  const isLargeView = useMediaQuery(theme.breakpoints.up('md'));

  const {
    isLoading,
    inventoryData,
    isEditModalOpen,
    isDeleteModalOpen,
    toggleEditProductModal,
    toggleDeleteProductModal,
    deleteProduct,
    editProduct,
    errors,
    handleChange,
    name,
    price,
    brand,
    category,
    stock,
  } = useInventoryTable();

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
      <Modal open={isDeleteModalOpen} onClose={toggleDeleteProductModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isLargeView ? 400 : '85%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" align="center" fontWeight={'600'}>
            Delete Product
          </Typography>
          <IconButton
            sx={{ position: 'absolute', top: 0, right: 0, margin: 2 }}
            onClick={toggleDeleteProductModal}
            size="small"
          >
            <ClearIcon />
          </IconButton>

          <Typography
            variant="h6"
            align="center"
            fontWeight={'400'}
            sx={{ paddingTop: 2 }}
            color={'error'}
          >
            Are you sure you want to delete the product ?
          </Typography>
          <Button
            sx={{
              boxShadow: 0,
              borderRadius: 2,
              fontWeight: 600,
              marginTop: 2,
            }}
            variant="contained"
            color="error"
            fullWidth
            onClick={deleteProduct}
          >
            Delete
          </Button>
        </Box>
      </Modal>

      <Modal open={isEditModalOpen} onClose={toggleEditProductModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isLargeView ? 400 : '85%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight={'600'}
            sx={{ paddingBottom: 1 }}
          >
            Edit Product
          </Typography>
          <IconButton
            sx={{ position: 'absolute', top: 0, right: 0, margin: 2 }}
            onClick={toggleEditProductModal}
            size="small"
          >
            <ClearIcon />
          </IconButton>

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Product Name"
            name="name"
            autoFocus
            error={errors.name}
            helperText={errors.name ? 'Product name is required' : ''}
            value={name}
            onChange={handleChange}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Product Price"
            id="price"
            type="number"
            error={errors.price}
            helperText={errors.price ? 'Product price is required' : ''}
            value={price}
            onChange={handleChange}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="brand"
            label="Brand"
            id="brand"
            error={errors.brand}
            helperText={errors.brand ? 'Brand is required' : ''}
            value={brand}
            onChange={handleChange}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="category"
            label="category"
            id="category"
            error={errors.category}
            helperText={errors.category ? 'Product Category is required' : ''}
            value={category}
            onChange={handleChange}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="stock"
            label="Stock"
            id="stock"
            error={errors.stock}
            helperText={errors.stock ? 'Stock is required' : ''}
            value={stock}
            onChange={handleChange}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
          />

          <Button
            sx={{
              boxShadow: 0,
              borderRadius: 2,
              fontWeight: 600,
              marginTop: 2,
            }}
            variant="contained"
            color="info"
            fullWidth
            onClick={editProduct}
          >
            Edit
          </Button>
        </Box>
      </Modal>

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
              <StyledTableCell
                sx={{
                  position: 'sticky',
                  right: 0,
                  top: 0,
                  background: 'white',
                  justifyContent: 'center',
                }}
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.brand.code}</StyledTableCell>
                <StyledTableCell>{row.brand.name}</StyledTableCell>
                <StyledTableCell>{row.code}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.product_category.name}</StyledTableCell>
                <StyledTableCell>{row.minimum_stock}</StyledTableCell>
                <StyledTableCell>₹{row.price}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    position: 'sticky',
                    right: 0,
                    background: 'white',
                    justifyContent: 'center',
                    display: 'flex',
                    gap: 2,
                    padding: '20px 25px',
                  }}
                >
                  <IconButton onClick={() => toggleEditProductModal(row.id)}>
                    <ModeEditIcon color="info" />
                  </IconButton>
                  <IconButton onClick={() => toggleDeleteProductModal(row.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </StyledTableCell>
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
      padding: '20px 25px',
    },
  },
}));
