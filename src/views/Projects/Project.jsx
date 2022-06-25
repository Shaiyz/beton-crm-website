import React, { useEffect } from "react";
import SearchTable from "../../components/SearchTable/SearchTable";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getAllProjects } from "../../features/projects/projects.action";
const Project = () => {
  let dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    if (!projects) {
      dispatch(getAllProjects());
    }
  }, [projects]);

  const renderEditButton = (params) => {
    return (
      <Tooltip title="Edit Project">
        <Link to={`/project/edit/${params.action}`}>
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
      field: "name",
      title: "Project name",
      sortable: false,
      width: 630,
    },
    {
      field: "location",
      title: "Location",
      sortable: false,
      width: 630,
    },
    { field: "leads", title: "Total Leads" },
    {
      field: "action",
      title: "Action",
      sortable: false,
      render: renderEditButton,
      width: 200,
    },
  ];

  let rows = [];
  if (projects) {
    let s = 1;
    projects.forEach((project) => {
      rows.push({
        id: s++,
        name: project.name,
        location: project.location,
        leads: project.leads.length,
        createdAt: project.createdAt
          ? new Date(project.createdAt).toLocaleDateString()
          : "-",
        updatedAt: project.updatedAt
          ? new Date(project.updatedAt).toLocaleDateString()
          : "-",
        action: project._id,
      });
    });
  }

  return (
    <div className="feature">
      <SearchTable
        rows={rows}
        columns={columns}
        header={"Projects"}
        path={"project"}
        loading={loading}
      />
    </div>
  );
};

export default Project;
