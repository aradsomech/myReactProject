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
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const user = useSelector((state) => state.authSlice.userData);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      toast.error("Access denied. Admins only.");
      navigate(-1);
    }
  }, [user, navigate]);

  const handleDeleteUserClick = (id) => {
    console.log(id);
    axios
      .delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`
      )
      .then(() => {
        toast.success("Deleted successfully");
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch(() => {
        toast.error("Deletion isn't allowed");
      });
  };

  const handleUpgradeUserClick = (id) => {
    console.log(id);
    axios
      .patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`)
      .then(() => {
        toast.success("Upgrade successfully");
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch(() => {
        toast.error("Can not be upgraded");
      });
  };

  const fetchUsers = () => {
    axios
      .get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchUsers();
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
              <TableCell>Delete</TableCell>
              <TableCell>Buisness</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name.first}</TableCell>
                  <TableCell>{user.name.last}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteUserClick(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {user.isBusiness ? (
                      <WorkIcon />
                    ) : (
                      <UpgradeIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleUpgradeUserClick(user._id)}
                        color="primary"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => navigate("/edituser/" + user._id)}
                    >
                      <CreateIcon />
                    </IconButton>
                  </TableCell>
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
