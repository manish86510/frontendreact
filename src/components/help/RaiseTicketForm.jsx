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
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import endpoints from "../../api/endpoints";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(4),
    paddingTop: "3rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  submitButton: {
    marginTop: theme.spacing(1),
    padding: "0.5rem 2rem",
    fontSize: "1rem",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  editor: {
    "& .ql-container": {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderRadius: theme.shape.borderRadius,
      "&.ql-container.ql-disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
    "& .ql-editor": {
      minHeight: "150px",
      padding: theme.spacing(2),
      fontSize: "1rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    width: "104%",
    "&.focused .ql-container": {
      borderColor: theme.palette.primary.main,
    },
  },
  editorLabel: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontWeight: "bold",
  },
  inputLabel: {
    color: theme.palette.text.secondary,
    fontWeight: "bold",
  },
  attachmentInput: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& input": {
      display: "none",
    },
  },
  attachmentLabel: {
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const RaiseTicketForm = ({ handleClose }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [editorFocused, setEditorFocused] = useState(false);

  const handleReset = () => {
    setTitle("");
    setAttachment(null);
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("access");
    if (!title || !description || !attachment) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("attachment", attachment);

    try {
      const response = await axios.post(endpoints.RAISE_TICKET, formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "content-type": "multipart/form-data",
        },
      });
      console.log("Form Data: ", response);
      // handleReset();
      setTimeout(() => {
        handleClose();
      }, 2000);

      toast.success("Ticket successfully raised");
    } catch (error) {
      console.log(error);
      toast.error("Ticket not raised!");
    }
  };

  return (
    <Container maxWidth="md">
      <Toaster position="top-right" reverseOrder={false} />
      {/* <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{ fontFamily: "Daikon-Bold", textAlign: "center", marginTop: '2rem' }}
      >
        Raise Ticket
      </Typography> */}
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              variant="outlined"
              size="small"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputLabelProps={{
                className: classes.inputLabel,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.attachmentInput}>
              <input
                accept="*/*"
                id="attachment"
                type="file"
                onChange={(e) => setAttachment(e.target.files[0])}
              />
              <label htmlFor="attachment" className={classes.attachmentLabel}>
                {attachment ? attachment.name : "Choose a file"}
              </label>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.editorLabel}>
              Description
            </Typography>
            <div
              className={`${classes.editor} ${editorFocused ? "focused" : ""}`}
              onFocus={() => setEditorFocused(true)}
              onBlur={() => setEditorFocused(false)}
            >
              <ReactQuill
                value={description}
                onFocus={() => setEditorFocused(true)}
                onBlur={() => setEditorFocused(false)}
                onChange={(value) => setDescription(value)}
              />
            </div>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
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

export default RaiseTicketForm;
