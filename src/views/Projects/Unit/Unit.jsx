import React, { useEffect } from "react";
import SearchTable from "../../../components/SearchTable/SearchTable";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, Chip, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getAllUnits } from "../../../features/units/units.action";
import { Helmet } from "react-helmet";

const Unit = ({}) => {
  let dispatch = useDispatch();
  const styles = useStyles();
  const { units, loading } = useSelector((state) => state.units);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!units) {
      dispatch(getAllUnits());
    }
  }, [units]);

  const renderStatusButton = (params) => {
    return (
      <Chip
        variant="contained"
        className={
          params.status == "sold"
            ? styles.statusSold
            : params.status == "available"
            ? styles.statusAvailable
            : styles.statusToken
        }
        size="small"
        label={params.status}
      />
    );
  };

  const renderEditButton = (params) => {
    return (
      <Tooltip title="Edit Unit">
        {userInfo?.role != "salesRep" ? (
          <Link to={`/unit/edit/${params.action}`}>
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
        ) : (
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
        )}
      </Tooltip>
    );
  };

  const columns = [
    { field: "id", title: "S#", width: 200, sortable: false },
    {
      field: "type",
      title: "Type",
      width: 630,
    },
    {
      field: "name",
      title: "Name",
    },
    {
      field: "size",
      title: "Size",
      width: 630,
    },
    {
      title: "Price",
      field: "price",
      width: 630,
    },
    {
      field: "project",
      title: "Project",
    },
    {
      field: "status",
      title: "Status",
      render: renderStatusButton,
    },
    {
      field: "action",
      render: renderEditButton,
      width: 200,
    },
  ];
  let rows = [];
  if (units) {
    let s = 1;
    units.forEach((unit) => {
      rows.push({
        id: s++,
        name: unit.unit.name ? unit.unit.name : "L-213",
        type: unit.unit.type,
        size: unit.unit.size,
        status:
          unit.unit.status == "partial"
            ? "Partial Downpayment"
            : unit.unit.status,
        price: unit.unit.price,
        createdAt: unit.unit.createdAt
          ? new Date(unit.unit.createdAt).toLocaleDateString()
          : "-",
        project: unit.project.name,
        updatedAt: unit.unit.updatedAt
          ? new Date(unit.unit.updatedAt).toLocaleDateString()
          : "-",
        action: unit.unit._id,
      });
    });
  }

  return (
    <div className="feature">
      <Helmet title="Inventory - CRM"></Helmet>
      <SearchTable
        rows={rows}
        columns={columns}
        header={"Units"}
        path={"unit"}
        loading={loading}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  statusAvailable: {
    backgroundColor: "white",
    border: "1px solid #2eb85c",
    color: "#2eb85c",
    fontWeight: "bold",
  },
  statusSold: {
    backgroundColor: "white",
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
  },
  statusToken: {
    backgroundColor: "white",
    border: "1px solid #87CEFA",
    color: "#87CEFA",
    fontWeight: "bold",
  },
  statusPartialPayment: {
    backgroundColor: "white",
    border: "1px solid #87CEFA",
    color: "#87CEFA",
    fontWeight: "bold",
  },
}));

export default Unit;
