import React, { useEffect } from "react";
import SearchTable from "../../components/SearchTable/SearchTable";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getAllClients } from "../../features/client/client.action";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const Clients = () => {
  const { clients, loading } = useSelector((state) => state.clients);
  let dispatch = useDispatch();

  useEffect(() => {
    if (!clients) {
      dispatch(getAllClients());
    }
  }, [clients]);
  const renderActionButton = (params) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Edit Client">
          <Link
            to={`/client/edit/${params.action}`}
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
      </div>
    );
  };

  const columns = [
    { field: "id", title: "S#", width: 200, sortable: false },
    {
      field: "clientId",
      title: "Client ID",
    },
    {
      field: "email",
      title: "Email",
      sortable: false,
      width: 630,
    },
    {
      field: "phone",
      title: "Phone",
      sortable: false,
      width: 630,
    },
    {
      field: "fullName",
      title: "Client",
      sortable: false,
      width: 630,
    },
    {
      field: "addedBy",
      title: "Added by",
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
  if (clients) {
    let s = 1;
    clients.forEach((client) => {
      rows.push({
        id: s++,
        clientId: client.clientId,
        fullName: client.name,
        email: client.email,
        addedBy:
          client.createdBy?.first_name + " " + client.createdBy?.last_name,
        createdAt: client.createdAt
          ? new Date(client.createdAt).toLocaleDateString()
          : "-",
        updatedAt: client.updatedAt
          ? new Date(client.updatedAt).toLocaleDateString()
          : "-",
        action: client._id,
        phone: client.phone,
      });
    });
  }

  return (
    <div>
      <Helmet title="Clients - CRM"></Helmet>
      <SearchTable
        rows={rows}
        columns={columns}
        header={"Client"}
        path={"clients"}
        loading={loading}
      />
    </div>
  );
};

export default Clients;
