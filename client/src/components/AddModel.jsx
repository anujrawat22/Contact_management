import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const AddModel = ({ setisAdded, contacts, setContacts }) => {
    const token = Cookies.get('token')
    const { register, handleSubmit, formState: { errors } } = useForm()

    const addForm = async (data) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/contacts`, { ...data }, { headers: { Authorization: `bearer ${token}` } })
            Swal.fire({
                title: response.data.msg,
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            })
            setContacts([response.data.contact, ...contacts,])
            setisAdded(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='addmodel'>
            <div style={{ width: '100%', display: 'flex', flexDirection: "row-reverse", margin: "2%" }}>
                <CloseOutlinedIcon onClick={() => setisAdded(false)} />
            </div>
            <Typography variant="h4" textAlign={"center"}>
                Add New Contact
            </Typography>;
            <Container maxWidth="xs" >
                <form onSubmit={
                    handleSubmit(data => addForm(data))
                }>
                    <Stack spacing={3}>
                        <Typography variant='caption' color={"red"} textAlign={'start'}>{errors.name?.message}</Typography>
                        <TextField id="outlined-basic" label="Name" variant="outlined" size="small" {...register('name', { required: '*' })} />
                        <Typography variant='caption' color={"red"} textAlign={'start'}>{errors.email?.message}</Typography>
                        <TextField id="outlined-basic" label="Email" variant="outlined" size="small" {...register('email', {
                            required: true, pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: 'Please enter correct email',
                            },
                        })} />
                        <Typography variant='caption' color={"red"} textAlign={'start'}>{errors.phoneNumber?.message}</Typography>
                        <TextField id="outlined-basic" label="Mobile" variant="outlined" size="small" type='input' {...register('phoneNumber', {
                            required: true, minLength: {
                                value: 10,
                                message: "Password must have 10 characters"
                            }
                        })} />

                        <Button variant='outlined' type='submit'>Add</Button>
                    </Stack>
                </form>
            </Container>
        </div>
    )
}

export default AddModel