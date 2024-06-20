import React, { useEffect, useState } from "react";
import AdminTable from "../../common/AdminTable";
import { Container, Button } from "@material-ui/core";
import AddNews from "./AddNews";
import axios from "axios";
import endpoints from "../../../api/endpoints";
import toast, { Toaster } from "react-hot-toast";
import EditNews from "./EditNews";
import TextField from "@material-ui/core/TextField";

const News = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allNews, setAllNews] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
  }, [showAdd, showEdit]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoints.ADD_NEWS}${id}/`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setAllNews(allNews.filter((news) => news.id !== id));
      toast.success("News succesfully deleted!");
    } catch (error) {
      toast.error("News not deleted!");
    }
  };

  const handleEdit = (id) => {
    setSelectedNewsId(id);
    setShowEdit(true);
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const filter = allNews.filter((element) =>
      element.title.toLowerCase().includes(search?.toLowerCase())
    );
    setFilteredData(filter);
    console.log(filter);
  }, [search, allNews]);

  return (
    <Container>
      <Toaster position="top-right" reverseOrder={false} />
      <div style={{ textAlign: "center" }}>
        <h1>News</h1>
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
            {showAdd ? <>Close</> : <>Add News</>}
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

      {showAdd && <AddNews setShowAdd={setShowAdd} />}
      {showEdit && (
        <EditNews newsId={selectedNewsId} setShowEdit={setShowEdit} />
      )}

      {!showAdd && !showEdit && (
        <AdminTable
          rows={filteredData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </Container>
  );
};

export default News;
