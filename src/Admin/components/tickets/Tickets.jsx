import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import endpoints from "../../../api/endpoints";
import toast from "react-hot-toast";
// import EditScheme from "./EditScheme";
import TextField from "@material-ui/core/TextField"; 
import TicketsTable from "./TicketsTable";

const Tickets = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allTickets, setAllTickets] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedTicketsId, setSelectedTicketsId] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const accessToken = localStorage.getItem("access");

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
  }, [showAdd, showEdit]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoints.RAISE_TICKET}${id}/`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setAllTickets(allTickets.filter((events) => events.id !== id));
      toast.success("Ticket succesfully deleted!");
    } catch (error) {
      toast.error("Ticket not Deleted!");
    }
  };

  const handleEdit = (id) => {
    setSelectedTicketsId(id);
    setShowEdit(true);
  };
  const searchChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const filter = allTickets.filter((element) =>
      element.title.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredData(filter);
    console.log(filter);
  }, [search, allTickets]);

  return (
    <Container>
      {/* {!showAdd && !showEdit && (
        <div style={{ textAlign: "center" }}>
          <h2>Govt Schemes</h2>
        </div>
      )} */}
      <div style={{ textAlign: "center" }}>
        <h1>Tickets</h1>
      </div>

      <div
        style={{
          display: "flex",
          // justifyContent: !showAdd && !showEdit ? "space-between" : "end",
          justifyContent:'end',
          paddingBottom: "8px",
          paddingTop: "8px",
          paddingRight: "8px",
        }}
      >
        {/* <Button
          variant="contained"
          color="primary"
          style={{ height: "40px", borderRadius: "18px" }}
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? <>Close</> : <>Add Schemes</>}
        </Button> */}
        {!showAdd && !showEdit && (
          <TextField
            id="standard-basic"
            label="Search..."
            variant="standard"
            type="text"
            onChange={searchChange}
            style={{ marginBottom: "12px" }}
          />
        )}
      </div>

      {/* {showAdd && <AddSchemes setShowAdd={setShowAdd} />} */}
      {/* {!showAdd && <AdminTable rows={allNews} />} */}
        {/* {showEdit && (
          <EditScheme schemeId={selectedTicketsId} setShowEdit={setShowEdit} />
        )} */}
      {/* {!showAdd && (
        <SchemesTable rows={allTickets} handleDelete={handleDelete} />
      )} */}

      {!showAdd && !showEdit && (
        <TicketsTable
          rows={filteredData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </Container>
  );
};

export default Tickets;
