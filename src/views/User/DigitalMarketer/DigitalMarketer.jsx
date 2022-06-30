import React, { useEffect, useState } from "react";
import Table from "../../../components/TableUsers/Table";
import { Grid, Tooltip, Chip, Switch } from "@material-ui/core";
import { useSelector } from "react-redux";
// import TransitionModal from "../../../components/TransitionModal/TransitionModal";
import { updateUser } from "../../../features/users/user.action";
import "./User.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { AiFillEye } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Assignment, AssignmentIndOutlined, Report } from "@material-ui/icons";
import { Helmet } from "react-helmet";

const DigitalMarketer = () => {
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();
  const styles = useStyles();
  const { users, loading } = useSelector((state) => state.users);
  const [value, setValue] = useState(0);
  const [digitalMarketer, setDigitalMarketer] = useState(null);

  const getUsersByStatus = (status) =>
    setDigitalMarketer(
      users.filter(
        (user) => user.role == "digitalMarketer" && user.isActive === status
      )
    );

  useEffect(() => {
    if (users) {
      if (location?.hash == "#active") {
        getUsersByStatus(true);
        setValue(1);
      } else if (location?.hash == "#inactive") {
        getUsersByStatus(false);
        setValue(2);
      } else if (location?.hash == "#all" || location?.hash == "") {
        setDigitalMarketer(
          users.filter((user) => user.role == "digitalMarketer")
        );
        setValue(0);
      }
    }
  }, [users]);

  const getAll = () => {
    setDigitalMarketer(users.filter((user) => user.role == "digitalMarketer"));
    history.push(`/digitalmarketer`);
  };

  const getAllActiveCustomers = () => {
    getUsersByStatus(true);
    history.push(`/digitalmarketer#active`);
  };

  const getAllInactiveCustomers = () => {
    getUsersByStatus(false);
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

  const handleChange = (e, id) => {
    dispatch(updateUser({ isActive: e.target.checked }, id));
  };

  const renderActionButton = (params) => {
    return (
      <Grid container xs={12} spacing={1} style={{ whiteSpace: "nowrap" }}>
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
  if (digitalMarketer && digitalMarketer.length > 0) {
    let s = 1;
    digitalMarketer.forEach((user) => {
      rows.push({
        id: s++,
        image: user?.profile_image,
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
      <Helmet title="Digital Marketers - CRM"></Helmet>
      <Table
        header={"Digital Marketer"}
        blockUser={() => {}}
        path="digitalMarketer"
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
