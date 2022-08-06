import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Check from "@material-ui/icons/Check";
import Task from "@material-ui/icons/DoneOutlined";

import EditIcon from "@material-ui/icons/Edit";
import Message from "@material-ui/icons/Message";
import { Tooltip } from "@material-ui/core";
import "../../User/TeamLead/Admin.css";
import Table from "../../../components/TableUsers/Table";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNames } from "../../../utils";
import { Helmet } from "react-helmet";
import {
  completeTodoTask,
  getAllTodoTasks,
} from "../../../features/todos/todos.action";
import { useDispatch } from "react-redux";
var todaysDate = new Date();
let list = [];

const Todos = ({ history, location }) => {
  const [value, setValue] = React.useState(0);
  const { todos, loading } = useSelector((state) => state.todos);
  const { tasks } = useSelector((state) => state.tasks);
  const [todosList, setTodosList] = React.useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!todos) {
      dispatch(getAllTodoTasks());
    }
  }, []);

  useEffect(() => {
    if (location?.hash == "#overdue") {
      getOverDue();
      setValue(2);
    } else if (location?.hash == "#current") {
      getCurrent();
      setValue(1);
      list = [];
    } else if (location?.hash == "#upcoming") {
      getUpcomming();
      setValue(3);
    } else if (location?.hash == "#all" || location?.hash == "") {
      setTodosList(todos);
      setValue(0);
    }
  }, [todos]);

  const getCurrent = () => {
    let list = [];
    [...todos].map((i) => {
      var inputDate = new Date(i.deadline);
      if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        list.push(i);
      }
    });
    setTodosList(list);
    history.push(`/todos#current`);
    return (list = []);
  };

  const getOverDue = () => {
    [...todos].map((i) => {
      var inputDate = new Date(i.deadline);
      if (inputDate.setHours(0, 0, 0, 0) < todaysDate.setHours(0, 0, 0, 0)) {
        list.push(i);
      }
    });
    setTodosList(list);
    history.push(`/todos#overdue`);
    return (list = []);
  };

  const getUpcomming = () => {
    [...todos].map((i) => {
      var inputDate = new Date(i.deadline);
      if (inputDate.setHours(0, 0, 0, 0) > todaysDate.setHours(0, 0, 0, 0)) {
        list.push(i);
      }
    });
    setTodosList(list);
    history.push(`/todos#upcomming`);
    return (list = []);
  };

  const getAll = () => {
    setTodosList(todos);
    history.push(`/todos#all`);
  };
  const completeTodo = (id) => {
    dispatch(completeTodoTask({ completed: true }, id));
  };

  console.log(todosList);
  const renderActionButton = (params) => {
    console.log(params.action);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title={params.action.message}>
          <Button>
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
          <Link to={`/todo/edit/${params.action._id}`}>
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
        {params.action.completed == false ? (
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
        ) : (
          <Tooltip title="Completed">
            <Button>
              <Task
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
        )}
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
      title: "Subtask",
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
  if (todos && todosList?.length > 0) {
    const list = [...todosList].sort((a, b) => {
      return new Date(b.deadline) - new Date(a.deadline);
    });

    let s = 1;
    list.forEach((todo) => {
      const task = tasks.find((i) => i?._id == todo?.task?._id);
      const subTask = task?.subTasks.find((i) => i._id == todo?.subtask);
      rows.push({
        id: s++,
        name: todo.client?.name,
        email: todo.client?.email,
        phone: todo.client?.phone,
        task: getNames(todo.task?.name),
        action: todo,
        subtask: getNames(subTask?.name),
        deadline: new Date(todo?.deadline).toLocaleString(),
      });
    });
  }

  return (
    <div className="feature">
      <Helmet title="Todos"></Helmet>
      <Table
        refresh={() => dispatch(getAllTodoTasks())}
        header={"Todos"}
        path="todo"
        label1="Current"
        label2="Overdue"
        label3="Upcoming"
        loading={loading}
        columns={columns}
        rows={rows}
        value={value}
        setValue={setValue}
        getAll={getAll}
        getAllActive={getCurrent}
        getAllInactive={getOverDue}
        Tab3Func={getUpcomming}
      />
    </div>
  );
};

export default Todos;
