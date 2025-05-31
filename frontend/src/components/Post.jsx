import React from 'react';
import { Card, CardContent, Typography, CardHeader } from '@mui/material';

export default function PostCard({ post }) {
  return (
    <Card sx={{
        width: 400,
        height: 350,
        margin: 2,
        boxSizing: 'border-box',
        background: '#fff',
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(60,60,60,0.08)',
      }}>
      <CardHeader
        title={`Post ID: ${post.id}`}
        subheader={`Creator Person ID: ${post.CreatorPersonId}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>Content:</strong> {post.content}<br />
          <strong>Length:</strong> {post.length}<br />
          <strong>Browser Used:</strong> {post.browserUsed}<br />
          <strong>Location IP:</strong> {post.locationIP}<br />
          <strong>Language:</strong> {post.language}<br />
          <strong>Location Country ID:</strong> {post.LocationCountryId}<br />
          <strong>Container Forum ID:</strong> {post.ContainerForumId}<br />
          <strong>Creation Date:</strong> {post.creationDate}
        </Typography>
      </CardContent>
    </Card>
  );
}