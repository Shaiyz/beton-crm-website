import React from "react";
// @material-ui/icons
import { Person } from "@material-ui/icons";
import {
  IconButton,
  Menu,
  Button,
  AppBar,
  Toolbar,
  Grid,
} from "@material-ui/core";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/auth.action";
import TransitionModal from "../../components/TransitionModal/TransitionModal";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  icon: {
    color: "rgba(0,0,0,0.77)",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "white",
    color: "rgba(0,0,0,0.77)",
    fontWeight: "bold",
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setopenModal] = React.useState(false);
  const { userInfo, userRole, userId } = useSelector((state) => state.auth);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const logoutUser = (event) => {
    dispatch(logout(userId));
    props.history.push("/");
  };
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className="navbar__items">
          <h1 className="navbar__left" style={{ textTransform: "capitalize" }}>
            {userRole && userRole.replace(/_/g, "")} Panel
          </h1>
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Person className={classes.icon} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <MenuItem>{userInfo && userInfo.email}</MenuItem> */}
              <MenuItem>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/changepassword" style={{ textDecoration: "none" }}>
                  Change Password
                </Link>
              </MenuItem>

              <MenuItem onClick={() => setopenModal(true)}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
      <TransitionModal
        open={openModal}
        handleClose={() => setopenModal(false)}
        handleOpen={() => setopenModal(true)}
        style={{ width: 200 }}
      >
        <Grid item xs={12} sm={12}>
          <p style={{ fontWeight: "bold" }}>
            Are you sure you want to logout ?
          </p>
        </Grid>
        <Grid item xs={12} sm={12} align="center" style={{ marginTop: 10 }}>
          <Button
            style={{ marginRight: 10 }}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => logoutUser()}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setopenModal(false)}
          >
            Cancel
          </Button>
        </Grid>
      </TransitionModal>
    </AppBar>
  );
};

export default Navbar;
