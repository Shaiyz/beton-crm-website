import React, { useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Button, IconButton, Tooltip } from "@material-ui/core";
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
  const { tasks } = useSelector((state) => state.tasks);
  const [leadsList, setLeads] = useState(null);
  let dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    if (!myleads) {
      dispatch(getMyLeads());
    }
  }, [myleads]);

  const closedwon = () => {
    let filtered = [];
    myleads?.map((lead) => {
      if (
        lead.leadTasks.length > 0 &&
        lead.leadTasks.slice(-1)[0].subtask ==
          tasks
            .find((i) => i.name == "sales")
            .subTasks.find((i) => i.name == "closedWon")._id
      ) {
        filtered.push(lead);
      }
    });
    return filtered;
  };
  const closedlost = () => {
    let filtered = [];
    myleads?.map((lead) => {
      if (
        lead.leadTasks.length > 0 &&
        lead.leadTasks.slice(-1)[0].subtask ==
          tasks
            .find((i) => i.name == "sales")
            .subTasks.find((i) => i.name == "closedLost")._id
      ) {
        filtered.push(lead);
      }
    });
    return filtered;
  };
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
            <IconButton>
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
            </IconButton>
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
          <Link
            to={`/lead/todos/${params.edit?._id}`}
            style={{ marginTop: "5px" }}
          >
            <IconButton>
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
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Add Todo">
          <Link
            to={`/todo/add/${params.edit?._id}`}
            style={{ marginTop: "5px" }}
          >
            <IconButton>
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
            </IconButton>
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
        path="leads"
        label1="Closed Lost"
        label2="Closed Won"
        loading={loading}
        columns={columns}
        rows={rows}
        value={value}
        setValue={setValue}
        getAll={getAll}
        getAllInactive={getClosedWon}
        getAllActive={getClosedLost}
      />
    </div>
  );
};

export default MyLeads;
