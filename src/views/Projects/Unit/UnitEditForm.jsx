import React, { useEffect, useState } from "react";
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
import { updateUnit } from "../../../features/units/units.action";
import Alert from "../../../components/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";

const UnitEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { units } = useSelector((state) => state.units);
  const [data, setData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUnit();
  }, []);

  const fetchUnit = () => {
    const unit = units.find((unit) => unit.unit._id == id);
    setData({
      name: unit?.unit.name ? unit?.unit.name : "",
      size: unit?.unit.size,
      type: unit?.unit.type ? unit.unit.type : "",
      price: unit?.unit.price,
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    dispatch(updateUnit(data, id));
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
          <CardTitle tag="h4">Edit Unit</CardTitle>
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
                  <Label for="nameVertical">Unit Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={data?.name}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Unit Name"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <Label for="typeVertical">Type</Label>

                <FormGroup>
                  <select
                    value={data?.type}
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
              <Col sm="12">
                <Label for="sizeVertical">Size</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="size"
                    id="size"
                    value={data?.size}
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
                    value={data?.price}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="price"
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
export default UnitEdit;
