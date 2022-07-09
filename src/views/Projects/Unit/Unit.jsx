import React, { useEffect } from "react";
import SearchTable from "../../../components/SearchTable/SearchTable";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getAllUnits } from "../../../features/units/units.action";
import { Helmet } from "react-helmet";

const Unit = ({}) => {
  let dispatch = useDispatch();
  const { units, loading } = useSelector((state) => state.units);
  useEffect(() => {
    if (!units) {
      dispatch(getAllUnits());
    }
  }, [units]);

  const renderEditButton = (params) => {
    return (
      <Tooltip title="Edit Unit">
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
      </Tooltip>
    );
  };

  const columns = [
    { field: "id", title: "S#", width: 200, sortable: false },
    {
      field: "type",
      title: "Type",
      sortable: false,
      width: 630,
    },
    {
      field: "quantity",
      title: "Quantity",
      sortable: false,
      width: 630,
    },
    {
      field: "size",
      title: "Size",
      sortable: false,
      width: 630,
    },

    {
      field: "price",
      title: "Price",
      sortable: false,
      width: 630,
    },
    {
      field: "project",
      title: "Project",
      sortable: false,
      width: 630,
    },

    {
      field: "action",
      title: "Action",
      sortable: false,
      render: renderEditButton,
      width: 200,
    },
  ];

  let rows = [];
  if (units) {
    console.log(units)
    let s = 1;
    units.forEach((unit) => {
      rows.push({
        id: s++,
        type: unit.unit.type,
        size: unit.unit.size,
        price: unit.unit.price,
        quantity: unit.unit.quantity,
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

export default Unit;
