import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import SchemesTable from "./SchemesTable";
import AddSchemes from "./AddSchemes";
import axios from "axios";
import endpoints from "../../../api/endpoints";

const Schemes = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allSchemes, setAllSchemes] = useState([]);

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const getAllEvents = async () => {
      const response = await axios.get(endpoints.GET_ALL_SCHEMES, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = response.data.data;

      setAllSchemes(data);
      // console.log(response);
    };
    getAllEvents();
  }, [showAdd]);

  return (
    <>
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
          {showAdd ? <>Close</> : <>Add Scheme</>}
        </Button>
      </div>

      {showAdd && <AddSchemes setShowAdd={setShowAdd} />}
      {/* {!showAdd && <AdminTable rows={allNews} />} */}
      {!showAdd && <SchemesTable rows={allSchemes} />}
    </>
  );
};

export default Schemes;
