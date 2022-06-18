import React, { useEffect } from "react";
import SearchTable from "../../components/SearchTable/SearchTable";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import "../User/TeamLead/Admin.css";
import { HomeWork } from "@material-ui/icons/";
import { Link } from "react-router-dom";
import Table from "../../components/TableUsers/Table";

const Leads = ({ leads, history, location }) => {
  //   let dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    // dispatch(getAllAdminUsers());
  }, []);

  useEffect(() => {
    if (location?.hash == "#closelost") {
      // dispatch(getUsersByStatus("leads", true));
      setValue(1);
    } else if (location?.hash == "#closedwon") {
      // dispatch(getUsersByStatus("salaesRep", false));
      setValue(2);
    } else if (location?.hash == "#all" || location?.hash == "") {
      // dispatch(getUsersByRole("leads"));
      setValue(0);
    }
  }, []);

  const getAll = () => {
    // dispatch(getUsersByRole("leads"));
    history.push(`/leads#all`);
  };

  const getClosedLost = () => {
    // dispatch(getUsersByStatus("leads", true));
    history.push(`/leads#closedlost`);
  };

  const getClosedWon = () => {
    // dispatch(getUsersByStatus("leads", false));
    history.push(`/leads#closedwon`);
  };

  const loading = false;
  const deleteUser = (id) => {
    // dispatch(deleteAdminUser(id));
  };

  const longText = `Aliquam eget finibus ante, non facilisis lectus.Sed vitae dignissim est,vel aliquam tellus.
        Praesent non nunc mollis, fermentum neque at, semper arcu.
        Nullam eget est sed sem iaculis gravida eget vitae justo.`;

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
  if (leads) {
    let s = 1;
    leads.forEach((lead) => {
      rows.push({
        id: s++,
        fullName: lead.first_name + " " + lead.last_name,
        email: lead.email,

        createdAt: lead.createdAt
          ? new Date(lead.createdAt).toLocaleDateString()
          : "-",
        updatedAt: lead.updatedAt
          ? new Date(lead.updatedAt).toLocaleDateString()
          : "-",
        action: lead._id,
        intrested: lead.intrested,
      });
    });
  }

  return (
    <div className="feature">
      {/* <SearchTable
        rows={rows}
        columns={columns}
        header={"Lead"}
        path={"leads"}
        loading={loading}
      /> */}

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
