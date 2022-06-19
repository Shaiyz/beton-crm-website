import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import "../User/TeamLead/Admin.css";
import { HomeWork } from "@material-ui/icons/";
import { Link } from "react-router-dom";
import Table from "../../components/TableUsers/Table";
import { getAllLeads } from "../../features/leads/leads.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

const Leads = ({ history, location }) => {
  const { leads, loading } = useSelector((state) => state.leads);
  const [leadsList, setLeads] = useState(null);
  let dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  const filtered = (task) =>
    leads.filter(function (x) {
      return x.task.indexOf(task.name) > -1;
    });
  useEffect(() => {
    if (location?.hash == "#closelost") {
      const filterByTask = filtered("sales");

      setValue(1);
    } else if (location?.hash == "#closedwon") {
      const filterByTask = filtered("sales");

      setValue(2);
    } else if (location?.hash == "#all" || location?.hash == "") {
      setLeads(leads);
      setValue(0);
    }
  }, []);

  const getAll = () => {
    setLeads(leads);
    history.push(`/leads#all`);
  };

  const getClosedLost = () => {
    history.push(`/leads#closedlost`);
  };

  const getClosedWon = () => {
    history.push(`/leads#closedwon`);
  };

  const longText =
    " Task name, Sales \n" + " Sub Task , token \n" + `Task message, test \n`;

  const renderActionButton = (params) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Edit Lead">
          <Link to={`/leads/edit/${params.edit}`} style={{ marginTop: "5px" }}>
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

        <Tooltip title={longText}>
          <HomeWork
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
      field: "action",
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
        action: lead._id,
        intrested: lead.intrested.name,
      });
    });
  }

  return (
    <div className="feature">
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
