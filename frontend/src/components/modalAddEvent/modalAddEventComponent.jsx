import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'

import FormationService from '../../services/formationService'
import FormateurService from '../../services/formateurService'
import EnterpriseService from '../../services/enterpriseService'
import "./modalAddEventStyles.css"


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

const ModalAddEventComponent = ({open,handleClose,addPlanning}) => {


    const [formateur, setFormateur] = useState('');
    const [formateurs, setFormateurs] = useState([]);

    const [formation, setFormation] = useState('');
    const [formations, setFormations] = useState([]);

    const [enterprise, setEnterprise] = useState('');
    const [enterprises, setEnterprises] = useState([]);

    const [title, setTitle] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');

    useEffect(()=>{
        async function  fetchData() {
            setFormateurs(await FormateurService.getAllFormateurs())
            setFormations(await FormationService.getAllFormations())
            setEnterprises(await EnterpriseService.getAllEntreprises())
        }     
        fetchData()  

    },[])

    const handelStartingDate = (event)=>{
        setStartingDate(event.target.value)
    };
    const handelEndingDate = (event)=>{
        setEndingDate(event.target.value)
    };
    const handleChangeFormateur = (event) => {
        setFormateur(event.target.value);
    };
    const handleChangeFormation = (event) => {
        setFormation(event.target.value);
    };
    const handleChangeEnterprise = (event) => {
        setEnterprise(event.target.value);
    };
    const handelAddPlanning = () => {
        const planning = {
            title : title,
            start: new Date(startingDate),
            end: new Date(endingDate),
            user_id: formateur,
            formation_id: formation,
            entreprise_id:enterprise,
        }
        addPlanning(planning)
    };


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new Planning 
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ m: 2 }}>
                    To schedule a new training session, please proceed to select the desired formation type, the assigned trainer, and the associated company. 
                    </Typography>
                    <Box fullWidth sx={{height:"56px",my:1}}  >
                    
                    <TextField 

                    fullWidth
                     
                    id="outlined-basic" 
                    label="Title" 
                    variant="outlined"   
                    value={title}         
                    onChange={(e)=>{setTitle(e.target.value)}}         
                    sx={{height:"56px"}}                    

                     ></TextField>
                     </Box>
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel id="demo-simple-select-label">formation</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formation}
                            label="Formation"
                            onChange={handleChangeFormation}
                        >
                            {formations.map(formation=>{
                                return (<MenuItem 
                                value={formation.id} 
                                key={formation.id}>
                                {formation.subject}
                                </MenuItem>)
                            })}
                        </Select>
                    </FormControl>
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
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel id="demo-simple-select-label">Enterprise</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={enterprise}
                            label="Enterprise"
                            onChange={handleChangeEnterprise}
                        >
                            {enterprises.map(enterprise=>{
                                return (<MenuItem 
                                value={enterprise.id} 
                                key={enterprise.id}>
                                {enterprise.name}
                                </MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex',flexDirection: 'column',width:"45%" }} >
                        <FormControl>
                        <label> start date :</label>
                        <input style={{width:"100%"}} type='date' name='start_date' value={startingDate} onChange={handelStartingDate}/>
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex',flexDirection: 'column',width:"45%" }}>
                        <FormControl>
                        <label> end date :</label>
                        <input style={{width:"100%"}} type='date' name='end_date' value={endingDate} onChange={handelEndingDate}/>
                        </FormControl>
                    </Box>
                    </Box>
                    <Box sx={{ my: 2,display: 'flex', justifyContent: 'center' }} fullWidth>

                    <Button variant="contained" onClick={handelAddPlanning} fullWidth>Add</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalAddEventComponent
