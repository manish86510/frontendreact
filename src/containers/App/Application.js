import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import {
  textarea,
  // Customers, CustomerTab,
  // Orders, ScheduleOrder, FullfillOrder, DeliverdOrder, PartialDelivered, CashCollected, OrderCreate, OrderDetailContainer,
  // Delivery, DeliveryTab, RosterManage, NewDeliveryAgent, FullfilManage,
  } from '../components';
import Login from './components/forms/Login';

  


class Application extends React.Component {
  render() {
    return (
      <Dashboard history={this.props.history}>
        <Switch>
          { /* Layout */ }
          <Route exact path="/app" component={DashboardV2} />
          <Route exact path="/app/dashboard-v2" component={DashboardV2} />

          <Route exact path="/login" component={Login} />


        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;

