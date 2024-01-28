import React from 'react'
import { Box,  Modal, Typography } from '@mui/material'




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

const ModalShowEventComponent = ({open, handleClose, planning}) => {





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
                        Event Details
                    </Typography>
                    <hr/>
                    <Typography id="modal-modal-description" sx={{ m: 2,textAlign:"center" }}>
                    {planning?.title}
                    </Typography>
                    
                    <Typography>
                    Formateur :  {planning?.user.name}
                    </Typography>
                    <Typography>
                    Enterprise :  {planning?.entreprise.name}
                    </Typography>
                    <Typography>
                    Formation :  {planning?.formation.subject}
                    </Typography>
                  
                    
                </Box>
            </Modal>
        </div>
    )
}

export default ModalShowEventComponent
