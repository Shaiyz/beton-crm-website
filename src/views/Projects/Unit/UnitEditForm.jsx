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


const UnitEdit = ({ }) => {
    //body

    const [successMessage, setSuccessMessage] = useState(null)
    const [data, setData] = useState({
        quantity: "",
        type: "",
        size: "",
        price: ""
    })
    function resetForm() {
        setData({
            quantity: "",
            type: "",
            size: "",
            price: ""
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [successMessage])

    const submit = async (event) => {

        // /role/{role}/user/{user}

        event.preventDefault()

        try {

            setSuccessMessage("Update Unit Successfully")
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
            <CardTitle tag='h4'>Edit Unit</CardTitle>
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
                                <Label for='nameVertical'>Quantity</Label>
                                <Input type='text' name='quantity' id='quantity' value={data.quantity} required onChange={(e) => handleUserData(e)} placeholder='Quantity'
                                />
                            </FormGroup>
                        </Col>

                         <Col sm='12'>
                            <FormGroup>
                                <Label for='typeVertical'>Type</Label>
                                <select value={data.type} required onChange={(e) => handleUserData(e)}>
                                <option value="office">Office</option>
                                <option value="appartment">Appartment</option>
                                <option value="plot">Plot</option>
                                <option value="suite">Suite</option>
                                <option value="penthouse">Penthouse</option>
                                </select>
                                {/* <Input type='text' name='type' id='type' value={data.type} required onChange={(e) => handleUserData(e)} placeholder='Type'
                                /> */}
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='sizeVertical'>Size</Label>
                                <Input type='text' name='size' id='size' value={data.size} required onChange={(e) => handleUserData(e)} placeholder='Size'
                                />
                            </FormGroup>
                        </Col>

                         <Col sm='12'>
                            <FormGroup>
                                <Label for='priceVertical'>Price</Label>
                                <Input type='text' name='price' id='price' value={data.price} required onChange={(e) => handleUserData(e)} placeholder='price'
                                />
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
export default UnitEdit;