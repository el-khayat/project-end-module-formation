import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ImageService from '../../services/imageService'; 

const FormationsCards = ({ formations, onEnroll }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [imageDataMap, setImageDataMap] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const imageDataPromises = formations.map(async (formation) => {
        try {
          const imageDataArrayBuffer = await ImageService.getImage(formation.path);
          const imageDataBase64 = arrayBufferToBase64(imageDataArrayBuffer);
          return { formationId: formation.id, imageData: imageDataBase64 };
        } catch (error) {
          console.error('Error loading image:', error);
          return null;
        }
      });

      const imageDataList = await Promise.all(imageDataPromises);
      const imageDataMap = imageDataList.reduce((acc, item) => {
        if (item) {
          acc[item.formationId] = item.imageData;
        }
        return acc;
      }, {});
      setImageDataMap(imageDataMap);
    };

    fetchImages();
  }, [formations]);

  const arrayBufferToBase64 = (arrayBuffer) => {
    const binary = [];
    const bytes = new Uint8Array(arrayBuffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary.push(String.fromCharCode(bytes[i]));
    }
    return btoa(binary.join(''));
  };

  const handleExpandClick = (formationId) => {
    if (expandedId === formationId) {
      setExpandedId(null);
    } else {
      setExpandedId(formationId);
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      {formations.map((formation) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={formation.id}>
          <Card
  sx={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, box-shadow 0.3s',
    borderRadius: '10px',
    border: '1px solid #e0e0e0', // Add a border
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.4)',
    },
    backgroundColor: '#f5f5f5', // Set the background color of the card
  }}
>

            {imageDataMap[formation.id] && (
              <CardMedia
                component="img"
                height="200"
                src={`data:image/jpeg;base64,${imageDataMap[formation.id]}`}
                alt="Logo"
                sx={{ borderRadius: '10px 10px 0 0' }}
              />
            )}
            <CardContent sx={{ backgroundColor: '#f7f7f7', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="div" sx={{ marginBottom: '-5px', fontWeight: 'bold', color: '#333', fontSize: '1.5rem' }}>
                {formation.subject}
              </Typography>
              <Typography color="text.secondary" gutterBottom sx={{ fontSize: '14px', marginBottom: '10px', color: '#555' }}>
                {formation.city} - <span style={{ fontWeight: 'bold' }}>{formation.numberHours} Hours </span>
              </Typography>
              <Typography variant="body1" component="p" sx={{ fontSize: '16px', marginBottom: 'auto', color: '#777', maxHeight: expandedId === formation.id ? 'none' : '3em', overflow: 'hidden' }}>
                {formation.descreption}
              </Typography>
              {formation.descreption.length > 100 && (
                <div style={{ textAlign: 'right' }}> {/* Container for right-aligned button */}
                  <Button onClick={() => handleExpandClick(formation.id)} sx={{ color: '#185bd9', textTransform: 'none', marginBottom: '10px' }}>
                    {expandedId === formation.id ? 'See Less' : 'See More'}
                  </Button>
                </div>
              )}
              <div style={{ marginTop: 'auto' }}> {/* Container for price and enroll button */}
                <Typography variant="body2" component="p" sx={{ fontSize: '14px', marginBottom: '10px', color: '#777', fontWeight: 'bold' }}>
                  Price: {formation.price} MAD
                </Typography>
                <Button variant="contained" onClick={() => onEnroll(formation.id)} sx={{ backgroundColor: '#185bd9', color: 'white', '&:hover': { backgroundColor: '#1f0e9c' } }}>
                  Enroll
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FormationsCards;
