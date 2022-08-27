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
import { addTodoTask } from "../../../features/todos/todos.action";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Alert from "../../../components/Alert/Alert";
import { useHistory, useParams } from "react-router-dom";

const TodoTaskAddForm = () => {
  const [data, setData] = useState({ message: "" });
  function resetForm() {
    setData({ ...data, message: "" });
    setSelectedDate(new Date());
  }
  const dispatch = useDispatch();
  const { tasks, error, loading } = useSelector((state) => state.tasks);
  const { saved } = useSelector((state) => state.todos);

  const { myleads } = useSelector((state) => state.leads);
  const { userId } = useSelector((state) => state.auth);
  const [subMenu, setSubMenu] = React.useState(null);
  const [task, setTask] = React.useState("");
  const [subTask, setSubTask] = React.useState("");
  const [subTaskName, setSubTaskName] = React.useState("message");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [lead, setLead] = useState(null);
  const { id } = useParams();
  const history = useHistory();
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
    } else {
      setSubTask("");
      setSubMenu(null);
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
    if (saved === true) {
      history.goBack();
    }
    window.scrollTo(0, 0);
    const lead = myleads?.find((lead) => lead._id == id);
    setLead(lead);
  }, [saved]);

  useEffect(() => {
    if (
      subTask == subMenu?.find((i) => i.label == "Closed won")?.value ||
      subTask == subMenu?.find((i) => i.label == "Token")?.value ||
      subTask == subMenu?.find((i) => i.label == "Partial downpayment")?.value
    ) {
      const name = subMenu?.find((i) => i.value == subTask)?.label;
      setSubTaskName(
        name == "Token"
          ? "token"
          : name == "Closed won"
          ? "closedWon"
          : "partialPayment"
      );
      setData({
        project: lead.intrested?._id,
        client: lead.client?._id,
        ...data,
      });
    } else {
      const { message } = data;
      setData({ message });
    }
  }, [subTask]);

  const submit = (event) => {
    event.preventDefault();
    const { ...rest } = data;

    dispatch(
      addTodoTask(
        {
          deadline: selectedDate,
          subtask: subTask,
          task: task,
          createdBy: userId,
          subTaskName,
          ...rest,
        },
        id
      )
    );
    resetForm();
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
                  <select required onChange={handleChange}>
                    <option value=""> --- Please Select Option --- </option>
                    {menu?.map((i, ind) => (
                      <option key={ind} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="clientNameVertical">Sub Task</Label>

                <FormGroup>
                  <select required onChange={handleChangeSubTask}>
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
                    rows={5}
                    bgSize="lg"
                    id="message"
                    onChange={(e) => handleTaskData(e)}
                    placeholder="Todo Message"
                  />
                </FormGroup>
              </Col>
              {data.client && (
                <>
                  <Col sm="12" lg="12">
                    <Label for="intrestedVertical">Unit</Label>
                    <FormGroup>
                      <select
                        required
                        onChange={(e) =>
                          setData({ ...data, unit: e.target.value })
                        }
                      >
                        <option value=""> --- Please Select Option --- </option>

                        {lead?.intrested?.unit.map((i, ind) => (
                          <option key={ind} value={i._id}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col sm="12" lg="12">
                    <Label for="intrestedVertical">Amount Collected</Label>
                    <FormGroup>
                      <Input
                        type="number"
                        name="amount"
                        defaultValue={0}
                        bgSize="lg"
                        required
                        id="amount"
                        onChange={(e) => handleTaskData(e)}
                        placeholder="Enter Price"
                      />
                    </FormGroup>
                  </Col>
                </>
              )}
              <Col sm="12">
                <FormGroup
                  className="d-flex mb-0"
                  style={{ marginInline: "10px", width: "100%" }}
                >
                  <Button
                    type="submit"
                    color="primary"
                    // style={{ marginInline: "10px", width: "100%" }}
                  >
                    Submit
                  </Button>
                  <Button color="secondary " onClick={resetForm}>
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
