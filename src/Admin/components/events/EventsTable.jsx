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
import Button from "@material-ui/core/Button";
import toast, { Toaster } from "react-hot-toast";

const columns = [
  {
    id: "title",
    label: "Title",
    minWidth: 150,
    align: "left",
  },
  { id: "banner", label: "Banner", minWidth: 120, align: "left" },
  {
    id: "date",
    label: "Date",
    minWidth: 70,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "time", label: "Time", minWidth: 70, align: "left" },
  {
    id: "short_desc",
    label: "Short Description",
    minWidth: 180,
    align: "left",
  },
  {
    id: "long_desc",
    label: "Long Description",
    minWidth: 350,
    align: "left",
  },

  {
    id: "amount",
    label: "amount",
    minWidth: 100,
    align: "left",
  },
  {
    id: "guests",
    label: "guests",
    minWidth: 150,
    align: "left",
  },
  {
    id: "edit",
    label: "Actions",
    minWidth: 80,
    align: "right",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 80,
    align: "right",
  },
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

const convertTo12HourFormat = (time) => {
  const [hour, minute] = time.split(":");
  const hours = (hour % 12 || 12).toString().padStart(2, "0");
  const minutes = minute.padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${ampm}`;
};

export default function EventsTable({ rows, handleDelete, handleEdit }) {
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
                          ) : column.id === "short_desc" ||
                            column.id === "long_desc" ? (
                            <div dangerouslySetInnerHTML={{ __html: value }} />
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.id === "time" ? (
                            convertTo12HourFormat(value)
                          ) :  (
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
