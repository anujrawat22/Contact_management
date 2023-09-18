import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Signup = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const SignupForm = async (data) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, { ...data })
            // console.log(response.data.msg);
            Swal.fire(
                {
                    title: response.data.msg,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }
            )
            navigate('/login')
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
        <div style={{ margin: "auto", width: "30dvw", height: "auto", marginTop: "10dvh", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "7rem 0", borderRadius: "5%" }} >
            <Typography variant="h4" textAlign={"center"}>
                Signup
            </Typography>;
            <Container maxWidth="xs" >
                <form onSubmit={
                    handleSubmit(data => SignupForm(data))
                }>
                    <Stack spacing={3}>
                        <TextField id="outlined-basic" label="Username" variant="outlined" size="small" {...register('name', { required: true })} />
                        <TextField id="outlined-basic" label="Email" variant="outlined" size="small" {...register('email', {
                            required: true, pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: 'Please enter correct email',
                            },
                        })} />
                        <Typography variant='caption' color={"red"}>{errors.email?.message}</Typography>
                        <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type='password' {...register('password', {
                            required: true, minLength: {
                                value: 8,
                                message: "Password must have 8 characters"
                            }
                        })} />
                        <Typography variant='caption' color={"red"}>{errors.password?.message}</Typography>

                        <Button variant='outlined' type='submit'>Signup</Button>
                        <Typography variant='subtitle2' textAlign={"center"}>Already a user ? <Link to={'/login'} style={{ color: "#1976d2" }}>Login</Link></Typography>
                    </Stack>
                </form>
            </Container>
        </div >
    )
}


export default Signup