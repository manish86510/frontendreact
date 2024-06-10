import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import endpoints from "../../../api/endpoints";
import toast from "react-hot-toast";
import TextField from "@material-ui/core/TextField";
import SubscriptionTable from "./SubscriptionTable";
import AddPlan from "./AddPlan";
import PlanTable from "./PlanTable";
import EditPlan from "./EditPlan";

const UserSubscription = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allPlan, setAllPlan] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const getAllPlans = async () => {
      const response = await axios.get(endpoints.GET_PLAN, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = response.data;

      setAllPlan(data);
      // console.log(response);
    };
    getAllPlans();
  }, [showAdd, showEdit]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoints.ADD_SCHEMES}${id}/`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setAllPlan(allPlan.filter((events) => events.id !== id));
      toast.success("Scheme succesfully deleted!");
    } catch (error) {
      toast.error("Scheme not Deleted!");
    }
  };

  const handleEdit = (id) => {
    setSelectedPlanId(id);
    setShowEdit(true);
  };
  const searchChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const filter = allPlan.filter((element) =>
      element.name.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredData(filter);
    console.log(filter);
  }, [search, allPlan]);

  return (
    <Container>
      {/* {!showAdd && !showEdit && (
        <div style={{ textAlign: "center" }}>
          <h2>Govt Schemes</h2>
        </div>
      )} */}
      <div style={{ textAlign: "center" }}>
        <h1>User Subsription</h1>
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
          {showAdd ? <>Close</> : <>Add Plan</>}
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

      {showAdd && <AddPlan setShowAdd={setShowAdd} />}

      {showEdit && (
        <EditPlan PlanId={selectedPlanId} setShowEdit={setShowEdit} />
      )}
      {/* {!showAdd && (
        <SchemesTable rows={allSchemes} handleDelete={handleDelete} />
      )} */}

      {!showAdd && !showEdit && (
        <PlanTable  rows={filteredData} handleDelete={handleDelete} handleEdit={handleEdit} />
        // <SubscriptionTable />
      )}
    </Container>
  );
};

export default UserSubscription;
