import React, { useEffect, useState } from "react";
import Table from "../../../components/TableUsers/Table";
import {
  getUsersByStatus,
  getUsersByRole,
  updateUser,
} from "../../../features/users/user.action";
import { Grid, TextField, Button, Tooltip, Chip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import TransitionModal from "../../../components/TransitionModal/TransitionModal";
import "./User.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { AiFillEye } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";

const DigitalMarketer = () => {
  let dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  const styles = useStyles();
  const { users, loading } = useSelector((state) => state.users);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!users) {
      if (location?.hash == "#active") {
        dispatch(getUsersByStatus("digitalMarketer", true));
        setValue(1);
      } else if (location?.hash == "#inactive") {
        dispatch(getUsersByStatus("digitalMarketer", false));
        setValue(2);
      } else if (location?.hash == "#all" || location?.hash == "") {
        dispatch(getUsersByRole("digitalMarketer"));
        setValue(0);
      }
    }
  }, []);

  const getAll = () => {
    // dispatch(getUsersByRole("digitalMarketer"));
    history.push(`/digitalmarketer`);
  };

  const getAllActiveCustomers = () => {
    // dispatch(getUsersByStatus("digitalMarketer", true));
    history.push(`/digitalmarketer#active`);
  };

  const getAllInactiveCustomers = () => {
    // dispatch(getUsersByStatus("digitalMarketer", false));
    history.push(`/digitalmarketer#inactive`);
  };

  const renderStatusButton = (params) => {
    return (
      <Chip
        variant="contained"
        className={
          params.status == "Active"
            ? styles.statusActive
            : styles.statusInActive
        }
        size="small"
        label={params.status}
      />
    );
  };

  const renderActionButton = (params) => {
    return (
      <Grid item xs={12}>
        <Tooltip title="View Details">
          <IconButton style={{ padding: 2 }}>
            <Link to={`/user/${params.action}`}>
              <AiFillEye
                size={25}
                style={{
                  padding: 2,
                  border: "1px solid #1F1D61",
                  borderRadius: 8,
                  backgroundColor: "white",
                  color: "#1F1D61",
                }}
              />
            </Link>
          </IconButton>
        </Tooltip>
      </Grid>
    );
  };
  const columns = [
    { field: "id", title: "S#" },
    {
      field: "fullName",
      title: "Full name",
    },
    {
      field: "mobileNumber",
      title: "Mobile",
    },

    {
      field: "status",
      title: "Status",
      render: renderStatusButton,
    },
    {
      field: "createdAt",
      title: "Date Created",
    },
    {
      field: "updatedAt",
      title: "Date Updated",
    },

    // {
    //   field: "action",
    //   title: "Action",
    //   render: renderActionButton,
    // },
  ];

  let rows = [];
  if (users && users.length > 0) {
    let s = 1;
    users.forEach((user) => {
      rows.push({
        id: s++,
        image: user?.profile_image,
        fullName: user.first_name + " " + user.last_name,
        mobileNumber: user?.phone,
        status: user.isActive ? "Active" : "Inactive",
        // action: user._id,
        createdAt: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "-",
        updatedAt: user.updatedAt
          ? new Date(user.updatedAt).toLocaleDateString()
          : "-",
      });
    });
  }
  return (
    <div className="users">
      <Table
        header={"Digital Marketer"}
        blockUser={() => {}}
        path="digitalmarketer"
        label1="Active"
        label2="Inactive"
        loading={loading}
        columns={columns}
        rows={rows}
        value={value}
        setValue={setValue}
        getAll={getAll}
        getAllInactive={getAllInactiveCustomers}
        getAllActive={getAllActiveCustomers}
      />
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  statusActive: {
    backgroundColor: "white",
    border: "1px solid #2eb85c",
    color: "#2eb85c",
    fontWeight: "bold",
  },
  statusInActive: {
    backgroundColor: "white",
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#1F1D61",
    color: "white",
    border: "1px solid white",
    textTransform: "initial",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1F1D61",
    },
  },
  tabs: {
    marginBottom: "2px",
  },
  tab: {
    fontSize: "12px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default DigitalMarketer;
