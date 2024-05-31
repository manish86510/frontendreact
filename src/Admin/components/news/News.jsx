import React, { useEffect, useState } from "react";
import AdminTable from "../../common/AdminTable";
import { Container, Button } from "@material-ui/core";
import AddNews from "./AddNews";
import axios from "axios";
import endpoints from "../../../api/endpoints";

const News = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allNews, setAllNews] = useState([]);

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const getAllNews = async () => {
      const response = await axios.get(endpoints.GET_ALL_NEWS, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = response.data.data;

      setAllNews(data);
      // console.log(response);
    };
    getAllNews();
  }, []);

  console.log("allnews", allNews);
  return (
    <Container>
      {/* <div style={{ textAlign: "center" }}>
        <h3>News</h3>
      </div> */}
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
          {showAdd ? <>Close</> : <>Add News</>}
        </Button>
      </div>

      {showAdd && <AddNews />}
      {!showAdd && <AdminTable rows={allNews} />}
    </Container>
  );
};

export default News;
