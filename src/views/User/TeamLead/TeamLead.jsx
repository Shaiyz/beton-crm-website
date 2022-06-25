import React, { useEffect } from "react";
import SearchTable from "../../../components/SearchTable/SearchTable";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { ChangeHistory } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import "./Admin.css";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../../features/users/user.action";

const TeamLead = ({}) => {
  let dispatch = useDispatch();
  const [teamLeads, setTeamLeads] = React.useState(null);
  const { users, loading } = useSelector((state) => state.users);
  useEffect(() => {
    if (!users) {
      dispatch(getAllUsers());
    } else {
      setTeamLeads(users.filter((user) => user.role === "teamLead"));
    }
  }, [users]);

  const renderEditButton = (params) => {
    return (
      <Tooltip title="Edit Lead">
        <Link to={`/admin/edit/${params.edit}`}>
          <EditIcon
            className="action-buttons"
            color="secondary"
            fontSize="medium"
            style={{
              padding: 2,
              border: "1px solid #F50057",
              borderRadius: 8,
              backgroundColor: "white",
              color: "#F50057",
            }}
          />
        </Link>
      </Tooltip>
    );
  };

  const renderChangeButton = (params) => {
    return (
      <Tooltip title="Change Password">
        <Link to={`/changepassword/${params.change}`}>
          <ChangeHistory
            className="action-buttons"
            color="secondary"
            fontSize="medium"
            style={{
              padding: 2,
              border: "1px solid #F50057",
              borderRadius: 8,
              backgroundColor: "white",
              color: "#F50057",
            }}
          />
        </Link>
      </Tooltip>
    );
  };

  const columns = [
    { field: "id", title: "S#", width: 200, sortable: false },
    {
      field: "email",
      title: "Email",
      sortable: false,
      width: 630,
    },
    {
      field: "userCode",
      title: "CRM Code",
      sortable: false,
      width: 630,
    },

    {
      field: "edit",
      title: "Edit Info",
      sortable: false,
      render: renderEditButton,
      width: 200,
    },
    {
      field: "change",
      title: "Change Password",
      sortable: false,
      render: renderChangeButton,
      width: 200,
    },
  ];

  let rows = [];
  if (teamLeads) {
    let s = 1;
    teamLeads.forEach((user) => {
      rows.push({
        id: s++,
        fullName: user.first_name + " " + user.last_name,
        email: user.email,
        userCode: user.crm_code,
        createdAt: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "-",
        updatedAt: user.updatedAt
          ? new Date(user.updatedAt).toLocaleDateString()
          : "-",
        action: user._id,
        edit: user._id,
        change: user._id,
      });
    });
  }

  return (
    <div className="feature">
      <SearchTable
        rows={rows}
        columns={columns}
        header={"Team Lead"}
        path={"teamlead"}
        loading={loading}
      />
    </div>
  );
};

export default TeamLead;
