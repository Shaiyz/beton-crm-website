import React, { useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Tooltip } from "@material-ui/core";
import "../User/TeamLead/Admin.css";
import { Message } from "@material-ui/icons/";
import { Link } from "react-router-dom";
import Table from "../../components/TableUsers/Table";
import { getMyLeads } from "../../features/leads/leads.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Helmet } from "react-helmet";
import AddBox from "@material-ui/icons/AddBox";

const MyLeads = ({ history, location }) => {
  const { myleads, loading } = useSelector((state) => state.leads);
  const [leadsList, setLeads] = useState(null);
  let dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    // if (!myleads) {
      dispatch(getMyLeads());
    // }
  }, []);

  const closedwon = () =>
    myleads?.filter(
      (lead) =>
        lead.leadTasks.length > 0 &&
        lead.leadTasks.slice(-1)[0].task.name == "closedWon"
    );
  const closedlost = () =>
    myleads?.filter(
      (lead) =>
        lead.leadTasks.length > 0 &&
        lead.leadTasks.slice(-1)[0].task.name == "closedLost"
    );

  useEffect(() => {
    if (location?.hash == "#closedlost") {
      setLeads(closedlost());
      setValue(1);
    } else if (location?.hash == "#closedwon") {
      setLeads(closedwon());
      setValue(2);
    } else if (location?.hash == "#all" || location?.hash == "") {
      setLeads(myleads);
      setValue(0);
    }
  }, [myleads]);

  const getAll = () => {
    setLeads(myleads);
    history.push(`/myleads#all`);
  };

  const getClosedLost = () => {
    setLeads(closedlost());
    history.push(`/myleads#closedlost`);
  };

  const getClosedWon = () => {
    setLeads(closedwon());
    history.push(`/myleads#closedwon`);
  };

  const todoText = (comment) => `${comment}`;

  const renderActionButton = (params) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Edit Lead">
          <Link
            to={`/leads/edit/${params.edit?._id}`}
            style={{ marginTop: "5px" }}
          >
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

        <Tooltip
          title={todoText(
            params.edit?.leadTasks.length > 0
              ? params.edit?.leadTasks?.slice(-1)[0]?.message
                ? params.edit.leadTasks.slice(-1)[0]?.message
                : "No comment added on most recent task."
              : "No task performed"
          )}
        >
          <Button>
            <Message
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
          </Button>
        </Tooltip>
        <Tooltip title="Add Todo">
          <Link
            to={`/todo/add/${params.edit?._id}`}
            style={{ marginTop: "5px" }}
          >
            <AddBox
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
      </div>
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
      field: "fullName",
      title: "Client Name",
      sortable: false,
      width: 630,
    },
    {
      field: "intrested",
      title: "Intrested",
      sortable: false,
      width: 630,
    },
    {
      field: "edit",
      title: "Action",
      sortable: false,
      render: renderActionButton,
      width: 10,
    },
  ];

  let rows = [];
  if (leadsList) {
    let s = 1;
    leadsList.forEach((lead) => {
      rows.push({
        id: s++,
        fullName: lead.client.name,
        email: lead.client.email,
        createdAt: lead.createdAt
          ? new Date(lead.createdAt).toLocaleDateString()
          : "-",
        updatedAt: lead.updatedAt
          ? new Date(lead.updatedAt).toLocaleDateString()
          : "-",
        edit: lead,
        intrested: lead.intrested.name,
      });
    });
  }

  return (
    <div className="feature">
      <Helmet title="Leads - CRM"></Helmet>

      <Table
        header={"Leads"}
        blockUser={() => {}}
        path="leads"
        label1="Closed Lost"
        label2="Closed Won"
        loading={loading}
        columns={columns}
        rows={rows}
        value={value}
        setValue={setValue}
        getAll={getAll}
        getAllInactive={getClosedLost}
        getAllActive={getClosedWon}
      />
    </div>
  );
};

export default MyLeads;
