import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { base_uri } from "../../../api/endpoints";
import { Toaster } from "react-hot-toast";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";

const columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 150,
    align: "center",
    align: "center",
  },
  { id: "price", label: "Price", minWidth: 120, align: "center" },
  {
    id: "tenure",
    label: "Tenure",
    minWidth: 180,
    align: "center",
  },
  {
    id: "description",
    label: "Description",
    minWidth: 350,
    align: "center",
  },
  {
    id: "edit",
    label: "Edit",
    minWidth: 80,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 80,
    align: "center",
  },
  { id: "is_active", label: "Active", minWidth: 80, align: "center" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    // maxHeight: 600,
  },
  img: {
    width: "100px",
    height: "auto",
  },
});

export default function PlanTable({
  rows,
  handleDelete,
  handleEdit,
  handleToggle,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Toaster position="top-right" reverseOrder={false} />

      <TableContainer className={classes.container}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "banner" ? (
                            <img
                              src={`${base_uri}${value}`}
                              alt="banner"
                              className={classes.img}
                            />
                          ) : column.id === "edit" ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleEdit(row.id)}
                            >
                              Edit
                            </Button>
                          ) : column.id === "actions" ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleDelete(row.id)}
                            >
                              Delete
                            </Button>
                          ) : column.id === "is_active" ? (
                            <Switch
                              checked={row.is_active}
                              onClick={() =>
                                handleToggle(row.id, row.is_active)
                              }
                              color="primary"
                            />
                          ) : column.id === "short_desc" ||
                            column.id === "long_desc" ? (
                            <div dangerouslySetInnerHTML={{ __html: value }} />
                          ) : column.id === "url" ? (
                            <a
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
