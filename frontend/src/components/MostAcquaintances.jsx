import { Card, Typography, Box, Divider, Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Person from "./Person.jsx";

export default function MostAcquaintances({ open, onClose, persons }) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                    minWidth: 600,
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    outline: 'none',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Persons with Most Acquaintances</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2 }}>
                    {persons.length > 0 ? (
                        persons.map(person => (
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
                                    {person.acquaintancesCount} acquaintances
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography>No persons found.</Typography>
                    )}
                </Box>
            </Box>
        </Modal>
    );
}