import { Card, Typography, Box, Divider, Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Person from "./Person.jsx";

export default function Acquaintances({ open, onClose, acquaintances }) {
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
                    <Typography variant="h6">Acquaintances</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2 }}>
                    {acquaintances.length > 0 ? (
                        acquaintances.map(acq => (
                            <Box key={acq.id} sx={{ flex: '0 0 auto' }}>
                                <Person person={acq} />
                            </Box>
                        ))
                    ) : (
                        <Typography>No acquaintances found.</Typography>
                    )}
                </Box>
            </Box>
        </Modal>
    );
}