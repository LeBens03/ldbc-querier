import { useState, useEffect } from 'react'
import { Box, CircularProgress, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

import Person from './components/Person.jsx';
import Post from './components/Post.jsx';
import LanguageCount from './components/LanguageCount.jsx';
import MostAcquaintances from './components/MostAcquaintances.jsx'
import OrganizationCard from './components/Organization.jsx';

import axios from 'axios';
import './App.css'


export default function App() {

  const [posts, setPosts] = useState([]);
  const [persons, setPersons] = useState([]);
  const [year, setYear] = useState('');
  const [postsCountByLanguage, setPostsCountByLanguage] = useState([]);
  const [personsWithMostAcquaintances, setPersonsWithMostAcquaintances] = useState([]);
  const [numberOfPersonsWithMostAcquaintances, setNumberOfPersonsWithMostAcquaintances] = useState(0);
  const [organization, setOrganization] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [minLikesCount, setMinLikesCount] = useState(0);
  const [likesCount, setLikesCount] = useState([]);
  const [numberOfMostActiveOrganizations, setNumberOfMostActiveOrganizations] = useState(0);
  const [mostActiveOrganizations, setMostActiveOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [acquaintancesModalOpen, setAcquaintancesModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:3001/api/mongodb/')
    .then(response => {
        setPosts(response.data);
        setLoading(false);
    })
    .catch(error => {
        setError(error);
        setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:3001/api/neo4j/')
    .then(response => {
        setPersons(response.data);
        setLoading(false);
    })
    .catch(error => {
        setError(error);
        setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:3001/api/neo4j/organizations')
    .then(response => {
        setOrganization(response.data);
        setLoading(false);
    })
    .catch(error => {
        setError(error);
        setLoading(false);
    });
  }, []);

  const handleFilterByYear = () => {
    if (!year) return;
    setFilterLoading(true);
    setError(null);
    axios.get(`http://localhost:3001/api/mongodb/${year}`)
      .then(response => {
        setPosts(response.data);
        setFilterLoading(false);
      })
      .catch(error => {
        setError(error);
        setFilterLoading(false);
      });
  };

  const handlePostsCountByLanguage = () => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:3001/api/mongodb/count')
      .then(response => {
        setPostsCountByLanguage(response.data);
        setLoading(false);
        setModalOpen(true);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  const handlePersonsWithMostAcquaintances = () => {
    setLoading(true);
    setError(null);
    axios.get(`http://localhost:3001/api/neo4j/most-acquaintances/${numberOfPersonsWithMostAcquaintances}`)
      .then(response => {
        setPersonsWithMostAcquaintances(response.data);
        setLoading(false);
        setAcquaintancesModalOpen(true);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  const handlePersonsByOrganizationAndLikes = () => {
    if (!selectedOrganization) {
      setLikesCount([]);
      setFilterLoading(true);
      setError(null);
      axios.get('http://localhost:3001/api/neo4j/')
        .then(response => {
          setPersons(response.data);
          setFilterLoading(false);
        })
        .catch(error => {
          setError(error);
          setFilterLoading(false);
        });
      return;
    }
    setFilterLoading(true);
    setError(null);
    axios.get(`http://localhost:3001/api/crossdb/members/${selectedOrganization}/${minLikesCount}`)
      .then(response => {
        const res = response.data;
        setPersons(res.map(obj => obj.person));
        setLikesCount(res.map(obj => ({ id: obj.person.id, likesCount: obj.likesCount })));
        setFilterLoading(false);
      })
      .catch(error => {
        setError(error);
        setFilterLoading(false);
      });
  }

  const handleMostActiveOrganizations = () => {
    setLoading(true);
    setError(null);
    axios.get(`http://localhost:3001/api/crossdb/organizations/${numberOfMostActiveOrganizations}`)
      .then(response => {
        setMostActiveOrganizations(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

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
      <div className='main-container'>
        <h2 className='section-title'>Persons</h2>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center',  gap: 2, mb: 2 }}>
          <TextField
            label="X"
            size="small"
            value={numberOfPersonsWithMostAcquaintances}
            onChange={e => setNumberOfPersonsWithMostAcquaintances(e.target.value)}
          />
          <Button variant="contained" onClick={handlePersonsWithMostAcquaintances} >
            Get X Persons with Most Acquaintances
          </Button>
          {filterLoading && <CircularProgress size={24} />}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', gap: 2, mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel id="organization-select-label">Organization</InputLabel>
            <Select
              labelId="organization-select-label"
              value={selectedOrganization}
              label="Organization"
              onChange={e => setSelectedOrganization(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {organization.map(org => (
                <MenuItem key={org.id} value={org.name}>
                  {org.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Min Likes Count"
            size="small"
            value={minLikesCount}
            onChange={e => setMinLikesCount(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', gap: 2, mb: 2 }}>
          <Button variant="contained" onClick={handlePersonsByOrganizationAndLikes} >
            Filter by Organization and minimum number of Posts liked
          </Button>
          {filterLoading && <CircularProgress size={24} />}
        </Box>

        <Box className="flex-row-scroll">
          {persons.length > 0 ? (
            selectedOrganization && likesCount.length > 0
              ? persons.map((person, idx) => (
                  <Box key={person.id} sx={{ flex: '0 0 auto', position: 'relative' }}>
                    <Person person={person} />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'primary.main',
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 'bold',
                        fontSize: 14,
                        boxShadow: 1,
                      }}
                    >
                      {likesCount[idx]?.likesCount} likes
                    </Box>
                  </Box>
                ))
              : persons.map(person => (
                  <Box className="card" key={person.id} sx={{ flex: '0 0 auto' }}>
                    <Person person={person} />
                  </Box>
                ))
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <p>No persons available.</p>
            </Box>
          )}
        </Box>

        <MostAcquaintances
          open={acquaintancesModalOpen}
          onClose={() => setAcquaintancesModalOpen(false)}
          persons={personsWithMostAcquaintances}
        />

        <h2 className='section-title'>Posts</h2>

        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'center', gap: 2, mb: 2 }}>
          <TextField
            label="Filter by year"
            size="small"
            value={year}
            onChange={e => setYear(e.target.value)}
          />
          <Button variant="contained" onClick={handleFilterByYear} disabled={filterLoading || !year}>
            Filter
          </Button>
          {filterLoading && <CircularProgress size={24} />}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', gap: 2, mb: 2 }}>
          <Button variant="contained" onClick={handlePostsCountByLanguage} >
            Get Posts count by language
          </Button>
        </Box>

        <Box className="flex-row-scroll">
          {posts.length > 0
            ? posts.map(post => (
                <Box className="card" key={post.id} sx={{ flex: '0 0 auto' }}>
                  <Post post={post} />
                </Box>
              ))
            : (
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <p>No posts available.</p>
              </Box>
            )}
        </Box>

        <LanguageCount
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          languageCounts={postsCountByLanguage}
        />

        <h2 className='section-title'>Organizations</h2>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', gap: 2, mb: 2 }}>
          <TextField
            label="X"
            size="small"
            value={numberOfMostActiveOrganizations}
            onChange={e => setNumberOfMostActiveOrganizations(e.target.value)}
          />
          <Button variant="contained" onClick={handleMostActiveOrganizations} >
            Get X Most Active Organizations
          </Button>
          {filterLoading && <CircularProgress size={24} />}
        </Box>   
         
        <Box className="flex-row-scroll">
          {mostActiveOrganizations.length > 0 ? (
            mostActiveOrganizations.map(org => (
              <Box className="card" key={org.id} sx={{ flex: '0 0 auto', position: 'relative', pb: 7 }}>
                <OrganizationCard organization={org} />
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 100,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 2,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 1.5,
                      py: 0.2,
                      borderRadius: 1,
                      fontWeight: 'bold',
                      fontSize: 13,
                      boxShadow: 1,
                    }}
                  >
                    {org.likesCount} likes
                  </Box>
                  <Box
                    sx={{
                      bgcolor: 'secondary.main',
                      color: 'white',
                      px: 1.5,
                      py: 0.2,
                      borderRadius: 1,
                      fontWeight: 'bold',
                      fontSize: 13,
                      boxShadow: 1,
                    }}
                  >
                    {org.totalAcquaintances} acquaintances
                  </Box>
                  <Box
                    sx={{
                      bgcolor: 'success.main',
                      color: 'white',
                      px: 1.5,
                      py: 0.2,
                      borderRadius: 1,
                      fontWeight: 'bold',
                      fontSize: 13,
                      boxShadow: 1,
                    }}
                  >
                    {org.activityScore} activity score
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', width: '100%' }}>
              <Typography variant="h6" color="textSecondary">
                No organizations available.
              </Typography>
            </Box>
          )}
        </Box>    
      </div>
    </>
  )
}