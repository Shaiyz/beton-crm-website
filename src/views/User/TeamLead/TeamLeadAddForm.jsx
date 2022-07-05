import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { backend } from "../../../api/index";

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
import Alert from "../../../components/Alert/Alert";
import { addUser } from "../../../features/users/user.action";

const TeamLeadAdd = ({}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profilePicture: "",
    cnic: "",
    phone: "",
    age: null,
    gender: "",
    password: "",
    role: "teamLead",
  });
  function resetForm() {
    setData({
      first_name: "",
      last_name: "",
      email: "",
      profilePicture: "",
      cnic: "",
      phone: "",
      age: null,
      gender: "",
      password: "",
      role: "teamLead",
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    dispatch(addUser(data));
    window.scrollTo(0, 0);
  };

  function handleUserData(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  async function uploadFile(file, id) {
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
      return null;
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
          <CardTitle tag="h4">Add Team Lead Employees</CardTitle>
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
              <Col sm="3">
                <FormGroup>
                  <div
                    style={{
                      width: "20%",
                    }}
                  >
                    <img
                      style={{ objectFit: "cover", width: "100%" }}
                      src={data.profilePicture}
                    />
                  </div>
                  <Label for="profilePicture">User Profile Image</Label>
                  <Input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={(e) =>
                      uploadFile(e.target.files[0], "profilePicture")
                    }
                    required
                  ></Input>
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="first_name">First Name</Label>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={data.first_name}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="first name"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="last_name">Last Name</Label>
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={data.last_name}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="last name"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="email">Enter Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="your email"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={data.password}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="enter password"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="age">Enter Age</Label>
                  <Input
                    type="number"
                    name="age"
                    id="age"
                    value={data.age}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter age"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="gender">Select Gender</Label>
                  <select
                    value={data.gender}
                    name="gender"
                    id="gender"
                    required
                    onChange={(e) => handleUserData(e)}
                  >
                    <option>--- Please Select Option ---</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="role">Role Name</Label>
                  <Input
                    value={data.role === "teamLead" ? "Team Lead" : ""}
                    disabled
                    name="role"
                    id="role"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="cnicVertical">CNIC No</Label>
                  <Input
                    type="text"
                    name="cnic"
                    id="cnic"
                    value={data.cnic}
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter User CNIC"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="mobileNoVertical">Mobile Number </Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    value={data.phone}
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Mobile Number"
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
export default TeamLeadAdd;
