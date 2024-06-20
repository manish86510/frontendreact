import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import SchemesTable from "./SchemesTable";
import AddSchemes from "./AddSchemes";
import axios from "axios";
import endpoints from "../../../api/endpoints";
import toast from "react-hot-toast";
import EditScheme from "./EditScheme";
import TextField from "@material-ui/core/TextField";

const Schemes = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allSchemes, setAllSchemes] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedSchemesId, setSelectedSchemesId] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
      await axios.delete(`${endpoints.ADD_SCHEMES}${id}/`, {
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
  const searchChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const filter = allSchemes.filter((element) =>
      element.name.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredData(filter);
    console.log(filter);
  }, [search, allSchemes]);

  return (
    <Container>
      {/* {!showAdd && !showEdit && (
        <div style={{ textAlign: "center" }}>
          <h2>Govt Schemes</h2>
        </div>
      )} */}
      <div style={{ textAlign: "center" }}>
        <h1>Govt Schemes</h1>
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
        {!showEdit && (
          <Button
            variant="contained"
            color="primary"
            style={{ height: "40px", borderRadius: "18px" }}
            onClick={() => setShowAdd(!showAdd)}
          >
            {showAdd ? <>Close</> : <>Add Schemes</>}
          </Button>
        )}

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
          rows={filteredData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </Container>
  );
};

export default Schemes;
