import React, { useState } from "react";
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
import endpoints from "../../../api/endpoints";
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

const initialFormdata = {
  launched_date: "",
  name: "",
  url: "",
  short_desc: "",
  long_desc: "",
  banner: null,
};

const AddSchemes = ({ setShowAdd }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialFormdata);

  const accessToken = localStorage.getItem("access");
  console.log(accessToken);

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
      console.log(accessToken);
      const response = await axios.post(endpoints.ADD_SCHEMES, formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "content-type": "multipart/form-data",
        },
      });
      console.log("Form Data: ", response);
      toast.success("Scheme succesfully created");
      setTimeout(() => {
        setShowAdd(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Scheme not created!");
    }

    console.log("Form Data: ", formData);
  };

  return (
    <Container maxWidth="sm">
      <Toaster position="top-right" reverseOrder={false} />
      <Typography variant="h4" component="h1" gutterBottom>
        Add Schemes
      </Typography>
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Launch Date"
              type="date"
              name="launched_date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Url"
              name="url"
              fullWidth
              value={formData.author}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" className={classes.editorLabel}>
              Short Description
            </Typography>
            <ReactQuill
              value={formData.short_desc}
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

export default AddSchemes;
