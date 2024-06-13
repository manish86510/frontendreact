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
import toast, { Toaster } from "react-hot-toast";

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
  currentPlanRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    border: "2px solid #4caf50", 
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#e8f5e9", 
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
    width: "150px", 
  },
  price: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  button: {
    width: "100%", 
  },
}));

const StreamingPlans = () => {
  const classes = useStyles();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState("");

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const getUserPlan = async () => {
      try {
        const response = await axios.get(endpoints.GET_BOUGHT_PLAN, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const data = response.data.plan;
        // console.log("response", data);
        setCurrentPlan(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserPlan();
  }, [accessToken]);

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

  const handleChoosePlan = async (planId) => {
    // Logic to handle choosing the plan
    try {
      const response = await axios.post(
        `${endpoints.BUY_PLAN}${planId}/`,
        {},
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "content-type": "multipart/form-data",
          },
        }
      );
      toast.success("Plan succesfully bought");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    console.log("Plan chosen:", planId);
  };

  if (loading) {
    return <CircularProgress />;
  }

  console.log(currentPlan);
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        {/* <h1 style={{ fontFamily: "Daikon-Bold", marginLeft: "1rem" }}>Plans</h1> */}
      </div>
      {plans.map((plan) => (
        <Paper
          key={plan.id}
          className={
            currentPlan && currentPlan.name == plan.name
              ? classes.currentPlanRoot
              : classes.root
          }
        >
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
          {currentPlan && currentPlan.name == plan.name ? (
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Current Plan
                </span>
              ) : (
                ""
              )}
            <Typography
              variant="h6"
              className={classes.price}
              style={{ fontFamily: "Daikon-regular" }}
            >
              {/* ₹ {plan.price}/m */}₹{plan.price}
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
