import React, { useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Grid, IconButton, Tooltip } from "@material-ui/core";
import "../User/TeamLead/Admin.css";
import { Delete, Message } from "@material-ui/icons/";
import { Link } from "react-router-dom";
import Table from "../../components/TableUsers/Table";
import { deleteLead, getAllLeads } from "../../features/leads/leads.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Helmet } from "react-helmet";
import TransitionModal from "../../components/TransitionModal/TransitionModal";

const Leads = ({ history, location }) => {
  const { leads, loading } = useSelector((state) => state.leads);
  const { tasks } = useSelector((state) => state.tasks);
  const [leadsList, setLeads] = useState(null);
  const [open, setOpen] = useState(null);
  let dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    if (!leads) {
      dispatch(getAllLeads());
    }
  }, []);

  const closedwon = () => {
    let filtered = [];
    leads?.map((lead) => {
      // if (
      //   lead.leadTasks.length > 0 &&
      //   lead.leadTasks.slice(-1)[0].subtask ==
      //     tasks
      //       .find((i) => i.name == "sales")
      //       .subTasks.find((i) => i.name == "closedWon")._id
      // ) {
      //   filtered.push(lead);
      // }
      if (lead.leadTasks.length > 0) {
        const won = lead.leadTasks.find(
          (task) =>
            task.subtask ==
            tasks
              .find((i) => i.name == "sales")
              .subTasks.find((i) => i.name == "closedWon")._id
        );
        if (won) filtered.push(lead);
      }
    });
    return filtered;
  };

  const closedlost = () => {
    let filtered = [];
    leads?.map((lead) => {
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
      setLeads(leads);
      setValue(0);
    }
  }, [leads]);

  const getAll = () => {
    setLeads(leads);
    history.push(`/leads#all`);
  };

  const getClosedLost = () => {
    setLeads(closedlost());
    history.push(`/leads#closedlost`);
  };

  const getClosedWon = () => {
    setLeads(closedwon());
    history.push(`/leads#closedwon`);
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
              : "No task performed yet."
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
        <IconButton style={{ marginTop: "5px" }}>
          <Delete
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
            onClick={() => setOpen(params.edit._id)}
          />
        </IconButton>
      </div>
    );
  };

  const columns = [
    { field: "id", title: "S#", width: 200, sortable: false },
    {
      field: "email",
      title: "Client Email",
      sortable: false,
      width: 630,
    },
    {
      field: "fullName",
      title: "Client Name",
    },
    {
      field: "phone",
      title: "Client Phone",
      sortable: false,
      width: 630,
    },
    {
      field: "clientId",
      title: "Client Id",
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
      field: "assigned",
      title: "Assigned To",
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
        fullName: lead.client ? lead.client.name : "Not yet selected",
        email: lead.client?.email,
        phone: lead.client?.phone,
        clientId: lead.client?.clientId,
        createdAt: lead.createdAt
          ? new Date(lead.createdAt).toLocaleDateString()
          : "-",
        updatedAt: lead.updatedAt
          ? new Date(lead.updatedAt).toLocaleDateString()
          : "-",
        edit: lead,
        assigned: lead.assignedTo
          ? lead.assignedTo.first_name + " " + lead.assignedTo.last_name
          : "Not assigned",
        intrested: lead.intrested ? lead.intrested.name : "Not  selected",
      });
    });
  }

  return (
    <div className="feature">
      <Helmet title="Leads - CRM"></Helmet>

      <Table
        refresh={() => dispatch(getAllLeads())}
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
      <TransitionModal
        open={open ? true : false}
        handleClose={() => setOpen(null)}
        style={{ width: 200 }}
      >
        <Grid item xs={12} sm={12}>
          <p style={{ fontWeight: "bold" }}>
            Are you sure you want to delete this lead ?
          </p>
        </Grid>
        <Grid item xs={12} sm={12} align="center" style={{ marginTop: 10 }}>
          <Button
            style={{ marginRight: 10 }}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => {
              dispatch(deleteLead(open));
              setOpen(null);
            }}
          >
            Yes
          </Button>
          <Button variant="outlined" size="small" onClick={() => setOpen(null)}>
            Cancel
          </Button>
        </Grid>
      </TransitionModal>
    </div>
  );
};

Leads.defaultProps = {
  leads: [
    {
      first_name: "Shaiyz",
      last_name: "Khan",
      email: "shaiyz@gmail.com",
      intrested: "Office",
    },
    {
      first_name: "Saad",
      last_name: "Khawar",
      email: "saad@gmail.com",
      intrested: "Apartment",
    },
  ],
};
export default Leads;
