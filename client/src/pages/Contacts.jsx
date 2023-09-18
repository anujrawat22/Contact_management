import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import ContactTable from '../components/ContactTable'
import { useAuth } from '../Contexts/AuthContext'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import axios from 'axios';
import Cookies from 'js-cookie';
const Contacts = () => {
  const token = Cookies.get('token')
  const [Limit, setLimit] = React.useState(10);
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState(-1)
  const handleChange = (event) => {
    setLimit(event.target.value);
  };
  const [isAdded, setisAdded] = useState(false)
  const handleSort = (e) => {
    setSort(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handlepdf = async () => {
    try {

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/contacts/download/pdf`, { responseType: "blob", headers: { Authorization: `bearer ${token}` } })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url;
      link.setAttribute('download', 'contacts.pdf');
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url);
    }
    catch (error) {
      console.error('Error downloading PDF:', error);
    }
  }

  const { user } = useAuth()

  // console.log(user);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "auto", width: '90dvw', margin: 'auto', marginTop: "5%", boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '10px', padding: '2%' }}>
      <Stack direction='row' spacing={5}>
        <TextField id="filled-basic" label="Search" variant="standard" size="small" onChange={handleSearch} value={search} />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={Limit || 'limit'}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sort}
            onChange={handleSort}
            label="Age"
          >
            <MenuItem value={-1}>Old to new</MenuItem>
            <MenuItem value={1}>New to Old</MenuItem>
          </Select>
        </FormControl>
        <Button variant='outlined' onClick={() => setisAdded(true)}><AddCircleIcon fontSize='large' /></Button>
        <Button variant="outlined" onClick={handlepdf} >
          <DownloadOutlinedIcon />PDF
        </Button>
      </Stack>
      <ContactTable Limit={Limit} title={search} sort={sort} isAdded={isAdded} setisAdded={setisAdded} />
    </div>
  )
}

export default Contacts