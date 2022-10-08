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
import { backend } from "../../api";
import Alert from "../../components/Alert/Alert";
import { addLead } from "../../features/leads/leads.action";

const LeadsAdd = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const { projects } = useSelector((state) => state.projects);
  const [data, setData] = useState(
    userInfo.role == "salesRep"
      ? {
          assignedTo: userInfo._id,
          addedBy: userInfo._id,
          name: "",
          email: "",
          cnicFront: "",
          cnicBack: "",
          address: "",
          cnic: "",
        }
      : {
          addedBy: userInfo._id,
          name: "",
          email: "",
          cnicFront: "",
          cnicBack: "",
          address: "",
          cnic: "",
        }
  );

  function resetForm() {
    if (userInfo.role == "salesRep") {
      setData({
        assignedTo: userInfo._id,
        addedBy: userInfo._id,
        name: "",
        email: "",
        cnicFront: "",
        cnicBack: "",
        address: "",
        cnic: "",
      });
    } else {
      setData({
        addedBy: userInfo._id,
        name: "",
        email: "",
        cnicFront: "",
        cnicBack: "",
        address: "",
        cnic: "",
      });
    }
  }
  const AssigningOptions =
    userInfo.role == "digitalMarketer"
      ? users.filter((i) => i.role == "teamLead")
      : users;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    dispatch(addLead({ createdBy: userInfo._id, ...data }));
  };

  function handleUserData(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  async function uploadFile(file, id) {
    setLoading(true);
    try {
      const media = new FormData();
      media.append("images", file);
      const image = await backend.post("/fileupload", media, {
        headers: {
          "content-type": `multipart/form-data`,
        },
      });
      const newdata = { ...data };
      newdata[id] = image.data.images[0];
      setData(newdata);
    } catch (error) {
      return "";
    } finally {
      setLoading(false);
    }
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
              <Col sm="12">
                <FormGroup>
                  <Label for="name">Client Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={data?.name}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Client Name"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="phone">Phone Number 1</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    required
                    value={data?.phone}
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Phone Number 1"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="email">Client Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={data?.email}
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Email"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="email">Client CNIC</Label>
                  <Input
                    type="text"
                    name="cnic"
                    id="cnic"
                    value={data?.cnic}
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter CNIC"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="email">Client Address</Label>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    value={data?.address}
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Address"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="phone2">Phone Number 2</Label>
                  <Input
                    type="text"
                    name="phone2"
                    id="phone2"
                    value={data?.phone2}
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Phone Number 2"
                  />
                </FormGroup>
              </Col>

              <Col sm="3">
                <div
                  style={{
                    width: "20%",
                  }}
                >
                  <img
                    style={{ objectFit: "contain", width: "100%" }}
                    src={data?.cnicFront}
                  />
                </div>
                <FormGroup>
                  <Label for="cnicFornt">CNIC Front</Label>
                  <Input
                    type="file"
                    name="cnicFront"
                    id="cnicFront"
                    onChange={(e) => uploadFile(e.target.files[0], "cnicFront")}
                  ></Input>
                </FormGroup>
              </Col>

              <Col sm="3">
                <div
                  style={{
                    width: "20%",
                  }}
                >
                  <img
                    style={{ objectFit: "contain", width: "100%" }}
                    src={data?.cnicBack}
                  />
                </div>
                <FormGroup>
                  <Label for="cnicBack">CNIC Back</Label>
                  <Input
                    type="file"
                    name="cnicBack"
                    id="cnicBack"
                    onChange={(e) => uploadFile(e.target.files[0], "cnicBack")}
                  ></Input>
                </FormGroup>
              </Col>

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
                      {AssigningOptions &&
                        AssigningOptions.map((user) => (
                          <option
                            value={user._id}
                          >{`${user.first_name}  ${user.last_name}`}</option>
                        ))}
                    </select>
                  </FormGroup>
                </Col>
              )}

              <Col sm="12">
                <Label for="intrestedVertical">Intrested Project</Label>
                <FormGroup>
                  <select
                    value={data.intrested}
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
                    disabled={loading}
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
