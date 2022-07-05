import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { backend } from "../../../api/index";
import { useParams } from "react-router-dom";
import { setAlertMessage } from "../../../features/alert/alert.action";
import { getUser, updateUser } from "../../../features/users/user.action";

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
import Alert from "../../../components/Alert/Alert";

const DigitalMarketerEdit = ({}) => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { user, users, loading } = useSelector((state) => state.users);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [data, setData] = useState();

  const fetchCurrentUser = async () => {
    try {
      const user = users.find((user) => user._id === id);

      setData({
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        age: user?.age,
        profilePicture: user?.profilePicture,
        cnic: user?.cnic,
        phone: user?.phone,
        gender: user?.gender,
        role: "digitalMarketer",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!data.email || !data.first_name || !data.last_name || !data.age) {
      dispatch(setAlertMessage("Please fill properly.", "error"));
      return;
    }
    if (data.email && !regEmail.test(data.email)) {
      dispatch(setAlertMessage("Invalid Email", "error"));
      return;
    }
    dispatch(
      updateUser(
        {
          ...data,
        },
        id
      )
    );
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
      return "";
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
          <CardTitle tag="h4">Edit Digital Marketer Employee</CardTitle>
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
                      src={data?.profilePicture}
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
                    value={data?.first_name}
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
                    value={data?.last_name}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="last name"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="email">Enter Your Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={data?.email}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="your email"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="age">Enter Your Age</Label>
                  <Input
                    type="number"
                    name="age"
                    id="age"
                    value={data?.age}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter age"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="roleVertical">Select Gender</Label>
                  <select
                    value={data?.gender}
                    required
                    id="gender"
                    name="gender"
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
                  <Label for="cnicVertical">CNIC No</Label>
                  <Input
                    type="text"
                    name="cnic"
                    id="cnic"
                    value={data?.cnic}
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter User CNIC"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="mobileNoVertical">Mobile Number </Label>
                  <Input
                    type="number"
                    name="phone"
                    id="phone"
                    value={data?.phone}
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
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};
export default DigitalMarketerEdit;
