import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import SchemesTable from "./SchemesTable";
import AddSchemes from "./AddSchemes";
import axios from "axios";
import endpoints from "../../../api/endpoints";
import toast from "react-hot-toast";
import EditScheme from "./EditScheme";

const Schemes = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allSchemes, setAllSchemes] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedSchemesId, setSelectedSchemesId] = useState(null);

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
  }, [showAdd, showEdit]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoints.DELETE_SCHEMES}/${id}/`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setAllSchemes(allSchemes.filter((events) => events.id !== id));
      toast.success("Scheme succesfully deleted!");
    } catch (error) {
      toast.error("Scheme not Deleted!");
    }
  };

  const handleEdit = (id) => {
    setSelectedSchemesId(id);
    setShowEdit(true);
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
          {showAdd ? <>Close</> : <>Add Scheme</>}
        </Button>
      </div>

      {showAdd && <AddSchemes setShowAdd={setShowAdd} />}
      {/* {!showAdd && <AdminTable rows={allNews} />} */}
      {showEdit && (
        <EditScheme schemeId={selectedSchemesId} setShowEdit={setShowEdit} />
      )}
      {/* {!showAdd && (
        <SchemesTable rows={allSchemes} handleDelete={handleDelete} />
      )} */}

      {!showAdd && !showEdit && (
        <SchemesTable
          rows={allSchemes}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </Container>
  );
};

export default Schemes;
