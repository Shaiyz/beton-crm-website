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


const LeadsEdit = ({ }) => {
    //body

    const [successMessage, setSuccessMessage] = useState(null)
    const [data, setData] = useState({
        fname: "",
        lname: "",
        email: "",
        assign_to:"",
        client_name: "",
        intrested:""
    })
    function resetForm() {
        setData({
            fname: "",
            lname: "",
            email: "",
            assign_to:"",
            client_name: "",
            intrested:""
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [successMessage])

    const submit = async (event) => {

        // /role/{role}/user/{user}

        event.preventDefault()

        try {

            setSuccessMessage("Update Lead Successfully")
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
             <CardTitle tag='h4'>Edit Lead</CardTitle>
            </CardHeader>

            {successMessage && <UncontrolledAlert color='success'>
                <div className='alert-body'>
                    {successMessage}
                </div>
            </UncontrolledAlert>}
            <CardBody>
                <Form onSubmit={(event) => submit(event)} >
                 <Row   style={{
                        border: '1px solid #2e272538',
                        padding: '1px 20px 20px 20px'}}>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='assignToVertical'> Assign To Employee </Label>
                                <select value={data.assign_to} required onChange={(e) => handleUserData(e)}>
                                <option>--- Please Select Option ---</option>
                                <option value="Employee 1">Employee Name 1</option>
                                <option value="Employee 2">Employee Name 2</option>
                                <option value="Employee 3">Employee Name 3</option>
                                </select>
                                {/* <Input type='text' name='assign_to' id='assign_to' value={data.assign_to} onChange={(e) => handleUserData(e)} placeholder='Assign To'
                                /> */}
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='clientNameVertical'>Client Name </Label>
                                <select value={data.assign_to} required onChange={(e) => handleUserData(e)}>
                                <option>--- Please Select Option ---</option>
                                <option value="Client 1">CLient Name 1</option>
                                <option value="Client 2">CLient Name 2</option>
                                <option value="Client 3">CLient Name 3</option>
                                </select>
                                {/* <Input type='text' name='client_name' id='client_name' value={data.client_name} onChange={(e) => handleUserData(e)} placeholder='Enter Client Name'
                                /> */}
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='intrestedVertical'>Client Intersted Project </Label>
                                <select value={data.type} required onChange={(e) => handleUserData(e)}>
                                <option>--- Please Select Option ---</option>
                                <option value="office">Office</option>
                                <option value="appartment">Appartment</option>
                                <option value="plot">Plot</option>
                                <option value="suite">Suite</option>
                                <option value="penthouse">Penthouse</option>
                                </select>

                                {/* <Input type='number' name='mobile_no' id='mobile_no' value={data.mobile_no} onChange={(e) => handleUserData(e)} placeholder='Enter Mobile Number'
                                /> */}
                            </FormGroup>
                        </Col>

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
export default LeadsEdit;