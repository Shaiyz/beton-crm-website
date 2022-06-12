// import React from "react";
// import { Link } from "react-router-dom";
// import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   icon: {
//     color: "white",
//   },
//   drawer: {
//     [theme.breakpoints.up("sm")]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   drawerColor: {
//     backgroundColor: "black",
//     color: "white",
//   },
//   appBar: {
//     [theme.breakpoints.up("sm")]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: drawerWidth,
//     },
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//     backgroundColor: "black",
//     color: "white",
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   link: {
//     textDecoration: "none",
//     color: "white",
//   },
// }));

// export default function ListItem({
//   getClassName,
//   handleClick,
//   url,
//   title,
//   icon,
// }) {
//   return (
//     <li className={getClassName}>
//       <Link to={url} onClick={handleClick}>
//         <i className={`${icon}`} /> {title}
//       </Link>
//     </li>
//   );
// }
