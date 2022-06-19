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
} from "reactstrap";

const LeadsAdd = ({}) => {
  //body

  const [successMessage, setSuccessMessage] = useState(null);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    assign_to: "",
    client_name: "",
    intrested: "",
  });
  function resetForm() {
    setData({
      fname: "",
      lname: "",
      email: "",
      assign_to: "",
      client_name: "",
      intrested: "",
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [successMessage]);

  const submit = async (event) => {
    // /role/{role}/user/{user}

    event.preventDefault();

    try {
      setSuccessMessage("New Lead Added");
      resetForm();
    } catch (error) {
      setSuccessMessage(null);
      console.log(error);
    }
  };

  function handleUserData(e) {
    const newdata = { ...data };
    console.log(newdata);
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
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
                  <Label for="assignToVertical"> Assign To Employee </Label>
                  <select
                    value={data.assign_to}
                    required
                    onChange={(e) => handleUserData(e)}
                  >
                    <option>--- Please Select Option ---</option>
                    <option value="Employee 1">Employee Name 1</option>
                    <option value="Employee 2">Employee Name 2</option>
                    <option value="Employee 3">Employee Name 3</option>
                  </select>
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="clientNameVertical">Client Name </Label>
                  <select
                    value={data.assign_to}
                    required
                    onChange={(e) => handleUserData(e)}
                  >
                    <option>--- Please Select Option ---</option>
                    <option value="Client 1">CLient Name 1</option>
                    <option value="Client 2">CLient Name 2</option>
                    <option value="Client 3">CLient Name 3</option>
                  </select>
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="intrestedVertical">
                    Client Intersted Project{" "}
                  </Label>
                  <select
                    value={data.type}
                    required
                    onChange={(e) => handleUserData(e)}
                  >
                    <option>--- Please Select Option ---</option>
                    <option value="office">Office</option>
                    <option value="appartment">Appartment</option>
                    <option value="plot">Plot</option>
                    <option value="suite">Suite</option>
                    <option value="penthouse">Penthouse</option>
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
