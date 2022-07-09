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
  Input,
} from "reactstrap";
import { backend } from "../../api";
import { setAlertMessage } from "../../features/alert/alert.action";
import { updateClient } from "../../features/client/client.action";
import Alert from "../../components/Alert/Alert";

const ClientEdit = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { clients } = useSelector((state) => state.clients);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const fetchCurrentClient = () => {
    const client = clients.find((client) => client._id === id);
    console.log(client);
    setData({
      clientId: client.clientId,
      name: client.name,
      email: client.email,
      phone: client.phone,
      phone2: client.phone2,
      cnicBack: client.cnicBack,
      cnicFront: client.cnicFront,
    });
  };

  useEffect(() => {
    fetchCurrentClient();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!data.email || !data.name || !data.phone) {
      dispatch(setAlertMessage("Please fill properly.", "error"));
      return;
    }
    if (data.email && !regEmail.test(data.email)) {
      dispatch(setAlertMessage("Invalid Email", "error"));
      return;
    }

    dispatch(updateClient(data, id));
  };

  function handleClientData(e) {
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
          <CardTitle tag="h4">Edit Client</CardTitle>
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
                <Label for="name">Enter Client Name</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={data?.name}
                    required
                    onChange={(e) => handleClientData(e)}
                    placeholder="Enter Client Name"
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
                    onChange={(e) => handleClientData(e)}
                    placeholder="Client Email"
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
                    required
                    value={data?.phone}
                    onChange={(e) => handleClientData(e)}
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
                    value={data?.phone2}
                    onChange={(e) => handleClientData(e)}
                    placeholder="Enter Phone Number 2"
                  />
                </FormGroup>
              </Col>

              <Col sm="3">
                <FormGroup>
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
                  <Label for="cnicFront">Client CNIC Front</Label>
                  <Input
                    type="file"
                    name="cnicFront"
                    id="cnicFront"
                    onChange={(e) => uploadFile(e.target.files[0], "cnicFront")}
                  ></Input>
                </FormGroup>
              </Col>

              <Col sm="3">
                <FormGroup>
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
                  <Label for="cnicBack">Client CNIC Back</Label>
                  <Input
                    type="file"
                    name="cnicBack"
                    id="cnicBack"
                    onChange={(e) => uploadFile(e.target.files[0], "cnicBack")}
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
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};
export default ClientEdit;
