import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
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
import { addUnit } from "../../../features/units/units.action";

const UnitAdd = () => {
  const { projectId } = useParams();
  const [data, setData] = useState({
    name: "",
    type: "office",
    size: "",
    price: "",
  });
  function resetForm() {
    setData({
      name: "",
      type: "office",
      size: "",
      price: "",
    });
  }
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    dispatch(addUnit(data, projectId));
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
          <CardTitle tag="h4">Add Unit</CardTitle>
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
                <Label for="nameVertical">Unit Name</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Name"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <Label for="typeVertical">Type</Label>
                <FormGroup>
                  <select
                    value={data.type}
                    required
                    id="type"
                    onChange={(e) => handleUserData(e)}
                  >
                    <option value="office">Office</option>
                    <option value="appartment">Appartment</option>
                    <option value="plot">Plot</option>
                    <option value="suite">Suite</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                </FormGroup>
              </Col>
              <Col sm="12" lg="12">
                <Label for="sizeVertical">Size</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="size"
                    id="size"
                    value={data.size}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Size"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <Label for="priceVertical">Price</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="price"
                    id="price"
                    value={data.price}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Price"
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
export default UnitAdd;
