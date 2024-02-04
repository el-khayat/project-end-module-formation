import { Box, Button, Paper, Rating, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserFormateurService from '../../services/formateurService';
import FeedbackService from '../../services/feedbackServices';
import Base64 from 'base-64';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FeedbackPage = () => {
    const [value, setValue] = React.useState(3);
    const [feedback, setFeedback] = useState("");
    const [formateur, setFormateur] = useState({});
    const [individual, setIndividual] = useState({});
    const [code, setCode] = useState("");
    const [done, setDone] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [error, setError] = useState(false);


    const fetchData = async  ()=>{


        let url = window.location.href;
        let queryString = url.split('?')[1];
        let params = new URLSearchParams(queryString);
        
        const token = params.get('token');
        await setCode(token)
        let exist = await FeedbackService.checkIfFeedbackAlreadySubmited(token);
        setSubmited(exist)
        if(exist){
            console.log("Opppst you are already submited the feedback :"+ exist);
        }else{
            console.log("Okay you can submit the feedback :"+ exist);
        }
        try{
            queryString = Base64.decode(token)
            params = new URLSearchParams(queryString);
            const individualId = params.get('individualId');
            const formateurId = params.get('formateurId');
            
            if(!individualId || !formateurId){
                setError(true)
            }
            
            console.log("token is :" + token);
            console.log("decoded is :" + Base64.decode(token));
            console.log(individualId); 
            console.log(formateurId);
            if(formateurId){
                
                const formateur = await UserFormateurService.getFormateurById(formateurId);
                await setFormateur(formateur);
            } 
            if(individualId){
                const inidiv = await FeedbackService.getIndividualById(individualId);
                await setIndividual(inidiv);
            }
        }catch(e){
            setError(true)
            console.log("Invalid token",e.message)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    
    const onSubmit =async ()=>{
        
        const data = {
            note:value,
            message:feedback,
            code:code,
            individual:individual.id||null,
            user: formateur.id
        }
        FeedbackService.createFeedback(data)
        setDone(true)
    }

    

    return (
        <div>
            <Paper>
                <Box sx={style}>


                {error ? (<Typography id="modal-modal-title" variant="h6" component="h2">
                        Opps something went wrong please check your link
                    </Typography>) : done ? (
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Your feedback submited thank you 
                    </Typography>
                ): submited ? (
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        You are already submited your feedback 
                    </Typography>
                ):(<>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Help us make our training even better!
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ m: 2 }}>
                        Hi {individual?.name}, We hope you enjoyed your recent training session led by {formateur?.name}. 
                        As part of our commitment to providing high-quality training experiences, 
                        we value your feedback and invite you to share your thoughts on the session and the instructor.
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ m: 2 }}>
                        Please take a few minutes to complete the following feedback form and provide your valuable insights.
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ marginTop: 2 }}>
                        Rating
                    </Typography>
                    <Box  sx={{ my: 1 }}  >

                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            size="large"
                        />

                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Feed Back"
                            multiline
                            rows={4}
                            value={feedback}
                            onChange={(e) => { setFeedback(e.target.value) }}
                            sx={{ my: 2 }}
                        />

                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    </Box>
                    <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }} >
                        <Button 
                            variant="contained" 
                            onClick={onSubmit} 
                            fullWidth
                        >
                            Submit Feedback
                        </Button>
                    </Box>
                    </>
                )
                }
                    
                </Box>
            </Paper>
        </div>
    )
}

export default FeedbackPage
