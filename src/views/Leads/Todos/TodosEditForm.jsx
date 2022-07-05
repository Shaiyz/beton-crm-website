import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useSelector } from "react-redux";
import { getNames } from "../../../utils";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { editTodoTask } from "../../../features/todos/todos.action";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";

const TodosEditForm = () => {
  const [data, setData] = useState({ message: "" });
  const { tasks, error, loading } = useSelector((state) => state.tasks);
  const { todos } = useSelector((state) => state.todos);
  const [subMenu, setSubMenu] = React.useState(null);
  const [task, setTask] = React.useState("");
  const [subTask, setSubTask] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { id } = useParams();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask(e.target.value);
    if (e.target.value != "") {
      const subtasks = tasks
        ?.find((i) => i._id === e.target.value)
        .subTasks.map((subTask) => {
          return { label: getNames(subTask.name), value: subTask._id };
        });
      setSubMenu(subtasks);
      setSubTask(subtasks[0].value);
    }
  };

  let menu = tasks?.map((i) => {
    return { label: getNames(i.name), value: i._id };
  });

  const handleChangeSubTask = (e) => {
    setSubTask(e.target.value);
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCurrentTodo();
  }, [todos]);

  const fetchCurrentTodo = () => {
    if (todos) {
      const todo = todos?.find((todo) => todo._id === id);
      setData({
        message: todo?.message,
      });
      setTask(todo.task._id);
      const subtasks = todo.task.subTasks.map((subTask) => {
        return { label: getNames(subTask.name), value: subTask._id };
      });
      setSubMenu(subtasks);
      setSubTask(todo.subtask);
      setSelectedDate(todo.deadline);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    const { message } = data;
    dispatch(
      editTodoTask(
        {
          deadline: selectedDate,
          subtask: subTask,
          task: task,
          message: message,
        },
        id
      )
    );
  };

  function handleTaskData(e) {
    const newdata = { ...data };
    newdata[e.target.name] = e.target.value;
    setData(newdata);
  }

  return (
    <>
      <Card
        style={{
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <CardHeader
          style={{
            backgroundColor: "#1F1D61",
            borderRadius: "10px",
            padding: "20px",
            color: "white",
            marginTop: "40px",
            marginBottom: "20px",
            fontWeight: "100px",
            fontSize: "16px",
          }}
        >
          <CardTitle tag="h4">Add New Task</CardTitle>
        </CardHeader>
        <div className="alert-container">
          <Alert />
        </div>

        <CardBody>
          <Form onSubmit={(event) => submit(event)}>
            <Row
              style={{
                border: "1px solid #2e272538",
                padding: "1px 20px 20px 20px",
              }}
            >
              <Col sm="12">
                <Label for="assignToVertical"> Task </Label>
                <FormGroup>
                  <select required onChange={handleChange} value={task}>
                    <option> --- Please Select Option --- </option>
                    {menu?.map((i, ind) => (
                      <option key={ind} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label>Sub Task</Label>
                <FormGroup>
                  <select
                    required
                    onChange={handleChangeSubTask}
                    value={subTask}
                  >
                    <option> --- Please Select Option --- </option>

                    {subMenu?.map((i, ind) => (
                      <option key={ind} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="intrestedVertical">Deadline</Label>

                <FormGroup>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      inputVariant="outlined"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </FormGroup>
              </Col>
              <Col sm="12" lg="12">
                <Label for="intrestedVertical">Message</Label>

                <FormGroup>
                  <Input
                    type="textarea"
                    name="message"
                    value={data.message}
                    rows={5}
                    bgSize="lg"
                    required
                    id="message"
                    onChange={(e) => handleTaskData(e)}
                    placeholder="Todo Message"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup
                  className="d-flex mb-0"
                  style={{ marginInline: "10px", width: "100%" }}
                >
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};
export default TodosEditForm;
