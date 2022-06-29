import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { backend } from '../../../api/index'
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
    Input
} from 'reactstrap'
import Alert from "../../../components/Alert/Alert";
import { getAllLeads, updateLead } from '../../features/leads/leads.action';


const LeadsEdit = ({ }) => {
    //body

    const dispatch = useDispatch()

    const { id } = useParams()
    const { user, users, loading } = useSelector((state) => state.users)
    let regEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [data, setData] = useState({
        assign_to: "",
        client_name: "",
        intrested: "",
    })
    function resetForm() {
        setData({
            assign_to: "",
            client_name: "",
            intrested: "",
        })
    }

    const fetchCurrentUser = async () => {
        try {
            // dispatch(getUser(id))
            const user = users.filter(user => user._id === id)

            setData({
                assign_to: user[0]?.assign_to,
                client_name: user[0]?.client_name,
                intrested: user[0]?.intrested,
            })

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [successMessage])

    const submit = async (event) => {

        event.preventDefault()
        if (!data.email || !data.assign_to || !data.client_name || !data.intrested) {
            dispatch(setAlertMessage("Please fill properly.", "error"));
            return;
        }
        if (data.email && !regEmail.test(data.email)) {
            dispatch(setAlertMessage("Invalid Email", "error"));
            return;
        }

        dispatch(
            updateLead(
                {
                    assign_to: data.assign_to,
                    client_name: data.client_name,
                    intrested: data.intrested,

                },
                id
            )
        );
    }

    function handleUserData(e) {
        console.log(e.target.value)
        const newdata = { ...data }
        console.log(newdata)
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    async function uploadFile(file, id) {
        try {
            const media = new FormData();
            media.append("images", file);
            const { data } = await backend("/fileupload", media, {
                headers: {
                    "content-type": `multipart/form-data`,
                },
            });
            const newdata = { ...data }
            newdata[id] = data.images[0];
            setData(newdata)
        } catch (error) {
            return ''
        }
    }
    return (<>
        <Card style={{
            marginLeft: '20px',
            marginRight: '20px',
        }}>
            <CardHeader style={{
                backgroundColor: "#1F1D61",
                borderRadius: '10px',
                padding: '20px',
                color: "white",
                marginTop: '40px',
                marginBottom: '20px',
                fontWeight: '100px',
                fontSize: '16px',
            }}>
                <CardTitle tag='h4'>Edit Lead</CardTitle>
            </CardHeader>

            <div className="alert-container">
                <Alert />
            </div>

            <CardBody>
                <Form onSubmit={(event) => submit(event)} >
                    <Row style={{
                        border: '1px solid #2e272538',
                        padding: '1px 20px 20px 20px'
                    }}>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='assignToVertical'> Assign To Employee </Label>
                                <select value={data.assign_to} required onChange={(e) => handleUserData(e)}>
                                    <option>--- Please Select Option ---</option>
                                    <option value="Employee 1">Employee Name 1</option>
                                    <option value="Employee 2">Employee Name 2</option>
                                    <option value="Employee 3">Employee Name 3</option>
                                </select>
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='clientNameVertical'>Client Name </Label>
                                <select value={data.client_name} required onChange={(e) => handleUserData(e)}>
                                    <option>--- Please Select Option ---</option>
                                    <option value="Client 1">CLient Name 1</option>
                                    <option value="Client 2">CLient Name 2</option>
                                    <option value="Client 3">CLient Name 3</option>
                                </select>
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='intrestedVertical'>Client Intersted Project </Label>
                                <select value={data.intrested} required onChange={(e) => handleUserData(e)}>
                                    <option>--- Please Select Option ---</option>
                                    <option value="office">Office</option>
                                    <option value="appartment">Appartment</option>
                                    <option value="plot">Plot</option>
                                    <option value="suite">Suite</option>
                                    <option value="penthouse">Penthouse</option>
                                </select>
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup className='d-flex mb-0' style={{ marginTop: '10px' }}>
                                <Button className='form_submit_btn' type='submit' style={{ marginInline: '10px' }}>
                                    Submit
                                </Button>
                                <Button className='form_reset_btn' onClick={resetForm}>
                                    Reset
                                </Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>

            </CardBody>
        </Card>
    </>)
}
export default LeadsEdit;