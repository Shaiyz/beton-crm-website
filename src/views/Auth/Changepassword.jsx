import { Button } from "@material-ui/core";
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
  Label,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import Alert from "../../components/Alert/Alert";
import { setAlertMessage } from "../../features/alert/alert.action";
import { changePassword } from "../../features/users/user.action";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

  const [updateId, setUpdateId] = useState(userInfo?._id);
  const [data, setData] = useState({
    curr_pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  function resetForm() {
    setData({
      curr_pass: "",
      confirm_pass: "",
      new_pass: "",
    });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const user = users.find((user) => user._id === id);
      return setUpdateId(user?._id);
    }
    if (userInfo) {
      return setUpdateId(userInfo._id);
    }
  }, [id, userInfo]);

  const submit = async (event) => {
    event.preventDefault();
    if (!data.curr_pass || !data.new_pass) {
      dispatch(setAlertMessage("Please fill properly.", "error"));
      return;
    }
    if (data.confirm_pass !== data.new_pass) {
      dispatch(
        setAlertMessage(
          "Confirm password and new password must match.",
          "error"
        )
      );
      return;
    }
    dispatch(
      changePassword(
        {
          curr_pass: data.curr_pass,
          new_pass: data.new_pass,
        },
        updateId
      )
    );
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
          <CardTitle tag="h4">Change Password</CardTitle>
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
                <Label for="curr_pass">Enter Current Password</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="curr_pass"
                    id="curr_pass"
                    value={data.curr_pass}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Current Password"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="new_pass">Enter New Password</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="new_pass"
                    id="new_pass"
                    value={data.new_pass}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter New Password"
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="new_pass">Enter Confirm Password</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="confirm_pass"
                    id="confirm_pass"
                    value={data.confirm_pass}
                    required
                    onChange={(e) => handleUserData(e)}
                    placeholder="Enter Confirm Password"
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup
                  className="d-flex mb-0"
                  style={{ marginTop: "10px" }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    style={{ marginInline: "10px" }}
                  >
                    Submit
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={resetForm}
                  >
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
export default ChangePassword;
