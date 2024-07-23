import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';

const AddItem = ({ itemToEdit, onAddOrUpdate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name);
            setDescription(itemToEdit.description);
        }
    }, [itemToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemToEdit) {
            axios.put(`http://localhost:5000/api/items/${itemToEdit._id}`, { name, description })
                .then(response => {
                    onAddOrUpdate(response.data); // Notify parent with the updated item
                    setName('');
                    setDescription('');
                })
                .catch(error => console.error('Error updating item:', error));
        } else {
            axios.post('http://localhost:5000/api/items', { name, description })
                .then(response => {
                    onAddOrUpdate(response.data); // Notify parent with the new item
                    setName('');
                    setDescription('');
                })
                .catch(error => console.error('Error adding item:', error));
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: 20, marginTop: 20 }}>
                <Typography variant="h5" gutterBottom>
                    {itemToEdit ? 'Edit Item' : 'Add Item'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20 }}
                    >
                        {itemToEdit ? 'Update' : 'Add'}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AddItem;
