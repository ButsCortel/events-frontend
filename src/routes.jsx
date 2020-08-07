import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import EventsPage from "./pages/eventsPage";
import MyRegistrations from "./pages/myRegistrations/index.jsx";
import TopNav from "./components/TopNav";

export default function Routes() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/myregistrations" exact component={MyRegistrations} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/events" component={EventsPage} />
      </Switch>
    </BrowserRouter>
  );
}
