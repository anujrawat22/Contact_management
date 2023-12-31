import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../Contexts/AuthContext'
import Cookies from 'js-cookie'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const loginform = async (data) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, { ...data })
            // console.log(response.data.msg);
            Swal.fire(
                {
                    title: response.data.msg,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }
            )
            Cookies.set('token', response.data.token)
            Cookies.set('username' , response.data.username)
            login(response.data.token,response.data.username)
            navigate('/contacts')
        } catch (error) {
            // console.log(error.response.data.err);
            Swal.fire(
                {
                    title: error.response.data.err,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                }
            )
        }

    }

    return (
        <>
            <div style={{ margin: "auto", width: "30dvw", height: "auto", marginTop: "10dvh", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "7rem 0", borderRadius: "5%" }} >
                <Typography variant="h4" textAlign={"center"}>
                    Login
                </Typography>;
                <Container maxWidth="xs" >
                    <form onSubmit={handleSubmit((data) => {
                        loginform(data)
                    })}>
                        <Stack spacing={2}>
                            <Typography variant='caption' color={"red"}>{errors.email?.message}</Typography>


                            <TextField id="outlined-basic" label="Email" variant="outlined" size="small" {...register('email', {
                                required: "Required field *", pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                    message: 'Please enter correct email',
                                },
                            })} />


                            <Typography variant='caption' color={"red"}>{errors.password?.message}</Typography>


                            <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type='password' {...register('password', { required: "Required field *" })} />
                            <Button
                                variant='outlined' type='submit'>LOGIN</Button>
                            <Typography variant='subtitle2' textAlign={"center"}>New User ? <Link to={'/signup'} style={{ color: "#1976d2" }}>Signup</Link></Typography>
                        </Stack>
                    </form>
                </Container>
            </div>

        </>
    )
}

export default Login