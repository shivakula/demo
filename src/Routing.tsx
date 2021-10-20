import React from "react";
import { Switch, Route } from "react-router-dom";

import CampaignsPage from "./pages/Campaigns/Campaigns";
import ContactsPage from "./pages/Contacts/Contacts";
import InsightsPage from "./pages/Insights/Insights";
import TemplatesPage from "./pages/Templates/Templates";
import FeatureRequestsPage from "./pages/FeatureRequests/FeatureRequests";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ToolsPage from "./pages/Tools/Tools";
import { Hidden } from "@mui/material";
const Routing = () => {
  return (
    <>
      <Hidden smDown={true}> <NavigationBar /></Hidden>
      <Switch>
        
        <Route exact path="/campaigns" component={CampaignsPage} />
        <Route exact path="/contacts" component={ContactsPage} />
        <Route exact path="/tools" component={ToolsPage} />
        <Route exact path="/featurerequests" component={FeatureRequestsPage} />
        <Route exact path="/templates" component={TemplatesPage} />
        <Route exact path="/insights" component={InsightsPage} />


      </Switch>
    </>
  );
};
export default Routing;
