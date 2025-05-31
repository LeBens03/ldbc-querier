import { Card, Typography, Box, Divider, Modal, IconButton, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function LanguageCount({ open, onClose, languageCounts }) {
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
                    minWidth: 350,
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    outline: 'none',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Posts Count by Language</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List>
                    {languageCounts.map(lang => (
                        <ListItem key={lang.language} sx={{ py: 1 }}>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <span>{lang.language}</span>
                                        <span style={{ fontWeight: 'bold' }}>{lang.count}</span>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
}