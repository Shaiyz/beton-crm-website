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
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Alert from "../../components/Alert/Alert";
import { useDispatch } from "react-redux";
import * as xlsx from "xlsx";
import { addLeads } from "../../features/leads/leads.action";
import { setAlertMessage } from "../../features/alert/alert.action";

const LeadsExcelAdd = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState(null);
  const { projects } = useSelector((state) => state.projects);
  const [data, setData] = useState({
    addedBy: userInfo._id,
    assignedTo: "",
  });

  function resetForm() {
    document.getElementById("excelLeads").value = "";
    setLeads(null);
    setData({
      addedBy: userInfo._id,
      assignedTo: "",
    });
  }

  const AssigningOptions =
    userInfo.role == "digitalMarketer"
      ? users.filter((i) => i.role == "teamLead")
      : users;

  function handleUserData(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  const readExcel = (e) => {
    e.preventDefault();
    setLoading(true);
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        if (
          json[0]["full_name"] === undefined ||
          json[0]["phone_number"] === undefined ||
          json[0]["city"] === undefined
        ) {
          dispatch(
            setAlertMessage(
              "full_name,phone_number or city are required as column names.",
              "error"
            )
          );
          document.getElementById("excelLeads").value = "";
        } else {
          setLeads(json);
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    dispatch(addLeads({ createdBy: userInfo._id, ...data, leads: leads }));
  };

  return (
    <div>
      <Card
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          padding: "0px 20px",
        }}
      >
        <CardHeader
          style={{
            backgroundColor: "#1F1D61",
            borderRadius: "10px",
            padding: "20px 20px ",
            color: "white",
            marginTop: "40px",
            marginBottom: "20px",
            fontWeight: "100px",
            fontSize: "16px",
          }}
        >
          <CardTitle tag="h4">Add New Leads</CardTitle>
        </CardHeader>
        <Alert />
        <Form onSubmit={(event) => submit(event)}>
          <Row
            style={{
              border: "1px solid #2e272538",
              padding: "1px 20px 20px 20px",
            }}
          >
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
                <Label for="excelLeads">Upload Leads</Label>
                <Input
                  type="file"
                  name="excelLeads"
                  id="excelLeads"
                  required
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={(e) => readExcel(e)}
                ></Input>
              </FormGroup>
            </Col>

            <Col sm="12">
              <Label for="assignToVertical"> Assign To </Label>
              <FormGroup>
                <select
                  value={data.assignedTo}
                  id="assignedTo"
                  onChange={(e) => handleUserData(e)}
                  required
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

            <Col sm="12">
              <FormGroup className="d-flex mb-0" style={{ marginTop: "10px" }}>
                <Button
                  className="form_submit_btn"
                  type="submit"
                  style={{ marginInline: "10px" }}
                  disabled={loading || leads == null}
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
      </Card>
    </div>
  );
};

export default LeadsExcelAdd;
