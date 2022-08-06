import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Button,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import Alert from "../../components/Alert/Alert";
import { addLead } from "../../features/leads/leads.action";

const LeadsAdd = ({}) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { clients } = useSelector((state) => state.clients);
  const { projects } = useSelector((state) => state.projects);
  const [data, setData] = useState(
    userInfo.role == "salesRep"
      ? {
          client: "",
          assignedTo: userInfo._id,
          addedBy: userInfo._id,
        }
      : {
          addedBy: userInfo._id,
          client: "",
        }
  );

  function resetForm() {
    if (userInfo.role == "salesRep") {
      setData({
        assignedTo: userInfo._id,
      });
    } else {
      setData({
        client: "",
      });
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    dispatch(addLead(data));
  };

  function handleUserData(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
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
          <CardTitle tag="h4">Add New Lead</CardTitle>
        </CardHeader>
        <Alert />
        <CardBody>
          <Form onSubmit={(event) => submit(event)}>
            <Row
              style={{
                border: "1px solid #2e272538",
                padding: "1px 20px 20px 20px",
              }}
            >
              {userInfo?.role != "salesRep" && (
                <Col sm="12">
                  <Label for="assignToVertical"> Assign To </Label>
                  <FormGroup>
                    <select
                      value={data.assignedTo}
                      id="assignedTo"
                      onChange={(e) => handleUserData(e)}
                    >
                      <option value="">--- Please Select Option ---</option>
                      {users &&
                        users.map((user) => (
                          <option
                            value={user._id}
                          >{`${user.first_name}  ${user.last_name}`}</option>
                        ))}
                    </select>
                  </FormGroup>
                </Col>
              )}
              <Col sm="12">
                <Label for="clientNameVertical">Client ID</Label>
                <FormGroup>
                  <select
                    value={data.client}
                    required
                    id="client"
                    onChange={(e) => handleUserData(e)}
                  >
                    <option value="">--- Please Select Option ---</option>
                    {clients &&
                      clients.map((client) => (
                        <option
                          value={client._id}
                        >{`${client.clientId}`}</option>
                      ))}
                  </select>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="intrestedVertical">Intersted Project</Label>
                <FormGroup>
                  <select
                    value={data.intrested}
                    // required
                    id="intrested"
                    onChange={(e) => handleUserData(e)}
                  >
                    <option value="">--- Please Select Option ---</option>
                    {projects &&
                      projects.map((project) => (
                        <option value={project._id}>{`${project.name}`}</option>
                      ))}
                  </select>
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
export default LeadsAdd;
