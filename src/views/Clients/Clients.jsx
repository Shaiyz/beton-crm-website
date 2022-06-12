import React, { useEffect } from "react";
import SearchTable from "../../components/SearchTable/SearchTable";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";

const Clients = ({ clients }) => {
  //   let dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllAdminUsers());
  }, []);

  const loading = false;
  const deleteUser = (id) => {
    // dispatch(deleteAdminUser(id));
  };

  const renderActionButton = (params) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Edit Client">
          <Link to={`/client/edit/${params.edit}`} style={{ marginTop: "5px" }}>
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
        <Tooltip title="Delete">
          <Button onClick={() => deleteUser(params.action)}>
            <DeleteIcon
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
      title: "Client Name",
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
        fullName: client.first_name + " " + client.last_name,
        email: client.email,
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

Clients.defaultProps = {
  clients: [
    {
      first_name: "Shaiyz",
      last_name: "Khan",
      email: "shaiyz@gmail.com",
      phone: "332553600",
      clientId: "SK-100001",
    },
    {
      first_name: "Saad",
      last_name: "Khawar",
      email: "saad@gmail.com",
      phone: "332522600",
      clientId: "SK-100002",
    },
  ],
};
export default Clients;
