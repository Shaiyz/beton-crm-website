import { Route, Switch, BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { routes } from "./routing/SimpleRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import TeamLeadForm from "./views/User/TeamLead/TeamLeadForm";
import { DigitalMarketer, SalesRep, TeamLead } from "./views/User";
import Navbar from "./components/Navbar/Navbar";
import { useSelector } from "react-redux";
import Report from "./views/Report/Report";
import Leads from "./views/Leads/Leads";
import Clients from "./views/Clients/Clients";
import { Todos } from "./views/Leads";
import { getAllUsers } from "./features/users/user.action";
import { useDispatch } from "react-redux";
import { Profile } from "./views/User/Profile";

function Routes() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { authenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //   const authenticated = true;
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const protectedRoutes = () => {
    return (
      <>
        <div style={{ display: "flex" }}>
          {authenticated && (
            <Sidebar
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          )}
          <div style={{ width: "100%" }}>
            {authenticated && (
              <>
                <Navbar handleDrawerToggle={handleDrawerToggle} />
                <div style={{ marginTop: "120px" }}></div>
              </>
            )}

            <Switch>
              <Route
                exact
                path="/digitalmarketer"
                component={DigitalMarketer}
              />
              <Route exact path="/teamlead" component={TeamLead} />
              <Route exact path="/salesrep" component={SalesRep} />
              <Route exact path="/teamlead/edit/:id" component={TeamLeadForm} />
              {/* <Route exact path="/user/add" component={UserForm} />
              <Route exact path="/user/edit/:id" component={UserForm} /> */}
              <Route exact path="/user/:id" component={Profile} />
              <Route exact path="/profile" component={Profile} />
              {/* 
              <Route exact path="/lead/add" component={LeadForm} />
              <Route exact path="/lead/edit/:id" component={LeadForm} />

              <Route exact path="/clients/add" component={ClientForm} />
              <Route exact path="/client/edit/:id" component={ClientForm} />

              <Route exact path="/reports/:id" component={Report} /> */}
              <Route exact path="/clients" component={Clients} />
              <Route exact path="/leads" component={Leads} />
              <Route exact path="/reports" component={Report} />
              <Route exact path="/todos" component={Todos} />
            </Switch>
          </div>
        </div>
      </>
    );
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <BrowserRouter>
      {authenticated ? protectedRoutes() : routes()}
    </BrowserRouter>
  );
}

export default Routes;
