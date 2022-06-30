import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { backend } from '../../../api/index'
import { useParams } from "react-router-dom";
import { setAlertMessage } from "../../../features/alert/alert.action";
import { getUser, updateUser} from "../../../features/users/user.action";

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

const DigitalMarketerEdit = ({ }) => {
    //body
   // const [successMessage, setSuccessMessage] = useState(null)

   const dispatch = useDispatch()

   const { id } = useParams()
   const { user,users, loading } = useSelector((state) => state.users)
   let regEmail =
   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

   const [data, setData] = useState({
       first_name: "",
       last_name: "",
       email: "",
       age: ""
   })
   function resetForm() {
       setData({
           first_name: "",
           last_name: "",
           email: "",
           age: ""
       })
   }

   const fetchCurrentUser = async () => {
       try {
//           dispatch(getUser(id))
           const user = users.filter(user => user._id === id)

           setData({
               first_name: user[0]?.first_name,
               last_name: user[0]?.last_name,
               email: user[0]?.email,
               age: user[0]?.age,
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
        if (!data.email || !data.first_name || !data.last_name || !data.age) {
            dispatch(setAlertMessage("Please fill properly.", "error"));
            return;
        }
        if (data.email && !regEmail.test(data.email)) {
            dispatch(setAlertMessage("Invalid Email", "error"));
            return;
        }

            dispatch(
        updateUser(
          {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            age: data.age,
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
                <CardTitle tag='h4'>Edit Digital Marketer Employee</CardTitle>
            </CardHeader>

            <div className="alert-container">
                <Alert />
            </div>

            <CardBody>
                <Form onSubmit={(event) => submit(event)} >
                    <Row   style={{
                        border: '1px solid #2e272538',
                        padding: '1px 20px 20px 20px'}}>
                        {/* <Col sm='3' >
                            <FormGroup>
                                <div><img className='custom-img-dimension' src={data.profilePicture} /></div>
                                <Label for='profilePicture'>User Profile Image</Label>
                                <Input
                                    type="file"
                                    name='profilePicture'
                                    id='profilePicture'
                                    onChange={(e) => uploadFile(e.target.files[0], 'profilePicture')}
                                    required
                                >
                                </Input>
                                
                            </FormGroup>
                        </Col> */}
                    
                        <Col sm='12'>
                            <FormGroup>
                                <Label for='first_name'>First Name</Label>
                                <Input type='text' name='first_name' id='first_name' value={data.first_name} required onChange={(e) => handleUserData(e)} placeholder='first name'
                                />
                            </FormGroup>
                        </Col>

                         <Col sm='12'>
                            <FormGroup>
                                <Label for='last_name'>Last Name</Label>
                                <Input type='text' name='last_name' id='last_name' value={data.last_name} required onChange={(e) => handleUserData(e)} placeholder='last name'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='email'>Enter Your Email</Label>
                                <Input type='email' name='email' id='email' value={data.email} required onChange={(e) => handleUserData(e)} placeholder='your email'
                                />
                            </FormGroup>
                        </Col>
                        {/* <Col sm='12'>
                            <FormGroup>
                                <Label for='password'>Password</Label>
                                <Input type='password' name='password' id='password' value={data.password} required onChange={(e) => handleUserData(e)} placeholder='enter password'
                                />
                            </FormGroup>
                        </Col> */}

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='age'>Enter Your Age</Label>
                                <Input type='number' name='age' id='age' value={data.age} required onChange={(e) => handleUserData(e)} placeholder='Enter age'
                                />
                            </FormGroup>
                        </Col>

                        {/* <Col sm='12'>
                            <FormGroup>
                            <Label for='gender'>Select Gender</Label>
                                <select value={data.gender} required onChange={(e) => handleUserData(e)}>
                                <option>--- Please Select Option ---</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                </select>
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='role_id'>Select Any Role</Label>
                                <select value={data.role_id} required onChange={(e) => handleUserData(e)}>
                                <option>--- Please Select Option ---</option>
                                <option value="teamLead">Team Lead</option>
                                <option value="salesRep">Sales Rep</option>
                                <option value="digitalMarketer">Digital Marketer</option>
                                </select>
                            </FormGroup>
                        </Col> */}

                        {/* <Col sm='12'>
                            <FormGroup>
                                <Label for='cnic'>CNIC No</Label>
                                <Input type='text' name='cnic' id='cnic' value={data.cnic} onChange={(e) => handleUserData(e)} placeholder='Enter User CNIC'
                                />
                            </FormGroup>
                        </Col>

                        <Col sm='12'>
                            <FormGroup>
                                <Label for='mobile_no'>Mobile Number  </Label>
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
export default DigitalMarketerEdit;