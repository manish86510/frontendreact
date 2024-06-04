import React, { useEffect, useState } from "react";
import { Container, Button } from "@material-ui/core";
import CompanyTable from "./CompanyTable";
import endpoints from "../../../api/endpoints";
import axios from "axios";

const AdminCompanies = () => {
  // const [showAdd, setShowAdd] = useState(false);
  // const [allCompanies, setAllCompanies] = useState([]);

  const accessToken = localStorage.getItem("access");

  // useEffect(() => {
  //   const getAllCompanies = async () => {
  //     const response = await axios.get(endpoints.get_allCompany, {
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     });
  //     const data = response.data;

  //     setAllCompanies(data);
  //     // console.log(response);
  //   };
  //   getAllCompanies();
  // }, []);
  // console.log("a", allCompanies);

  return (
    <Container>
      {/* <div
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
      </div> */}

      {/* {showAdd && <AddSchemes setShowAdd={setShowAdd} />} */}
      {/* {!showAdd && <AdminTable rows={allNews} />} */}
      {/* {!showAdd && <CompanyTable rows={allCompanies} />} */}
      <div style={{textAlign: "center", marginTop:"4px"}}>
       <h1>Companies</h1>
      </div>
      <div style={{marginTop:"3rem"}}>
        <CompanyTable />
      </div>
    </Container>
  );
};

export default AdminCompanies;
