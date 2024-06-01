import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import AddEvents from "./AddEvents";
import EventsTable from "./EventsTable";
import axios from "axios";
import endpoints from "../../../api/endpoints";
import toast from "react-hot-toast";

const AdminEvents = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allEvents, setAllEvents] = useState([]);

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
  }, [showAdd]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoints.DELETE_EVENTS}/${id}/`, {
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

  return (
    <Container>
      <div
        style={{
          textAlign: "end",
          paddingBottom: "8px",
          paddingTop: "8px",
          paddingRight: "8px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? <>Close</> : <>Add Events</>}
        </Button>
      </div>

      {showAdd && <AddEvents setShowAdd={setShowAdd} />}
      {/* {!showAdd && <AdminTable rows={allNews} />} */}
      {!showAdd && <EventsTable rows={allEvents} handleDelete={handleDelete} />}
    </Container>
  );
};

export default AdminEvents;
