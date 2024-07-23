import React from 'react';
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Paper, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ItemList = ({ items, onEdit, onDelete }) => {
    return (
        <Paper style={{ padding: 20, marginTop: 20 }}>
            <Typography variant="h5" gutterBottom>
                Item List
            </Typography>
            <List>
                {items.map(item => (
                    <ListItem key={item._id}>
                        <ListItemText primary={item.name} secondary={item.description} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(item)}>
                                <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item._id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ItemList;
