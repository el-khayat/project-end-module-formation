import React, { useState, useEffect } from 'react';
import { Button, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TableSortLabel, Select, MenuItem, Box, Slider, Typography, Stack } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const FormationsTable = ({ formations, onEnroll }) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCity, setFilterCity] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterPriceRange, setFilterPriceRange] = useState([0, 5000]);
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [cities, setCities] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Extract unique cities and subjects from formations
  useEffect(() => {
    const uniqueCities = [...new Set(formations.map((formation) => formation.city))];
    const uniqueSubjects = [...new Set(formations.map((formation) => formation.subject))];
    setCities(uniqueCities);
    setSubjects(uniqueSubjects);
  }, [formations]);

  const handleSort = (columnId) => {
    const isAsc = sortBy === columnId && sortOrder === 'asc';
    setSortBy(columnId);
    setSortOrder(isAsc ? 'desc' : 'asc');
  };

  const handlePriceRangeChange = (event, newValue) => {
    setFilterPriceRange(newValue);
  };

  const filteredFormations = formations.filter((formation) =>
    (filterCity === '' || formation.city === filterCity) &&
    (filterSubject === '' || formation.subject === filterSubject) &&
    (formation.price >= filterPriceRange[0] && formation.price <= filterPriceRange[1]) &&
    (filterStartDate === null || new Date(formation.date) >= filterStartDate) &&
    (filterEndDate === null || new Date(formation.date) <= filterEndDate)
  );

  const getMaxPrice = () => {
    const maxPrice = Math.max(...formations.map((formation) => formation.price));
    return maxPrice + 100;
  };

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px', marginRight: '16px', width: '200px' }}
        >
          <MenuItem value="">All Cities</MenuItem>
          {cities.map((city, index) => (
            <MenuItem key={index} value={city}>{city}</MenuItem>
          ))}
        </Select>
        <Select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '16px', marginRight: '16px', width: '200px' }}
        >
          <MenuItem value="">All Subjects</MenuItem>
          {subjects.map((subject, index) => (
            <MenuItem key={index} value={subject}>{subject}</MenuItem>
          ))}
        </Select>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: '16px' }}>
          <Typography id="price-range-slider" gutterBottom>
            Price Range
          </Typography>
          <Slider
            value={filterPriceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            aria-labelledby="price-range-slider"
            min={0}
            max={getMaxPrice()}
            sx={{ width: '150px' }} // Adjust the width here
          />
        </Stack>
      </Box>
      <TableContainer sx={{ maxWidth: '90%', margin: '0 auto' }}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'numberHours'}
                  direction={sortOrder}
                  onClick={() => handleSort('numberHours')}
                  IconComponent={sortOrder === 'asc' ? ArrowUpward : ArrowDownward}
                >
                  Number of Hours
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'price'}
                  direction={sortOrder}
                  onClick={() => handleSort('price')}
                  IconComponent={sortOrder === 'asc' ? ArrowUpward : ArrowDownward}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'descreption'}
                  direction={sortOrder}
                  onClick={() => handleSort('descreption')}
                  IconComponent={sortOrder === 'asc' ? ArrowUpward : ArrowDownward}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'subject'}
                  direction={sortOrder}
                  onClick={() => handleSort('subject')}
                  IconComponent={sortOrder === 'asc' ? ArrowUpward : ArrowDownward}
                >
                  Subject
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'city'}
                  direction={sortOrder}
                  onClick={() => handleSort('city')}
                  IconComponent={sortOrder === 'asc' ? ArrowUpward : ArrowDownward}
                >
                  City
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'date'}
                  direction={sortOrder}
                  onClick={() => handleSort('date')}
                  IconComponent={sortOrder === 'asc' ? ArrowUpward : ArrowDownward}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFormations.map((formation) => (
              <TableRow key={formation.id}>
                <TableCell>{formation.id}</TableCell>
                <TableCell>{formation.numberHours}</TableCell>
                <TableCell>{formation.price}</TableCell>
                <TableCell>{formation.descreption}</TableCell>
                <TableCell>{formation.subject}</TableCell>
                <TableCell>{formation.city}</TableCell>
                <TableCell>{new Date(formation.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => onEnroll(formation.id)}>Enroll</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FormationsTable;
