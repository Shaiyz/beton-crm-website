import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { backend } from '../../../api/index'
import { useParams } from "react-router-dom";
import { setAlertMessage } from "../../../features/alert/alert.action";
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
import Alert from "../../components/Alert/Alert";
import { changePassword } from '../../features/users/user.action';

const ChangePassword = ({ }) => {
    //body
    //    const [successMessage, setSuccessMessage] = useState(null)
    const dispatch = useDispatch()

    const { id } = useParams()
    const { user,users, loading } = useSelector((state) => state.users)

    const [data, setData] = useState({
        curr_pass: "",
        new_pass: ""
    })
    function resetForm() {
        setData({
            curr_pass: "",
            new_pass: ""
        })
    }
    const fetchCurrentUser = async () => {
        try {
 //           dispatch(getUser(id))
            const user = users.filter(user => user._id === id)
 
            setData({
                curr_pass: user[0]?.curr_pass,
                new_pass: user[0]?.new_pass,
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
    }, [])

    const submit = async (event) => {

        event.preventDefault()
        if (!data.curr_pass || !data.new_pass ) {
            dispatch(setAlertMessage("Please fill properly.", "error"));
            return;
        }
            dispatch(
                changePassword(
          {
            curr_pass: data.curr_pass,
            new_pass: data.new_pass,
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

            <CardTitle tag='h4'>Change Password</CardTitle>
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
                                <Label for='curr_pass'>Enter Current Password</Label>
                                <Input type='text' name='curr_pass' id='curr_pass' value={data.curr_pass} required onChange={(e) => handleUserData(e)} placeholder='Enter Current Password'
                                />
                            </FormGroup>
                        </Col>
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='new_pass'>Enter New Password</Label>
                                <Input type='text' name='new_pass' id='new_pass' value={data.new_pass} required onChange={(e) => handleUserData(e)} placeholder='Enter New Password'
                                />
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
export default ChangePassword;