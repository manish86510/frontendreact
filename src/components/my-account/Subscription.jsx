import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Paper,
  makeStyles,
  CircularProgress,
  Button,
} from "@material-ui/core";
import endpoints from "../../api/endpoints";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    border: "1px solid #ddd",
    borderRadius: theme.shape.borderRadius,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  priceButtonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "150px", // Fixed width for the price and button container
  },
  price: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  button: {
    width: "100%", // Button takes the full width of the container
  },
}));

const StreamingPlans = () => {
  const classes = useStyles();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    axios
      .get(endpoints.GET_PLAN, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setPlans(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the plans", error);
        setLoading(false);
      });
  }, []);

  const handleChoosePlan = (planId) => {
    // Logic to handle choosing the plan
    console.log("Plan chosen:", planId);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <div>
        {/* <h1 style={{ fontFamily: "Daikon-Bold", marginLeft: "1rem" }}>Plans</h1> */}
      </div>
      {plans.map((plan) => (
        <Paper key={plan.id} className={classes.root}>
          <Box className={classes.details}>
            <Typography variant="h6" style={{ fontFamily: "Daikon-regular" }}>
              {plan.name}
            </Typography>
            <Typography variant="body1">
              <b style={{ fontFamily: "Daikon-regular" }}>{plan.tenure}</b>
            </Typography>
            <Typography
              variant="body2"
              style={{ fontFamily: "Daikon-regular" }}
              dangerouslySetInnerHTML={{ __html: plan.description }}
            />
          </Box>
          <Box className={classes.priceButtonContainer}>
            <Typography
              variant="h6"
              className={classes.price}
              style={{ fontFamily: "Daikon-regular"}}
            >
              {/* ₹ {plan.price}/m */}
              ₹{plan.price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              style={{ fontFamily: "Daikon-regular" }}
              onClick={() => handleChoosePlan(plan.id)}
            >
              Choose Plan
            </Button>
          </Box>
        </Paper>
      ))}
    </div>
  );
};

export default StreamingPlans;
