import React, { useEffect, useState } from "react";
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
  name: "",
  price: "",
  tenure: "",
  description: "",
};

const EditScheme = ({ planId, setShowEdit }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialFormdata);

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${endpoints.GET_PLAN}${planId}`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const data = response.data.data;
        console.log("Fetched Data: ", data); // Debugging log

        setFormData({
          name: data.name || "",
          price: data.price || "",
          tenure: data.tenure || "",
          description: data.description || "",
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast.error("Failed to fetch scheme data!");
      }
    };

    fetchEvent();
  }, [planId, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditorChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${endpoints.GET_PLAN}${planId}/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form Data: ", response);
      toast.success("Scheme successfully updated");
      setTimeout(() => {
        setShowEdit(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating scheme: ", error);
      toast.error("Scheme not updated!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Toaster position="top-right" reverseOrder={false} />
      <Typography variant="h5" component="h1" gutterBottom>
        Edit Scheme
      </Typography>
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              required
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              required
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tenure"
              type="text"
              name="tenure"
              fullWidth
              required
              value={formData.tenure}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.editorLabel}>
              Description
            </Typography>
            <ReactQuill
              value={formData.description}
              required
              onChange={handleEditorChange}
              className={classes.editor}
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

export default EditScheme;
