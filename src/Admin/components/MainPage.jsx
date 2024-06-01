import React from "react";
import CardX from "../common/CardX";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 80,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const MainPage = () => {
  const classes = useStyles();

  //   const data = ["News", "Events", "Government Schemes", "Total Companies"];
  const data = [
    {
      name: "News",
      url: "/admin/news",
    },
    {
      name: "Events",
      url: "/admin/event",
    },
    {
      name: "Government Schemes",
      url: "/admin/schemes",
    },
    {
      name: "Total Companies",
      url: "/admin/companies",
    },
  ];
  return (
    <Container>
      <div className={classes.root}>
        <Grid container spacing={5}>
          {data.map((data) => (
            <Grid item xs={6}>
              <Link to={data.url}>
                <Paper className={classes.paper}>
                  <CardX data={data.name} />  
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default MainPage;
