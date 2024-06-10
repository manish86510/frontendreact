import React from "react";
import { Container, Button } from "@material-ui/core";
import SubscriptionTable from "./SubscriptionTable";

const UserSubscription = () => {
  return (
    <Container>
      <div style={{ textAlign: "center", marginTop: "4px" }}>
        <h1>Subscriptions</h1>
      </div>
      <div style={{ marginTop: "3rem" }}>
        <SubscriptionTable />
      </div>
    </Container>
  );
};

export default UserSubscription;
