import { Route, Switch, BrowserRouter } from "react-router-dom";
import { routes } from "./routing/SimpleRoute";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar/Sidebar";
import { DigitalMarketer, SalesRep, TeamLead } from "./views/User";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import TeamLeadForm from "./views/User/TeamLead/TeamLeadForm";
import TeamLeadAdd from "./views/User/TeamLead/TeamLeadAddForm";
import TeamLeadEdit from "./views/User/TeamLead/TeamLeadEditForm";
import DigitalMarketerAdd from "./views/User/DigitalMarketer/DigitalMarketerAddForm";
import DigitalMarketerEdit from "./views/User/DigitalMarketer/DigitalMarketerEditForm";
import SalesRepAdd from "./views/User/SalesRep/SalesRepAddForm";
import SalesRepEdit from "./views/User/SalesRep/SalesRepEditForm";
import Report from "./views/Report/Report";
import Leads from "./views/Leads/Leads";
import LeadsAdd from "./views/Leads/LeadsAddForm";
import LeadsEdit from "./views/Leads/LeadsEditForm";
import Clients from "./views/Clients/Clients";
import ClientsAdd from "./views/Clients/ClientsAddForm";
import ClientEdit from "./views/Clients/ClientsEditForm";
// import Projects from "./views/Projects/Projects";
import ProjectsAdd from "./views/Projects/ProjectAddForm";
import ProjectsEdit from "./views/Projects/ProjectEditForm";
import UnitAdd from "./views/Projects/Unit/UnitAddForm";
import UnitEdit from "./views/Projects/Unit/UnitEditForm";
import { Todos } from "./views/Leads";

function Routes() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { authenticated } = useSelector((state) => state.auth);
  //   const authenticated = true;

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
              {/* Digital Marketer */}
              <Route
                exact
                path="/digitalmarketer"
                component={DigitalMarketer}
              />
              <Route exact path="/digitalmarketer/add" component={DigitalMarketerAdd} />
              <Route exact path="/digitalmarketer/edit/:id" component={DigitalMarketerEdit} />

              {/* Sales Rep */}
              <Route exact path="/salesrep" component={SalesRep} />
              <Route exact path="/salesrep/add" component={SalesRepAdd} />
              <Route exact path="/salesrep/edit/:id" component={SalesRepEdit} />

              {/* Team Lead */}
              <Route exact path="/teamlead" component={TeamLead} />
              <Route exact path="/teamlead/edit/:id" component={TeamLeadEdit} />
              <Route exact path="/teamlead/add" component={TeamLeadAdd} />
  
              {/* Clients */}
              <Route exact path="/clients" component={Clients} />
              <Route exact path="/clients/add" component={ClientsAdd} />
              <Route exact path="/client/edit/:id" component={ClientEdit} />

              {/* Reports */}
              <Route exact path="/reports" component={Report} />
              
              {/* Leads */}
              <Route exact path="/leads" component={Leads} />
              <Route exact path="/leads/add" component={LeadsAdd} />
              <Route exact path="/leads/edit/:id" component={LeadsEdit} />

              {/* Projects & Units */}
              {/* <Route exact path="/projects" component={Proejcts} /> */}
              <Route exact path="/projects/add" component={ProjectsAdd} />
              <Route exact path="/projects/edit/:id" component={ProjectsEdit} />
              <Route exact path="/unit/add" component={UnitAdd} />
              <Route exact path="/unit/edit/:id" component={UnitEdit} />

              {/* Todos */}
              <Route exact path="/todos" component={Todos} />
  
              {/* <Route exact path="/user/add" component={UserForm} />
              <Route exact path="/user/edit/:id" component={UserForm} />
              <Route exact path="/reports/:id" component={Report} /> */}
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
