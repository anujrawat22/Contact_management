import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import React from 'react'
import { useForm } from 'react-hook-form'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditModel = ({ contacts, setContacts, setisEditted, name, phoneNumber, email, _id }) => {
    const token = Cookies.get('token')
    const { register, handleSubmit, formState: { errors } } = useForm()

    const editForm = async (data) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/contacts/${_id}`, { ...data }, { headers: { Authorization: `bearer ${token}` } })

            const updatedContacts = contacts.map((contact) => {
                if (contact._id === response.data.contact._id) {

                    return response.data.contact

                }
                return contact
            })
            Swal.fire(
                {
                    title: 'Contact Info updated',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }
            )
            setContacts([...updatedContacts])
            setisEditted(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='editModel'>
            <div style={{ width: '100%', display: 'flex', flexDirection: "row-reverse", margin: "2%" }}>
                <CloseOutlinedIcon onClick={() => setisEditted(false)} />
            </div>
            <Typography variant="h4" textAlign={"center"}>
                Edit Contact
            </Typography>;
            <Container maxWidth="xs" >
                <form onSubmit={
                    handleSubmit(data => editForm(data))
                }>
                    <Stack spacing={3}>
                        <Typography variant='caption' color={"red"} textAlign={'start'}>{errors.name?.message}</Typography>
                        <TextField id="outlined-basic" label="Name" variant="outlined" size="small" defaultValue={name} {...register('name', { required: '*' })} />
                        <Typography variant='caption' color={"red"} textAlign={'start'}>{errors.email?.message}</Typography>
                        <TextField id="outlined-basic" label="Email" variant="outlined" size="small" defaultValue={email}  {...register('email', {
                            required: true, pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: 'Please enter correct email',
                            },
                        })} />
                        <Typography variant='caption' color={"red"} textAlign={'start'}>{errors.phoneNumber?.message}</Typography>
                        <TextField id="outlined-basic" label="Mobile" variant="outlined" size="small" type='input' defaultValue={phoneNumber} {...register('phoneNumber', {
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

export default EditModel