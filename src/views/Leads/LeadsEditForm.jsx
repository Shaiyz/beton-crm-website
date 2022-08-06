import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
import { setAlertMessage } from "../../features/alert/alert.action";
import { updateLead } from "../../features/leads/leads.action";
import Alert from "../../components/Alert/Alert";

const LeadsEdit = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { users, loading } = useSelector((state) => state.users);
  const { clients } = useSelector((state) => state.clients);
  const { userInfo } = useSelector((state) => state.auth);

  const { projects } = useSelector((state) => state.projects);
  const { myleads, leads } = useSelector((state) => state.leads);
  const [data, setData] = useState({
    assignedTo: "",
    client: "",
    intrested: "",
  });

  const fetchCurrentLead = () => {
    try {
      let lead;
      if (userInfo.role === "salesRep") {
        lead = myleads?.find((lead) => lead._id === id);
      } else {
        lead = leads?.find((lead) => lead._id === id);
      }
      setData({
        assignedTo: lead?.assignedTo ? lead.assignedTo._id : "",
        client: lead?.client._id,
        intrested: lead.intrested ? lead.intrested._id : "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchCurrentLead();
    }
  }, [userInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!data.assignedTo) {
      dispatch(setAlertMessage("Please fill properly.", "error"));
      return;
    }

    dispatch(
      updateLead(
        {
          ...data,
        },
        id
      )
    );
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
          <CardTitle tag="h4">Edit Lead</CardTitle>
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
              {userInfo?.role !== "salesRep" && (
                <Col sm="12">
                  <Label for="assignToVertical">Assign To</Label>

                  <FormGroup>
                    <select
                      value={data.assignedTo}
                      required
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
                    disabled
                    id="client"
                    onChange={(e) => handleUserData(e)}
                  >
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
                <Label for="intrestedVertical">Interested Project</Label>
                <FormGroup>
                  <select
                    value={data.intrested ? data.intrested : "remove"}
                    required
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
                  {/* <Button className="form_reset_btn" onClick={resetForm}>
                    Reset
                  </Button> */}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};
export default LeadsEdit;
