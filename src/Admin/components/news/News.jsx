import React, { useEffect, useState } from "react";
import AdminTable from "../../common/AdminTable";
import { Container, Button } from "@material-ui/core";
import AddNews from "./AddNews";
import axios from "axios";
import endpoints from "../../../api/endpoints";
import toast, { Toaster } from "react-hot-toast";
import EditNews from "./EditNews";

const News = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [allNews, setAllNews] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);

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
  }, [showAdd]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoints.DELETE_NEWS}/${id}/`, {
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

  console.log("allnews", allNews);
  return (
    <Container>
      <Toaster position="top-right" reverseOrder={false} />
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

      {showAdd && <AddNews setShowAdd={setShowAdd} />}
      {showEdit && (
        <EditNews newsId={selectedNewsId} setShowEdit={setShowEdit} />
      )}
     
      {!showAdd && !showEdit && (
        <AdminTable
          rows={allNews}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </Container>
  );
};

export default News;
