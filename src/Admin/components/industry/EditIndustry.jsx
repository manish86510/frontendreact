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
  desc: "",
};

const EditIndustry = ({ industryId, setShowEdit }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialFormdata);

  const accessToken = localStorage.getItem("access");
  console.log(accessToken);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${endpoints.get_industry}${industryId}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        const data = response.data.data;
        setFormData(data);
      } catch (error) {
        toast.error("Failed to fetch news data!");
      }
    };

    fetchEvent();
  }, [industryId, accessToken]);

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
      //   console.log(accessToken);
      const response = await axios.put(
        `${endpoints.get_industry}${industryId}/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log("Form Data: ", response);
      toast.success("Industry succesfully created");
      setTimeout(() => {
        setShowEdit(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Industry not created!");
    }

    console.log("Form Data: ", formData);
  };

  return (
    <Container maxWidth="sm">
      <Toaster position="top-right" reverseOrder={false} />
      <Typography variant="h5" component="h1" gutterBottom>
        Edit Industry
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
            <Typography variant="h6" className={classes.editorLabel}>
            Description
            </Typography>
            <ReactQuill
              value={formData.desc}
              required
              onChange={(value) => handleEditorChange("desc", value)}
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

export default EditIndustry;
