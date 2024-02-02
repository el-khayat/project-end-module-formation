import React from 'react'
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TableComponent = ({ data, columns, handleUpdate, handleDelete, actions }) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const [anchorEl, setAnchorEl] = React.useState(null);

  const [curentRowId, setCurentRowId] = React.useState(0);

  const open = curentRowId;

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurentRowId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setCurentRowId(0);
  };



  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id + row.id} align={column.align}>
                          {column.format
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <div>
                        <Button
                          id={"demo-positioned-button" + row.id}
                          aria-controls={open ? 'demo-positioned-menu' + row.id : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          <MoreVertIcon />
                        </Button>
                        <Menu
                          id={"demo-positioned-menu" + row.id}
                          aria-labelledby={"demo-positioned-button" + row.id}
                          anchorEl={anchorEl}
                          open={open === row.id}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          
                        >

                          <MenuItem >
                            <Button variant='outlined' sx={{ my: 0.1,width:200 }}
                              onClick={() => handleUpdate(row)}
                            >
                              Update
                            </Button>
                          </MenuItem>

                          <MenuItem >
                            <Button variant='outlined' sx={{ my: 0.1,width:200 }} color="error"
                              onClick={() => handleDelete(row.id)} >
                              Delete
                            </Button>
                          </MenuItem>

                          <MenuItem >
                            <Button variant='outlined' sx={{ my: 0.1,width:200 }}
                              onClick={() => { actions[0].action(row.id) }}>
                              {actions[0].name}
                            </Button>
                          </MenuItem>


                          <MenuItem >
                          <Button variant='outlined' sx={{ my: 0.1,width:200 }} 
                        onClick={() => { actions[1].action(row.id) }} >
                         {actions[1].name}
                      </Button>
                         
                          
                          </MenuItem>
                        </Menu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default TableComponent
