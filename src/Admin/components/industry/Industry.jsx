import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import endpoints from "../../../api/endpoints";
import toast from "react-hot-toast";
import TextField from "@material-ui/core/TextField";
import IndustryTable from "./IndustryTable";
import AddIndustry from "./AddIndustry";
import EditIndustry from "./EditIndustry";

const Industry = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allIndustry, setAllIndustry] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const getAllIndustry = async () => {
      const response = await axios.get(endpoints.get_industry, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = response.data.data;

      setAllIndustry(data);
      // console.log(response);
    };
    getAllIndustry();
  }, [showAdd, showEdit]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoints.get_industry}${id}/`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setAllIndustry(allIndustry.filter((events) => events.id !== id));
      toast.success("Scheme succesfully deleted!");
    } catch (error) {
      toast.error("Scheme not Deleted!");
    }
  };

  const handleEdit = (id) => {
    setSelectedIndustryId(id);
    setShowEdit(true);
  };
  const searchChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const filter = allIndustry.filter((element) =>
      element.name.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredData(filter);
    console.log(filter);
  }, [search, allIndustry]);

  return (
    <Container>
      {/* {!showAdd && !showEdit && (
        <div style={{ textAlign: "center" }}>
          <h2>Govt Schemes</h2>
        </div>
      )} */}
      <div style={{ textAlign: "center" }}>
        <h1>Industries</h1>
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
          {showAdd ? <>Close</> : <>Add Industry</>}
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

      {showAdd && <AddIndustry setShowAdd={setShowAdd} />}
      {/* {!showAdd && <AdminTable rows={allNews} />} */}
      {showEdit && (
        <EditIndustry industryId={selectedIndustryId} setShowEdit={setShowEdit} />
      )}
      {/* {!showAdd && (
        <SchemesTable rows={allIndustry} handleDelete={handleDelete} />
      )} */}

      {!showAdd && !showEdit && (
        <IndustryTable
          rows={filteredData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </Container>
  );
};

export default Industry;
