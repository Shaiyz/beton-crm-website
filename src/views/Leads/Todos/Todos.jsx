import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Check from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import Message from "@material-ui/icons/Message";
import { Tooltip } from "@material-ui/core";
import "../../User/TeamLead/Admin.css";
import Table from "../../../components/TableUsers/Table";
import { Modal } from "./Modals";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTodoTasks } from "../../../features/todos/todos.action";
import { useDispatch } from "react-redux";
import { getNames } from "../../../utils";
import { Helmet } from "react-helmet";

const Todos = ({ history, location }) => {
  const [value, setValue] = React.useState(0);
  const { todos, error, loading } = useSelector((state) => state.todos);
  const { tasks } = useSelector((state) => state.tasks);
  console.log(tasks);
  const [todosList, setTodosList] = React.useState([]);
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
      setTodosList();
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
    history.push(`/todos#overdue`);
  };

  const getUpcomming = () => {
    history.push(`/todos#upcomming`);
  };

  const getAll = () => {
    dispatch(getAllTodoTasks());
    history.push(`/todos#all`);
  };
  const completeTodo = (id) => {
    // dispatch(deleteAdminUser(id));
  };
  const renderActionButton = (params) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title={params.action.message}>
          <Button onClick={() => completeTodo(params.action._id)}>
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
          </Button>
        </Tooltip>
        <Tooltip title="Edit Todo">
          <Link
            to={`/todo/edit/${params.action._id}`}
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
        <Tooltip title="Mark Complete">
          <Button onClick={() => completeTodo(params.action._id)}>
            <Check
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
      field: "deadline",
      title: "Deadline",
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
    todos.forEach((todo) => {
      const task = tasks.find((i) => i._id == todo.task._id);
      const subTask = task.subTasks.find((i) => i._id == todo.subtask);
      rows.push({
        id: s++,
        name: todo.client.name,
        email: todo.client.email,
        phone: "0" + todo.client.phone,
        task: getNames(todo.task?.name),
        action: todo,
        subtask: getNames(subTask?.name),
        deadline: new Date(todo.deadline).toLocaleString(),
      });
    });
  }

  return (
    <div className="feature">
      <Helmet title="Todos"></Helmet>
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
    </div>
  );
};

export default Todos;
