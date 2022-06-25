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


const ClientEdit = ({ }) => {
    //body

    const [successMessage, setSuccessMessage] = useState(null)
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

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [successMessage])

    const submit = async (event) => {

        // /role/{role}/user/{user}

        event.preventDefault()

        try {

            setSuccessMessage("Update Client Successfully")
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

                <CardTitle tag='h4'>Edit Client</CardTitle>
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
                                <Label for='clientIdVertical'>Client ID</Label>
                                <Input type='text' name='clientId' id='clientId' value={data.clientId} required onChange={(e) => handleUserData(e)} placeholder='Client Id' readOnly
                                />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='nameVertical'>Enter Client Name</Label>
                                <Input type='text' name='name' id='name' value={data.name} required onChange={(e) => handleUserData(e)} placeholder='Enter Client Name'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='emailVertical'>Client Email</Label>
                                <Input type='email' name='email' id='email' value={data.email} required onChange={(e) => handleUserData(e)} placeholder='Client Email'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='phoneVertical'>Phone Number 1</Label>
                                <Input type='number' name='phone' id='phone' value={data.phone} onChange={(e) => handleUserData(e)} placeholder='Enter Phone Number 1'
                                />
                            </FormGroup>
                        </Col>
                        
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='phone2Vertical'>Phone Number 2</Label>
                                <Input type='number' name='phone2' id='phone2' value={data.phone2} onChange={(e) => handleUserData(e)} placeholder='Enter Phone Number 2'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='3' >
                            <FormGroup>
                                <div><img className='custom-img-dimension' src={data.image} /></div>
                                <Label for='cnicFrontVertical'>Client CNIC Front</Label>
                                <Input
                                    type="file"
                                    name='image'
                                    id='cnicFront'
                                    onChange={(e) => handleImage(e)}
                                    required
                                >
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col sm='3' >
                            <FormGroup>
                                <div><img className='custom-img-dimension' src={data.image} /></div>
                                <Label for='cnicBackVertical'>Client CNIC Back</Label>
                                <Input
                                    type="file"
                                    name='image'
                                    id='cnicBack'
                                    onChange={(e) => handleImage(e)}
                                    required
                                >
                                </Input>                                
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
export default ClientEdit;