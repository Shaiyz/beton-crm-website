import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { backend } from '../../../api/index'
import { useParams } from "react-router-dom";
import { setAlertMessage } from "../../../features/alert/alert.action";
import { getClient, updateClient } from "../../../features/users/user.action";

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


const ClientEdit = ({ }) => {
    //body
    // const [successMessage, setSuccessMessage] = useState(null)
    const dispatch = useDispatch()

    const { id } = useParams()
    const { user, users, loading } = useSelector((state) => state.users)
    let regEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [data, setData] = useState({

        clientId: "",
        name: "",
        email: "",
        phone: "",
        phone2: "",
        cnicFornt: "",
        cnicBack: ""
    })
    function resetForm() {
        setData({
            clientId: "",
            name: "",
            email: "",
            phone: "",
            phone2: "",
            cnicFornt: "",
            cnicBack: ""
        })
    }
    const fetchCurrentUser = async () => {
        try {
            //           dispatch(getUser(id))
            const user = users.filter(user => user._id === id)

            setData({
                clientId: user[0]?.clientId,
                name: user[0]?.name,
                email: user[0]?.email,
                phone: user[0]?.phone,
                phone2: user[0]?.phone2,
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
        if (!data.email || !data.name || !data.phone || !data.phone2) {
            dispatch(setAlertMessage("Please fill properly.", "error"));
            return;
        }
        if (data.email && !regEmail.test(data.email)) {
            dispatch(setAlertMessage("Invalid Email", "error"));
            return;
        }

        dispatch(
            updateClient(
                {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    phone2: data.phone2,
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

                <CardTitle tag='h4'>Edit Client</CardTitle>
            </CardHeader>

            {successMessage && <UncontrolledAlert color='success'>
                <div className='alert-body'>
                    {successMessage}
                </div>
            </UncontrolledAlert>}
            <CardBody>
                <Form onSubmit={(event) => submit(event)} >
                    <Row style={{
                        border: '1px solid #2e272538',
                        padding: '1px 20px 20px 20px'
                    }}>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='clientId'>Client ID</Label>
                                <Input type='text' name='clientId' id='clientId' value={data.clientId} required onChange={(e) => handleUserData(e)} placeholder='Client Id' readOnly
                                />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='name'>Enter Client Name</Label>
                                <Input type='text' name='name' id='name' value={data.name} required onChange={(e) => handleUserData(e)} placeholder='Enter Client Name'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='email'>Client Email</Label>
                                <Input type='email' name='email' id='email' value={data.email} required onChange={(e) => handleUserData(e)} placeholder='Client Email'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='phone'>Phone Number 1</Label>
                                <Input type='number' name='phone' id='phone' value={data.phone} onChange={(e) => handleUserData(e)} placeholder='Enter Phone Number 1'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='phone2'>Phone Number 2</Label>
                                <Input type='number' name='phone2' id='phone2' value={data.phone2} onChange={(e) => handleUserData(e)} placeholder='Enter Phone Number 2'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='3' >
                            <FormGroup>
                                <div><img className='custom-img-dimension' src={data.image} /></div>
                                <Label for='cnicFront'>Client CNIC Front</Label>
                                <Input
                                    type="file"
                                    name='cnicFront'
                                    id='cnicFront'
                                    onChange={(e) => uploadFile(e.target.files[0], 'cnicFront')}
                                    required
                                >
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col sm='3' >
                            <FormGroup>
                                <div><img className='custom-img-dimension' src={data.image} /></div>
                                <Label for='cnicBack'>Client CNIC Back</Label>
                                <Input
                                    type="file"
                                    name='cnicBack'
                                    id='cnicBack'
                                    onChange={(e) => uploadFile(e.target.files[0], 'cnicBack')}
                                    required
                                >
                                </Input>
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
export default ClientEdit;