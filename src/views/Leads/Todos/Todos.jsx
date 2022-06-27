import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import "../../User/TeamLead/Admin.css";
import Table from "../../../components/TableUsers/Table";
import { Modal } from "./Modals";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTodoTasks } from "../../../features/todos/todos.action";
import { useDispatch } from "react-redux";

const Todos = ({ history, location }) => {
  const [value, setValue] = React.useState(0);
  const [editDialog, setEditDialog] = React.useState(false);
  const { todos, error, loading } = useSelector((state) => state.todos);
  const [todosList, setTodosList] = useSelector((state) => state.todosList);
  const dispatch = useDispatch();
  useEffect(() => {
    if (location?.hash == "#overdue") {
      //  //dispatch(getUsersByStatus("todos", true));
      setValue(1);
    } else if (location?.hash == "#current") {
      //  // dispatch(getUsersByStatus("salaesRep", false));
      getCurrent();
      setValue(2);
    } else if (location?.hash == "#upcoming") {
      //  // dispatch(getUsersByRole("todos"));
      setTodosList()
      setValue(0);
    } else if (location?.hash == "#all") {
      dispatch(getAllTodoTasks());
      setTodosList(todos);

      setValue(3);
    }
  }, []);

  const getCurrent = () => {
    history.push(`/todos#current`);
  };

  const getOverDue = () => {
    // dispatch(getUsersByStatus("todos", true));
    history.push(`/todos#overdue`);
  };

  const getUpcomming = () => {
    // dispatch(getUsersByStatus("todos", false));
    history.push(`/todos#upcomming`);
  };

  const getAll = () => {
    dispatch(getAllTodoTasks());
    history.push(`/todos#all`);
  };
  const deleteUser = (id) => {
    // dispatch(deleteAdminUser(id));
  };
  if (todos) {
  }
  const renderActionButton = (params) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Edit Task">
          <Link to={`/todo/edit/${params.action}`} style={{ marginTop: "5px" }}>
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
    { field: "id", title: "S#", width: 200 },
    {
      field: "email",
      title: "Email",
      sortable: false,
      width: 630,
    },
    {
      field: "name",
      title: "Client",
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
      field: "task",
      title: "Task",
      sortable: false,
      width: 630,
    },
    {
      field: "subtask",
      title: "SubTask",
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
  if (todos) {
    let s = 1;
    todos.forEach((task) => {
      rows.push({
        id: s++,
        name: task.clientName,
        email: task.email,
        phone: "0" + task.phone,
        createdAt: task.createdAt
          ? new Date(task.createdAt).toLocaleDateString()
          : "-",

        action: task._id,
        status: task.task,
        subtask: task.subtask,
      });
    });
  }

  return (
    <div className="feature">
      <Table
        header={"Todos"}
        blockUser={() => {}}
        path="todo"
        label1="Overdue"
        label2="UpComing"
        label3="Current"
        loading={loading}
        columns={columns}
        rows={rows}
        value={value}
        setValue={setValue}
        getAll={getAll}
        getAllInactive={getOverDue}
        getAllActive={getUpcomming}
        Tab3Func={getCurrent}
      />
      <Modal closeModal={() => setEditDialog(false)} visible={editDialog} />
    </div>
  );
};

export default Todos;
