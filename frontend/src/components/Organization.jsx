import React from 'react';
import { Card, CardContent, Typography, CardHeader } from '@mui/material';

export default function OrganizationCard({ organization }) {
  return (
    <Card sx={{
        width: 400,
        height: 250,
        margin: 2,
        boxSizing: 'border-box',
        background: '#fff',
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(60,60,60,0.08)',
      }}>
      <CardHeader
        title={organization.name}
        subheader={`Organization ID: ${organization.id}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>Type:</strong> {organization.type}<br />
          <strong>Location Place ID:</strong> {organization.LocationPlaceId}<br />
          <strong>URL:</strong> <a href={organization.url} target="_blank" rel="noopener noreferrer">{organization.url}</a>
        </Typography>
      </CardContent>
    </Card>
  );
}