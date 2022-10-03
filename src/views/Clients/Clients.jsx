import React, { useEffect, useState } from "react";
import SearchTable from "../../components/SearchTable/SearchTable";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Grid, IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  getAllClients,
  updateClient,
} from "../../features/client/client.action";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Delete } from "@material-ui/icons";
import TransitionModal from "../../components/TransitionModal/TransitionModal";

const Clients = () => {
  const { clients, loading } = useSelector((state) => state.clients);
  const { authenticated, userInfo } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(null);
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
            to={`/client/edit/${params.action._id}`}
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
        {userInfo.role === "teamLead" && (
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
              onClick={() => setOpen(params.action)}
            />
          </IconButton>
        )}
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
        action: client,
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
      <TransitionModal
        open={open ? true : false}
        handleClose={() => setOpen(null)}
        style={{ width: 200 }}
      >
        <Grid item xs={12} sm={12}>
          <p style={{ fontWeight: "bold" }}>
            Are you sure you want to delete this client ?
          </p>
        </Grid>
        <Grid item xs={12} sm={12} align="center" style={{ marginTop: 10 }}>
          <Button
            style={{ marginRight: 10 }}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => {
              dispatch(
                updateClient(
                  {
                    ...open,
                    isDeleted: true,
                  },
                  open._id
                )
              );
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

export default Clients;
