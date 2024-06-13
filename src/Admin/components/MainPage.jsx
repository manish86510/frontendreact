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
      desc: "Drive engagement with dynamic content. This card allows admins to add and manage news articles, keeping users informed and engaged with timely updates and stories.",
      url: "/admin/news",
    },
    {
      name: "Events",
      desc: "Foster community interaction. Admins can use this card to add and organize events and participation by providing users with opportunities to attend or participate in relevant gatherings.",
      url: "/admin/event",
    },
    {
      name: "Government Schemes",
      desc: "Empower users with valuable resources. Admins can utilize this card to add information about government schemes and initiatives, empowering users with access to  opportunities that can benefit them.",
      url: "/admin/schemes",
    },
    {
      name: "Companies",
      desc: "Track platform growth and impact. This card provides admins with insights into the total number of companies registered or affiliated with the platform, serving as a measure of platform growth and impact over time.",
      url: "/admin/companies",
    },
    {
      name: "User Subscription",
      desc: " Manage and review subscription details. This tab provides a comprehensive list of users who have purchased subscriptions, allowing admins to oversee subscription status, monitor user engagement, and manage subscription-related activities effectively.",
      url: "/admin/subscription",
    },
    {
      name: "Industry",
      desc: " Manage and review industry details. This tab provides a comprehensive list of users who have purchased subscriptions, allowing admins to oversee subscription status, monitor user engagement, and manage subscription-related activities effectively.",
      url: "/admin/industry",
    },
    {
      name: "Tickets",
      desc: "Manage and review Tickets. This tab provides a comprehensive list of tickets of user queries who have purchased subscriptions, allowing admins to oversee ticket status and help users effectively.",
      url: "/admin/tickets",
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
                  <CardX data={data} />
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
