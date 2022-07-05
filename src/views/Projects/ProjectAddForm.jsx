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
  Input,
} from "reactstrap";
import Alert from "../../components/Alert/Alert";
import { addProject } from "../../features/projects/projects.action";

const ProjectAdd = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    location: "",
  });
  const { saved } = useSelector((state) => state.projects);
  function resetForm() {
    setData({
      name: "",
      location: "",
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (saved == true) {
      resetForm();
    }
  }, [saved]);

  const submit = async (event) => {
    event.preventDefault();
    dispatch(addProject());
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
          <CardTitle tag="h4">Add Project</CardTitle>
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
                <FormGroup>
                  <Label for="nameVertical">Project Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Project name"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="locationVertical">Location</Label>
                  <Input
                    type="text"
                    name="location"
                    id="location"
                    value={data.location}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Location"
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
export default ProjectAdd;
