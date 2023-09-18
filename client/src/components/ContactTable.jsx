import { CircularProgress, Pagination } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import AddModel from './AddModel';
import EditModel from './EditModel';

const ContactTable = ({ Limit, title, sort, isAdded, setisAdded }) => {
    const token = Cookies.get('token')
    // console.log(token);
    const [contacts, setContacts] = useState([])
    const [snum, setSnum] = useState(1)
    const [page, setPage] = useState(1)
    const [editInfo, setEditinfo] = useState({})
    const [isEditted, setisEditted] = useState(false)
    const getContacts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/contacts?page=${page}&limit=${Limit}&title=${title}&sort=${sort}`, { headers: { Authorization: `bearer ${token}` } })
            setContacts(response.data.contacts)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (el) => {
        setisEditted(true)
        setEditinfo(el)

    }

    const handleDelete = async (id) => {
        try {

            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/contacts/${id}`, { headers: { Authorization: `bearer ${token}` } })
            Swal.fire({
                title: response.data.msg,
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            })
            setContacts((prevContact) => prevContact.filter((contact) => contact._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const initialSnum = (page - 1) * Limit + 1;
        setSnum(initialSnum);

        getContacts()
    }, [page, Limit, title, sort])
    return (
        <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", columnGap: '20px' }}>
            <table>
                <thead>
                    <td>S.No</td>
                    <td>Name</td>
                    <td>Mobile</td>
                    <td>Email</td>
                    <td>Created At</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </thead>
                <tbody>
                    {
                        contacts.length > 0 ? contacts.map((el, index) => {

                            return (
                                <tr key={el._id}>
                                    <td>{snum + index}</td>
                                    <td>{el.name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.phoneNumber}</td>
                                    <td>{el.createdAt.split("T")[0]}</td>
                                    <td onClick={() => handleEdit(el)}><ModeEditIcon /></td>
                                    <td onClick={() => {
                                        handleDelete(el._id)
                                    }}><DeleteIcon /></td>
                                </tr>)
                        })
                            :
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><CircularProgress /></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                    }
                </tbody>
            </table>
            <Pagination count={10} color="primary" onChange={(e, value) => {
                setPage(value)
            }} />
            {
                isAdded ? <AddModel setisAdded={setisAdded} contacts={contacts} setContacts={setContacts} />
                    : null
            }
            {
                isEditted ? <EditModel setisEditted={setisEditted} {...editInfo} contacts={contacts} setContacts={setContacts} />
                    :
                    null
            }
        </div>
    )
}

export default ContactTable