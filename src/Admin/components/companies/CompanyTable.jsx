import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import endpoints, { base_uri } from "../../../api/endpoints";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import toast, { Toaster } from "react-hot-toast";

import TextField from "@material-ui/core/TextField";

const columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 150,
    align: "center",
  },
  {
    id: "created_by_name",
    label: "Created By",
    minWidth: 100,
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 70,
    align: "center",
  },
  {
    id: "number",
    label: "Number",
    minWidth: 100,
    align: "center",
  },
  {
    id: "gst_number",
    label: "Gst number",
    minWidth: 150,
    align: "center",
  },
  {
    id: "reg_number",
    label: "Reg number",
    minWidth: 100,
    align: "center",
  },
  {
    id: "reg_date",
    label: "Reg date",
    minWidth: 100,
    align: "center",
  },
  {
    id: "sector",
    label: "Sector",
    minWidth: 100,
    align: "center",
  },
  {
    id: "description",
    label: "Description",
    minWidth: 200,
    align: "center",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 100,
    align: "center",
  },
  // {
  //   id: "is_verify",
  //   label: "Is Verified",
  //   minWidth: 100,
  //   align: "center",
  // },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
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

export default function CompanyTable() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [switchState, setSwitchState] = useState({});
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const getAllCompanies = async () => {
      const response = await axios.get(endpoints.get_allCompany, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = response.data;

      setRows(data);
      // console.log(response);
    };
    getAllCompanies();
  }, []);

  console.log(rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {}, [switchState]);

  const searchChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const filter = rows.filter((element) =>
      element.name.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredData(filter);
    console.log(filter);
  }, [search, rows]);

  // useEffect(() => {
  //   const initialSwitchState = {};
  //   rows.forEach((row) => {
  //     initialSwitchState[row.id] = row.is_verify === "true" ? "true" : "false";
  //   });
  //   setSwitchState(initialSwitchState);
  // }, [rows]);

  const handleVerifyClick = async (row) => {
    const updatedRows = rows.map((r) =>
      r.id === row.id ? { ...r, is_verify: !r.is_verify } : r
    );
    setRows(updatedRows);

    let customMessage;

    if (row.is_verify === true) {
      customMessage = "Company unassigned successfully!";
    } else {
      customMessage = "Company assigned succesfully!"; 
    }

    try {
      const response = await axios.post(
        endpoints.COMPANY_VERIFY,
        {
          company_id: row.id,
          is_verify: !row.is_verify,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      const data = response.data;
      row.is_verify = data.is_verify;
      toast.success(customMessage);
      console.log(data, "heer is dt", row);
    } catch (error) {
      toast.error("Company not assigned!");
    }
  };

  return (
    <>
      <div style={{textAlign:'end'}}> 
        <TextField
          id="standard-basic"
          label="Search..."
          variant="standard"
          type="text"
          onChange={searchChange}
          style={{ marginBottom: "12px" }}
        />
      </div>

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
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
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
                            ) : column.id === "action" ? (
                              // <Button
                              //   variant="contained"
                              //   color="primary"
                              //   onClick={() => handleVerifyClick(row)}
                              // >
                              //   Verify
                              // </Button>
                              <Switch
                                checked={row?.is_verify}
                                // onChange={() => handleVerifyToggle(row)}
                                onClick={() => handleVerifyClick(row)}
                                color="primary"
                              />
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
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
    </>
  );
}
