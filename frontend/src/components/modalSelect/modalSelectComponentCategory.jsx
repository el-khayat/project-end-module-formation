import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'

import CategoryService from '../../services/categoryService'
import "./modalAddEventStyles.css"
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalSelectCategory = ({open,handleClose,AssignCategory}) => {

    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        async function  fetchData() {
            setCategories(await CategoryService.getAllCategies() )
            console.log(categories);
        }     
        fetchData()  

    },[])

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
        console.log("category ",category);
    };

    const handelSelectCategory = () => {
        console.log("category in selcting ...",category);
        AssignCategory(category)
    };

    return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select Category
                    </Typography>
                    <CancelPresentationIcon onClick={handleClose} sx={{position:"absolute",top:0,right:0,cursor:"pointer"}}/>
                    <Box  sx={{height:"56px",my:1}}  >
                     </Box>
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Formateur"
                            onChange={handleChangeCategory}
                        >
                            {categories.map(category=>{
                                return (<MenuItem 
                                value={category.id} 
                                key={category.id}>
                                {category.title}
                                </MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <Box sx={{ my: 2,display: 'flex', justifyContent: 'center' }} >
                    <Button variant="contained" onClick={handelSelectCategory} fullWidth>Assign</Button>
                    </Box>
                </Box>
            </Modal>
    )
}

export default ModalSelectCategory
