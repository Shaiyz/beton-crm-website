import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Button,
  Label,
  UncontrolledAlert,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useSelector } from "react-redux";
import { getNames } from "../../../utils";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { addTodoTask } from "../../../features/todos/todos.action";
import { useDispatch } from "react-redux";

const TodoTaskAddForm = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [data, setData] = useState({ comment: "" });
  function resetForm() {
    setData({ comment: "" });
  }
  const dispatch = useDispatch();
  const { tasks, error, loading } = useSelector((state) => state.tasks);
  const { userId } = useSelector((state) => state.auth);
  const [subMenu, setSubMenu] = React.useState(null);
  const [task, setTask] = React.useState("");
  const [subTask, setSubTask] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleChange = (e) => {
    setTask(e.target.value);
    if (e.target.value != "") {
      const subtasks = tasks
        ?.filter((i) => i._id === e.target.value)[0]
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
  }, [successMessage]);

  const submit = async (event) => {
    event.preventDefault();
    const { ...rest } = data;
    debugger;
    try {
      dispatch(
        addTodoTask({
          Deadline: selectedDate,
          subtask: subTask,
          task: task,
          createdBy: userId,
          ...rest,
        })
      );
      resetForm();
    } catch (error) {
      setSuccessMessage(null);
    }
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

        {successMessage && (
          <UncontrolledAlert color="success">
            <div className="alert-body">{successMessage}</div>
          </UncontrolledAlert>
        )}
        <CardBody>
          <Form onSubmit={(event) => submit(event)}>
            <Row
              style={{
                border: "1px solid #2e272538",
                padding: "1px 20px 20px 20px",
              }}
            >
              <Col sm="12">
                <FormGroup>
                  <Label for="assignToVertical"> Task </Label>
                  <select required onChange={handleChange}>
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
                <FormGroup>
                  <Label for="clientNameVertical">Sub Task</Label>
                  <select required onChange={handleChangeSubTask}>
                    {/* <option>--- Please Select Option ---</option> */}
                    {subMenu?.map((i, ind) => (
                      <option key={ind} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="intrestedVertical">Deadline</Label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      label="Deadline Picker"
                      inputVariant="outlined"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="intrestedVertical">Comment</Label>
                  <Input
                    type="textarea"
                    name="comment"
                    rows={5}
                    required
                    id="comment"
                    onChange={(e) => handleTaskData(e)}
                    placeholder="Client Id"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup
                  className="d-flex mb-0"
                  style={{ marginTop: "10px" }}
                >
                  <Button
                    className="form_submit_btn"
                    type="submit"
                    style={{ marginInline: "10px" }}
                  >
                    Submit
                  </Button>
                  <Button className="form_reset_btn" onClick={resetForm}>
                    Reset
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
export default TodoTaskAddForm;
