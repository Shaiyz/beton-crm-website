import axios from "axios";
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
  UncontrolledAlert,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { backend } from "../../api/index";
import Alert from "../../components/Alert/Alert";
import { addUser } from "../../features/users/user.action";

const ClientAdd = ({}) => {
  //body
  //    const [successMessage, setSuccessMessage] = useState(null)
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    phone2: "",
    cnicFornt: "",
    cnicBack: "",
  });
  function resetForm() {
    setData({
      name: "",
      email: "",
      phone: "",
      phone2: "",
      cnicFornt: "",
      cnicBack: "",
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    dispatch(addUser(data));
  };

  function handleUserData(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  async function uploadFrontendFile(file) {
    try {
      const media = new FormData();
      media.append("images", file);
      const { data } = await backend.post("/fileupload", media, {
        headers: {
          "content-type": `multipart/form-data`,
        },
      });

      return data.images[0];
    } catch (error) {
      return null;
    }
  }
  async function uploadBackEndFile(file) {
    try {
      const formData = new FormData();
      formData.append("images", file);
      const { data } = await backend("/fileupload", formData);
      return data.locationArray[0].fileLocation;
    } catch (error) {
      console.log(error.response);
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
          <CardTitle tag="h4">Add New Client</CardTitle>
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
                  <Label for="name">Enter Client Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Client Name"
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
                    value={data.email}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Your Email"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="phone">Phone Number 1</Label>
                  <Input
                    type="number"
                    name="phone"
                    id="phone"
                    value={data.phone}
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Phone Number 1"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup>
                  <Label for="phone2">Phone Number 2</Label>
                  <Input
                    type="number"
                    name="phone2"
                    id="phone2"
                    value={data.phone2}
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Phone Number 2"
                  />
                </FormGroup>
              </Col>

              <Col sm="3">
                <FormGroup>
                  <div>
                    <img className="custom-img-dimension" src={data.image} />
                  </div>
                  <Label for="cnicFornt">CNIC Front</Label>
                  <Input
                    type="file"
                    name="cnicFornt"
                    id="cnicFornt"
                    onChange={(e) => uploadFrontendFile(e.target.files[0])}
                    required
                  ></Input>
                </FormGroup>
              </Col>

              <Col sm="3">
                <FormGroup>
                  <div>
                    <img className="custom-img-dimension" src={data.image} />
                  </div>
                  <Label for="cnicBack">CNIC Back</Label>
                  <Input
                    type="file"
                    name="cnicBack"
                    id="cnicBack"
                    onChange={(e) => uploadBackEndFile(e)}
                    required
                  ></Input>
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
export default ClientAdd;
