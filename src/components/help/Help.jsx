import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Box, Container } from "@material-ui/core";
import RaiseTicketForm from "./RaiseTicketForm";
import ResponseContent from "./ResponseContent";
import TicketsTable from "../../Admin/components/tickets/TicketsTable";
import endpoints from "../../api/endpoints";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

// import CountContent from './CountContent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Help = () => {
  // const [value, setValue] = useState(0);
  const classes = useStyles();
  const [allTickets, setAllTickets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const accessToken = localStorage.getItem("access");

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  useEffect(() => {
    const getAllEvents = async () => {
      const response = await axios.get(endpoints.RAISE_TICKET, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = response.data.data;

      setAllTickets(data);
      // console.log(response);
    };
    getAllEvents();
  }, [accessToken, showForm]);

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = ()=>{
    setShowForm(!showForm)
  }

  useEffect(() => {
    const filter = allTickets.filter((element) =>
      element.title.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredData(filter);
    console.log(filter);
  }, [search, allTickets]);

  return (
    <div className={classes.root}>
      {/* <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Raise ticket" />

        <Tab label="Response" />
      </Tabs>
      {value === 0 && <RaiseTicketForm />}
      {value === 1 && (
        <>
          <div style={{textAlign:'end', marginBottom:'2rem',marginTop:'1rem'}}>
            <TextField
              id="standard-basic"
              label="Search..."
              variant="standard"
              type="text"
              onChange={searchChange}
              className={classes.searchField}
            />
          </div>
          <TicketsTable rows={filteredData} />
        </>
      )} */}

      {/* New design */}

      {!showForm ? (
        <div
          style={{
            fontSize: "24px",
            fontFamily: "Daikon-Bold",
            textAlign: "center",
          }}
        >
          My Support Tickets
        </div>
      ) : (
        <div
          style={{
            fontSize: "24px",
            fontFamily: "Daikon-Bold",
            textAlign: "center",
          }}
        >
          Raise Tickets
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: showForm ? "end" : "space-between",
          marginBottom: "2rem",
          marginTop: "1rem",
        }}
      >
        {!showForm && (
          <TextField
            id="standard-basic"
            label="Search..."
            variant="standard"
            type="text"
            onChange={searchChange}
            className={classes.searchField}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          style={{ height: "40px", borderRadius: "18px" }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <>Close</> : <>Raise Ticket</>}
        </Button>
      </div>
      {!showForm && <TicketsTable rows={filteredData} />}

      {showForm && <RaiseTicketForm  handleClose={handleClose} />}
    </div>
  );
};

export default Help;
