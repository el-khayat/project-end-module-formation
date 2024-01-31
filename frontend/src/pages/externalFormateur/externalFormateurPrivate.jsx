import React, { useEffect, useState } from 'react';
import ExternalFormateurService from '../../services/externalFormateurService';
import NavBar from '../../components/navbar/navbarComponent';
import { Box, Paper, Typography } from '@mui/material';
import TableComponent from '../../components/table/tableComponent';

const ExternalFormateurPrivatePage = () => {

    const [formateurs, setFormateurs] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const formateursData = await ExternalFormateurService.getAllExternalFormateurs();
                setFormateurs(formateursData);
            } catch (error) {
                console.error('Error fetching formateurs:', error);
            }
        };

        fetchData();
    }, []);




    const columns = [
        { id: 'id', label: '#' },
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
        { id: 'phone', label: 'Phone' },
        { id: 'keywords', label: 'Keyword' },

    ];

    const handleValidate = async (formateurId) => {
        try {
            await ExternalFormateurService.updateFormateurRole(formateurId, "FORMATEUR_ROLE");
            const updatedFormateurs = await ExternalFormateurService.getAllExternalFormateurs();
            setFormateurs(updatedFormateurs);
        } catch (error) {
            console.error('Error validating formateur:', error);
        }
    };

    const handleDeleteFormateur = async (formateurId) => {
        try {
            await ExternalFormateurService.deleteExternalFormateur(formateurId);
            setFormateurs((prevFormateurs) =>
                prevFormateurs.filter((formateur) => formateur.id !== formateurId)
            );
        } catch (error) {
            console.error('Error deleting External formateur:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div>
                <Paper fullWidth sx={{ overflow: 'hidden', m: 2, marginTop: '100px' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" component="h1" sx={{ m: 1, marginLeft: '400px' }}>
                            External Formateurs List
                        </Typography>
                    </Box>
                    <TableComponent
                        columns={columns} data={formateurs} btn={'Valide'}
                        handleUpdate={handleValidate} handleDelete={handleDeleteFormateur}
                    />
                </Paper>
            </div>
        </div>
    );
};

export default ExternalFormateurPrivatePage;