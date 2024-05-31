import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import AddEvents from "./AddEvents";
import EventsTable from "./EventsTable";
import axios from "axios";
import endpoints from "../../../api/endpoints";

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
      {!showAdd && <EventsTable rows={allEvents} />}
    </Container>
  );
};

export default AdminEvents;
