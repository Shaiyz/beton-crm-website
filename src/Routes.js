import { Route, Switch, BrowserRouter } from "react-router-dom";
import { routes } from "./routing/SimpleRoute";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar/Sidebar";
import { DigitalMarketer, SalesRep, TeamLead } from "./views/User";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import TeamLeadAdd from "./views/User/TeamLead/TeamLeadAddForm";
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
import ProjectsAdd from "./views/Projects/ProjectAddForm";
import ProjectsEdit from "./views/Projects/ProjectEditForm";
import UnitAdd from "./views/Projects/Unit/UnitAddForm";
import UnitEdit from "./views/Projects/Unit/UnitEditForm";
import { TasksAddForm, Todos } from "./views/Leads";
import { getAllUsers } from "./features/users/user.action";
import { useDispatch } from "react-redux";
import { Profile } from "./views/User/Profile";
import ChangePassword from "./views/Auth/Changepassword";
import Project from "./views/Projects/Project";
import Units from "./views/Projects/Unit/Unit";
import { getAllTasks } from "./features/tasks/tasks.action";
import TeamLeadEdit from "./views/User/TeamLead/TeamLeadEditForm";
import MyLeads from "./views/Leads/MyLeads";
import TodosEditForm from "./views/Leads/Todos/TodosEditForm";
import { getAllProjects } from "./features/projects/projects.action";
import { getAllClients } from "./features/client/client.action";
import { getAllUnits } from "./features/units/units.action";
import { getAllLeads, getMyLeads } from "./features/leads/leads.action";
import LeadTasks from "./views/Leads/LeadTasks";
import { Calls } from "./views/Calls";

function Routes() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { authenticated, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authenticated) {
      if (userInfo.role != "salesRep") {
        dispatch(getAllUsers());
        dispatch(getAllLeads());
        dispatch(getAllProjects());
      }
      dispatch(getAllTasks());
      dispatch(getMyLeads());
      dispatch(getAllClients());
      dispatch(getAllUnits());
    }
  }, [authenticated]);

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

              <Route exact path="/user/:id" component={Profile} />
              <Route exact path="/profile" component={Profile} />

              <Route exact path="/changepassword" component={ChangePassword} />
              <Route
                exact
                path="/changepassword/:id"
                component={ChangePassword}
              />

              <Route
                exact
                path="/digitalMarketer/add"
                component={DigitalMarketerAdd}
              />
              <Route
                exact
                path="/digitalMarketer/edit/:id"
                component={DigitalMarketerEdit}
              />

              <Route exact path="/salesrep" component={SalesRep} />
              <Route exact path="/salesRep/add" component={SalesRepAdd} />
              <Route exact path="/salesRep/edit/:id" component={SalesRepEdit} />

              {/* Team Lead */}
              <Route exact path="/teamlead" component={TeamLead} />
              <Route exact path="/teamLead/edit/:id" component={TeamLeadEdit} />
              <Route exact path="/teamLead/add" component={TeamLeadAdd} />

              <Route exact path="/clients" component={Clients} />
              <Route exact path="/clients/add" component={ClientsAdd} />
              <Route exact path="/client/edit/:id" component={ClientEdit} />

              {/* Leads */}
              <Route exact path="/leads" component={Leads} />
              <Route exact path="/myleads" component={MyLeads} />

              <Route exact path="/leads/add" component={LeadsAdd} />
              <Route exact path="/leads/edit/:id" component={LeadsEdit} />
              <Route exact path="/lead/todos/:leadId" component={LeadTasks} />

              {/* Projects & Units */}
              <Route exact path="/projects" component={Project} />
              <Route exact path="/units" component={Units} />

              <Route exact path="/project/add" component={ProjectsAdd} />
              <Route exact path="/project/edit/:id" component={ProjectsEdit} />
              <Route exact path="/unit/add/:projectId" component={UnitAdd} />
              <Route exact path="/unit/edit/:id" component={UnitEdit} />

              {/* Todos */}
              <Route exact path="/todos" component={Todos} />
              <Route exact path="/todo/add/:id" component={TasksAddForm} />
              <Route exact path="/todo/edit/:id" component={TodosEditForm} />
              {/* Reports */}
              <Route exact path="/reports" component={Report} />
              <Route exact path="/reports/:id" component={Report} />

              {/* Calls */}
              <Route exact path="/calls" component={Calls} />
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
