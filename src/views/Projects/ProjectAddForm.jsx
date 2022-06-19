import axios from 'axios'
import React, { useEffect, useState } from 'react'
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


const ProjectAdd = ({ }) => {
    //body

    const [successMessage, setSuccessMessage] = useState(null)
    const [data, setData] = useState({
        pname: "",
        location: ""
    })
    function resetForm() {
        setData({
            pname: "",
            location: ""
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [successMessage])

    const submit = async (event) => {

        // /role/{role}/user/{user}

        event.preventDefault()

        try {

            setSuccessMessage("New Project Added")
            resetForm()
        } catch (error) {
            setSuccessMessage(null)
            console.log(error)
        }

    }

    function handleUserData(e) {
        const newdata = { ...data }
        console.log(newdata)
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    function handleImage(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.files[0]
        setData(newdata)
        console.log(newdata)

        if (e.target.files[0]) {
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                const newdata = { ...data }
                newdata['image'] = reader.result
                setData(newdata)
                console.log(newdata.image)
            })
            reader.readAsDataURL(e.target.files[0])
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
                //   marginLeft: '40px',
                //   marginRight: '50px',
            }}>
                <CardTitle tag='h4'>Add Project</CardTitle>
            </CardHeader>

            {successMessage && <UncontrolledAlert color='success'>
                <div className='alert-body'>
                    {successMessage}
                </div>
            </UncontrolledAlert>}
            <CardBody style={{
                //   marginLeft: '40px',
                //   marginRight: '40px',
                  }}>
                <Form onSubmit={(event) => submit(event)} >
                    <Row   style={{
                        border: '1px solid #2e272538',
                        padding: '1px 20px 20px 20px'}}>                    
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='pnameVertical'>Project Name</Label>
                                <Input type='text' name='pname' id='pname' value={data.pname} required onChange={(e) => handleUserData(e)} placeholder='Project name'
                                />
                            </FormGroup>
                        </Col>

                         <Col sm='12'>
                            <FormGroup>
                                <Label for='locationVertical'>Location</Label>
                                <Input type='text' name='location' id='location' value={data.location} required onChange={(e) => handleUserData(e)} placeholder='Location'
                                />
                            </FormGroup>
                        </Col>

                        {/* <Col sm='12'>
                            <FormGroup>
                                <Label for='EmailVertical'>Enter Your Email</Label>
                                <Input type='email' name='email' id='email' value={data.email} required onChange={(e) => handleUserData(e)} placeholder='your email'
                                />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='passwordVertical'>Password</Label>
                                <Input type='password' name='password' id='password' value={data.password} required onChange={(e) => handleUserData(e)} placeholder='enter password'
                                />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='passwordVertical'>Re-Password</Label>
                                <Input type='password' name='c_password' id='c_password' value={data.c_password} required onChange={(e) => handleUserData(e)} placeholder='re-enter password'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='cnicVertical'>CNIC No</Label>
                                <Input type='text' name='cnic' id='cnic' value={data.cnic} onChange={(e) => handleUserData(e)} placeholder='Enter User CNIC'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='mobileNoVertical'>Mobile Number  </Label>
                                <Input type='number' name='mobile_no' id='mobile_no' value={data.mobile_no} onChange={(e) => handleUserData(e)} placeholder='Enter Mobile Number'
                                />

                            </FormGroup>
                        </Col> */}

                        <Col sm='12'>
                            <FormGroup className='d-flex mb-0' style={{marginTop: '10px'}}>
                                <Button className='form_submit_btn' type='submit' style={{marginInline: '10px'}}>
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
export default ProjectAdd;