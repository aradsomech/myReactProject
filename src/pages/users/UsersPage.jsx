import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton"; // Add this line for IconButton
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

const handleDeleteUserClick = () => {
  axios
    .delete(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/65424ae9a8d1eae12d31e360"
    )
    .then(() => {
      toast.success("Deleted successfully");
    })
    .catch((err) => {
      toast.error("Deletion isnt allowed");
    });
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Buisness</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name.first}</TableCell>
                  <TableCell>{user.name.last}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={handleDeleteUserClick}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{/* Add data for Custom Header 2 */}</TableCell>
                  <TableCell>{/* Add data for Custom Header 3 */}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UsersPage;
