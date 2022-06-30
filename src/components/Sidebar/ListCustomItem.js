import React from "react";
import MuiListItem from "@material-ui/core/ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  makeStyles,
  withStyles,
  List,
  ListItemIcon,
  Typography,
  ListItem,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { useLocation, Link } from "react-router-dom";

const CustomListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#1F1D61",
      color: "#1F1D61",
      "& .MuiListItemIcon-root": {
        color: "#1F1D61",
      },
      "& .MuiListItem-root": {
        color: "#1F1D61",
      },
    },
    "&$selected:hover": {
      backgroundColor: "#1F1D61",
      color: "#1F1D61",
      "& .MuiListItemIcon-root": {
        color: "#1F1D61",
      },
    },
    "&:hover": {
      backgroundColor: "#1F1D61",
      color: "white",
      "& .link": {
        color: "white",
      },
      "& .MuiListItemIcon-root": {
        color: "white",
      },
      "& .MuiListItemText-root": {
        color: "white",
      },
    },
  },
})(MuiListItem);
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  icon: {
    color: "#1F1D61",
    fontSize: 24,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerColor: {
    backgroundColor: "#1F1D61",
    color: "white",
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
    backgroundColor: "#1F1D61",
    color: "#604339",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "#1F1D61",
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },
  nestedList: {
    color: "#1F1D61",
    letterSpacing: "0.00938em",
    cursor: "pointer",

    marginLeft: 56,
    "&:hover": {
      color: "#1F1D61",
    },
    fontFamily: "Roboto, sans-serif",
  },
  mainnestedList: {
    "&:hover": {
      backgroundColor: "white",
      cursor: "pointer",
    },
  },
  activenestedList: {
    color: "#1F1D61",
    letterSpacing: "0.00938em",
    marginLeft: 58,
    fontFamily: "Roboto, sans-serif",
    cursor: "pointer",
  },
}));
const ListCustomItem = ({ provided, snapshot, item }) => {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  // const { newNotificationLength, loading } = useSelector(
  //   (state) => state.notifications
  // );

  const url = location && location.pathname.split("/");
  const active_url = url && url[1];
  return (
    <>
      {item.list ? (
        <>
          <CustomListItem key={item.title} onClick={handleClick}>
            <ListItemIcon className={classes.icon}>
              <FontAwesomeIcon icon={item.icon} />
            </ListItemIcon>
            <ListItemText style={{ fontSize: 10 }} primary={item.title} />
            {open ? (
              <ExpandLess className={classes.icon} />
            ) : (
              <ExpandMore className={classes.icon} />
            )}
          </CustomListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.list.map((res) => {
                return (
                  <Link to={`/${res.url}`} className={classes.link}>
                    <ListItem
                      button
                      className={classes.mainnestedList}
                      key={res.title}
                    >
                      <ListItemText
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        <Typography
                          className={
                            active_url == res.url
                              ? classes.activenestedList
                              : classes.nestedList
                          }
                        >
                          {res.title}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </Collapse>
        </>
      ) : (
        <Link to={`/${item.url}`} className={classes.link}>
          <CustomListItem button className="list" key={item.title}>
            <ListItemIcon className={classes.icon}>
              {/* {item.title == "Notifications" &&
              newNotificationLength > 0 &&
              !loading ? (
                <Badge badgeContent={newNotificationLength} color="secondary">
                  <FontAwesomeIcon icon={item.icon} />
                </Badge>
              ) : (
                <FontAwesomeIcon icon={item.icon} />
              )} */}
              <FontAwesomeIcon icon={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </CustomListItem>
        </Link>
      )}
    </>
    // </li>
  );
};

export default ListCustomItem;
