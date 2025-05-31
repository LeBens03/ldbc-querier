import React, { useState } from 'react'
import { Card, CardContent, Typography, CardHeader, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import Acquaintances from './Acquaintances.jsx';

export default function PersonCard({ person }) {
  const [acquaintances, setAcquaintances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLookupAcquaintances = () => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:3001/api/neo4j/acquaintances/' + person.id)
      .then(response => {
        setAcquaintances(response.data);
        setLoading(false);
        setModalOpen(true);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Box className="loading">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error">
        <Typography variant="h6" color="error">
          {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Card
        sx={{
          width: 400,
          height: 450,
          margin: 2,
          boxSizing: 'border-box',
          background: '#fff',
          borderRadius: 2,
          boxShadow: '0 2px 12px rgba(60,60,60,0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardHeader
          title={`${person.firstName} ${person.lastName}`}
          subheader={`ID: ${person.id}`}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Birthday:</strong> {person.birthday}<br />
            <strong>Gender:</strong> {person.gender}<br />
            <strong>Location City ID:</strong> {person.LocationCityId}<br />
            <strong>Browser Used:</strong> {person.browserUsed}<br />
            <strong>Location IP:</strong> {person.locationIP}<br />
            <strong>Language:</strong> {person.language}<br />
            <strong>Creation Date:</strong> {person.creationDate}<br />
            <strong>Email:</strong>
            <br />
            {Array.isArray(person.email)
              ? person.email.map((e, idx) => (
                  <span key={idx}>
                    {e}
                    <br />
                  </span>
                ))
              : <span>{person.email}</span>
            }
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            onClick={handleLookupAcquaintances}
            disabled={loading}
          >
            Look up acquaintances
          </Button>
        </Box>
      </Card>
      <Acquaintances
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        acquaintances={acquaintances}
      />
    </>
  );
}