import React, { useEffect, useState } from "react";
import Table from "../../../components/TableUsers/Table";
import { Grid, Tooltip, Chip, Switch } from "@material-ui/core";
import { useSelector } from "react-redux";
import "../User.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { AiFillEye } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";
import { updateUser } from "../../../features/users/user.action";
import { useDispatch } from "react-redux";
import { AssignmentIndOutlined } from "@material-ui/icons";
import { Helmet } from "react-helmet";
const SalesRep = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  const styles = useStyles();
  const { users, loading } = useSelector((state) => state.users);
  const [value, setValue] = useState(0);
  const [salesRep, setSalesRep] = useState(null);

  useEffect(() => {
    if (users) {
      if (location?.hash == "#active") {
        setSalesRep(
          users.filter(
            (user) => user.role == "salesRep" && user.isActive === true
          )
        );
        setValue(1);
      } else if (location?.hash == "#inactive") {
        setSalesRep(
          users.filter(
            (user) => user.role == "salesRep" && user.isActive === false
          )
        );
        setValue(2);
      } else if (location?.hash == "#all" || location?.hash == "") {
        const data = users.filter((user) => user.role == "salesRep");
        setSalesRep(data);
        setValue(0);
      }
    }
  }, [users]);

  const getAll = () => {
    setSalesRep(users.filter((user) => user.role == "salesRep"));
    history.push(`/salesRep#all`);
  };

  const getAllActiveUsers = () => {
    setSalesRep(
      users.filter((user) => user.role == "salesRep" && user.isActive === true)
    );
    history.push(`/salesRep#active`);
  };

  const getAllInactiveUsers = () => {
    setSalesRep(
      users.filter((user) => user.role == "salesRep" && user.isActive === false)
    );
    history.push(`/salesRep#inactive`);
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

  const handleChange = (e, id) => {
    dispatch(updateUser({ isActive: e.target.checked }, id));
  };

  const renderActionButton = (params) => {
    return (
      <Grid container xs={12} spacing={1}>
        <Grid item lg={4}>
          <Tooltip title="View Details">
            <IconButton style={{ padding: 2 }}>
              <Link to={`/user/${params.action._id}`}>
                <AiFillEye
                  size={25}
                  style={{
                    padding: 2,
                    border: "1px solid #8F1D61",
                    borderRadius: 8,
                    backgroundColor: "white",
                    color: "#1F1D61",
                  }}
                />
              </Link>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item lg={4}>
          <Tooltip title="View Report">
            <IconButton style={{ padding: 2 }}>
              <Link to={`/report/${params.action._id}`}>
                <AssignmentIndOutlined
                  size={25}
                  style={{
                    padding: 2,
                    border: "1px solid #8F1D61",
                    borderRadius: 8,
                    backgroundColor: "white",
                    color: "#1F1D61",
                  }}
                />
              </Link>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item lg={4}>
          <Switch
            checked={params.action.isActive}
            onChange={(e) => handleChange(e, params.action._id)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
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

    {
      field: "action",
      title: "Action",
      render: renderActionButton,
      width: "200px",
    },
  ];

  let rows = [];
  if (salesRep && salesRep.length > 0) {
    let s = 1;
    salesRep.forEach((user) => {
      rows.push({
        id: s++,
        fullName: user.first_name + " " + user.last_name,
        mobileNumber: user?.phone,
        status: user.isActive ? "Active" : "Inactive",
        action: user,
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
      <Helmet title="Sales Representatives - CRM"></Helmet>

      <Table
        header={"Sales Representatives"}
        blockUser={() => {}}
        path="salesRep"
        label1="Active"
        label2="Inactive"
        loading={loading}
        columns={columns}
        rows={rows}
        value={value}
        setValue={setValue}
        getAll={getAll}
        getAllInactive={getAllInactiveUsers}
        getAllActive={getAllActiveUsers}
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
export default SalesRep;
