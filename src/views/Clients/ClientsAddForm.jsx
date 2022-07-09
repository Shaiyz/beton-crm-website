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
import { backend } from "../../api/index";
import Alert from "../../components/Alert/Alert";
import { addClient } from "../../features/client/client.action";

const ClientAdd = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  function resetForm() {
    setData({
      name: "",
      email: "",
      cnicFront: "",
      cnicBack: "",
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const clientData = { createdBy: userInfo._id, ...data };
    dispatch(addClient(clientData));
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
                  <Label for="phone">Phone Number 1</Label>
                  <Input
                    type="number"
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
                  <Label for="phone2">Phone Number 2</Label>
                  <Input
                    type="number"
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
                    required
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
export default ClientAdd;
