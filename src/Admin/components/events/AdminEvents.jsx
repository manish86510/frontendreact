import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import AddEvents from "./AddEvents";
import EventsTable from "./EventsTable";
import axios from "axios";
import endpoints from "../../../api/endpoints";
import toast from "react-hot-toast";
import EditEvents from "./EditEvents";
import TextField from "@material-ui/core/TextField";
const AdminEvents = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedEventsId, setSelectedEventsId] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const getAllEvents = async () => {
      const response = await axios.get(endpoints.GET_ALL_EVENTS, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = response.data.data;

      setAllEvents(data);
      // console.log(response);
    };
    getAllEvents();
  }, [showAdd, showEdit]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoints.ADD_EVENTS}${id}/`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setAllEvents(allEvents.filter((events) => events.id !== id));
      toast.success("Event succesfully deleted!");
    } catch (error) {
      toast.error("Event not Deleted!");
    }
  };

  const handleEdit = (id) => {
    setSelectedEventsId(id);
    setShowEdit(true);
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const filter = allEvents.filter((element) =>
      element.title.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredData(filter);
    console.log(filter);
  }, [search, allEvents]);

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <h1>Events</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: !showAdd && !showEdit ? "space-between" : "end",
          paddingBottom: "8px",
          paddingTop: "8px",
          paddingRight: "8px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ height: "40px", borderRadius: "18px" }}
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? <>Close</> : <>Add News</>}
        </Button>
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

      {showAdd && <AddEvents setShowAdd={setShowAdd} />}
      {/* {!showAdd && <AdminTable rows={allNews} />} */}
      {showEdit && (
        <EditEvents eventId={selectedEventsId} setShowEdit={setShowEdit} />
      )}
      {!showAdd && !showEdit && (
        <EventsTable
          rows={filteredData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </Container>
  );
};

export default AdminEvents;
