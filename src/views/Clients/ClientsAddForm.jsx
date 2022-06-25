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
import { backend } from '../../api/index'

const ClientAdd = ({ }) => {
    //body

    const [successMessage, setSuccessMessage] = useState(null)
    const [data, setData] = useState({

        name: '',
        email: '',
        phone: '',
        phone2: '',
        cnicFornt: '',
        cnicBack: ''
    })
    function resetForm() {
        setData({
            name: '',
            email: '',
            phone: '',
            phone2: '',
            cnicFornt: '',
            cnicBack: ''
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [successMessage])

    const submit = async (event) => {

        event.preventDefault()

        try {
            const response = await axios.post('http://127.0.0.1:5000/client/', data)
            console.log(response)
            setSuccessMessage("New Client Added")
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

    async function handleImage(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.files[0]
        setData(newdata)
        console.log(newdata)

        if (e.target.files[0]) {

            let image = new FormData()
            image = image.append('images', e.target.files)
            try {
                const data = await backend.post('/fileupload', { images: image })
                console.log("Image Check", data)
            }
            catch (error) {
                console.log("client error ", error)
            }

            // const reader = new FileReader()
            // reader.addEventListener("load", () => {
            //     const newdata = { ...data }
            //     newdata['cnicFornt'] = reader.result
            //     setData(newdata)
            //     newdata['cnicBack'] = reader.result
            //     setData(newdata)

            //     console.log(newdata.cnicFornt)
            //     console.log(newdata.cnicBack)
            // })
            // reader.readAsDataURL(e.target.files[0])
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
                <CardTitle tag='h4'>Add New Client</CardTitle>
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
                                <Label for='name'>Enter Client Name</Label>
                                <Input type='text' name='name' id='name' value={data.name} required onChange={(e) => handleUserData(e)} placeholder='Enter Client Name'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='email'>Enter Your Email</Label>
                                <Input type='email' name='email' id='email' value={data.email} required onChange={(e) => handleUserData(e)} placeholder='Enter Your Email'
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
                                <Label for='cnicFornt'>CNIC Front</Label>
                                <Input
                                    type="file"
                                    name='cnicFornt'
                                    id='cnicFornt'
                                    onChange={(e) => handleImage(e)}
                                    required
                                >
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col sm='3' >
                            <FormGroup>
                                <div><img className='custom-img-dimension' src={data.image} /></div>
                                <Label for='cnicBack'>CNIC Back</Label>
                                <Input
                                    type="file"
                                    name='cnicBack'
                                    id='cnicBack'
                                    onChange={(e) => handleImage(e)}
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
export default ClientAdd;