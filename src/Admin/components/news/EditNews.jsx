import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import endpoints, { base_uri } from "../../../api/endpoints";
import toast, { Toaster } from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(4),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  editor: {
    "& .ql-container": {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderRadius: theme.shape.borderRadius,
      "&:hover": {
        borderColor: theme.palette.text.primary,
      },
      "&.ql-container.ql-disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
    "& .ql-editor": {
      minHeight: "100px",
      padding: theme.spacing(1),
      fontSize: "1rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
  editorLabel: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const EditNews = ({ newsId, setShowEdit }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    date: "",
    author: "",
    source: "",
    title: "",
    short_desc: "",
    long_desc: "",
    banner: null,
  });

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${endpoints.GET_ALL_NEWS}${newsId}`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const data = response.data.data;
        setFormData(data);
      } catch (error) {
        toast.error("Failed to fetch news data!");
      }
    };

    fetchNews();
  }, [newsId, accessToken]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleEditorChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${endpoints.GET_ALL_NEWS}${newsId}/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log("Form Data: ", response);
      toast.success("News successfully updated!");
      setTimeout(() => {
        setShowEdit(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("News not updated!");
    }

    console.log("Form Data: ", formData);
  };

  console.log("f", formData);

  return (
    <Container maxWidth="sm">
      <Toaster position="top-right" reverseOrder={false} />
      <Typography variant="h5" component="h1" gutterBottom>
        Edit News
      </Typography>
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="date"
              name="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author"
              name="author"
              fullWidth
              value={formData.author}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Source"
              name="source"
              fullWidth
              value={formData.source}
              required
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" className={classes.editorLabel}>
              Short Description
            </Typography>
            <ReactQuill
              value={formData.short_desc}
              required
              onChange={(value) => handleEditorChange("short_desc", value)}
              className={classes.editor}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.editorLabel}>
              Long Description
            </Typography>
            <ReactQuill
              value={formData.long_desc}
              required
              onChange={(value) => handleEditorChange("long_desc", value)}
              className={classes.editor}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Banner"
              name="banner"
              type="file"
              fullWidth
              required
              // value={formData.banner}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditNews;
