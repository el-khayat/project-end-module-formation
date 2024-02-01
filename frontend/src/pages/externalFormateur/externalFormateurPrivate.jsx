import React, { useEffect, useState } from 'react';
import ExternalFormateurService from '../../services/externalFormateurService';
import NavBar from '../../components/navbar/navbarComponent';
import { Box, Paper, Typography } from '@mui/material';
import TableComponent from '../../components/table/tableComponent';
import ConfirmDeleteModal from '../../components/modal/ConfirmDeleteModal';

const ExternalFormateurPrivatePage = () => {

    const [formateurs, setFormateurs] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [elementToDeleteName, setElementToDeleteName] = useState('');
    const [btn1, setBtn1] = useState('');


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

    const handleValidate = (formateurId) => {
        const externalToDelete = formateurs.find((externalFormateur) => externalFormateur.id === formateurId);

        if (externalToDelete) {
            setElementToDeleteName(externalToDelete.name);
            setConfirmDeleteId(formateurId);
            setIsConfirmDeleteModalOpen(true);
            setBtn1("Valider");

        }
    };


    const handleDeleteFormateur = (formateurId) => {
        const externalToDelete = formateurs.find((externalFormateur) => externalFormateur.id === formateurId);

        if (externalToDelete) {
            setElementToDeleteName(externalToDelete.name);
            setConfirmDeleteId(formateurId);
            setIsConfirmDeleteModalOpen(true);
            setBtn1("Delete");
        }
    };


    const confirmDeleteFormateur = async () => {
        try {
            if (btn1 === "Delete") {
                await ExternalFormateurService.deleteExternalFormateur(confirmDeleteId);
                setFormateurs((prevFormateurs) =>
                    prevFormateurs.filter((formateur) => formateur.id !== confirmDeleteId)
                );
                setIsConfirmDeleteModalOpen(false);
            } else if (btn1 === "Valider") {
                await ExternalFormateurService.updateFormateurRole(confirmDeleteId, 'FORMATEUR_ROLE');
                setFormateurs((prevFormateurs) =>
                    prevFormateurs.filter((formateur) => formateur.id !== confirmDeleteId)
                );
                setIsConfirmDeleteModalOpen(false);
            }
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
                        columns={columns}
                        data={formateurs}
                        btn={'Valide'}
                        handleUpdate={(formateurId) =>
                            handleValidate(formateurId)
                        }
                        handleDelete={(formateurId) =>
                            handleDeleteFormateur(formateurId)
                        }
                    />
                </Paper>
            </div>
            <ConfirmDeleteModal
                isOpen={isConfirmDeleteModalOpen}
                itemName={elementToDeleteName}
                text="Are you sure you want to delete the external formateur"
                btn1={btn1}
                onClose={() => setIsConfirmDeleteModalOpen(false)}
                onConfirm={confirmDeleteFormateur}
            />
        </div>
    );
};

export default ExternalFormateurPrivatePage;;