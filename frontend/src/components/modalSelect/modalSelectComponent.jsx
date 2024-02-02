import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'

import FormateurService from '../../services/formateurService'
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

const ModalSelect = ({open,handleClose,AssignFormateur}) => {


    const [formateur, setFormateur] = useState('');
    const [formateurs, setFormateurs] = useState([]);



    useEffect(()=>{
        async function  fetchData() {
            setFormateurs(await FormateurService.getAllFormateurs())
        }     
        fetchData()  

    },[])


    const handleChangeFormateur = (event) => {
        setFormateur(event.target.value);
        console.log("formateur",formateur);
    };
 
    const handelSelectFormateur = () => {
       
        console.log("formateurId in selcting ...",formateur);
        AssignFormateur(formateur)
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
                        Select Formateur
                    </Typography>
                    <CancelPresentationIcon onClick={handleClose} sx={{position:"absolute",top:0,right:0,cursor:"pointer"}}/>
                    <Box  sx={{height:"56px",my:1}}  >
                     </Box>
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel id="demo-simple-select-label">Formateur</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formateur}
                            label="Formateur"
                            onChange={handleChangeFormateur}
                        >
                            {formateurs.map(formateur=>{
                                return (<MenuItem 
                                value={formateur.id} 
                                key={formateur.id}>
                                {formateur.name}
                                </MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <Box sx={{ my: 2,display: 'flex', justifyContent: 'center' }} >
                    <Button variant="contained" onClick={handelSelectFormateur} fullWidth>Assign</Button>
                    </Box>
                </Box>
            </Modal>
    )
}

export default ModalSelect
