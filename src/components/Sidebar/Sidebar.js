import React from "react";
import "./Sidebar.css";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import logo from "../../assets/img/logo.svg";
import ListCustomItem from "./ListCustomItem";
import data from "./data";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.2em",
    },
    "*::-webkit-scrollbar-track:vertical": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb:vertical": {
      backgroundColor: "#1F1D61",
      outline: "1px solid slategrey",
      borderRadius: 0,
    },
  },
  root: {
    display: "flex",
  },
  icon: {
    color: "white",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerColor: {
    backgroundColor: "white",
    color: "#604339",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "white",
    color: "#1F1D61",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "#604339",
  },
}));

const Sidebar = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { userRole, userId } = useSelector((state) => state.auth);
  const list = data.getList(userId, userRole);
  const drawer = (
    <div>
      <List>
        <Link to="/dashboard" style={{ textDecorationLine: "none" }}>
          <div className="header">
            <ListItemIcon className="sidebar__header">
              <div style={{ width: "400px" }}>
                <img
                  src="/assets/images/beton.jpeg"
                  alt="logo"
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </div>
            </ListItemIcon>
          </div>
        </Link>
      </List>

      <List style={{ marginTop: 50 }}>
        {list && list.map((item, i) => <ListCustomItem key={i} item={item} />)}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;
