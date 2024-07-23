import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography } from '@mui/material';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';

function App() {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        axios.get('http://localhost:5000/api/items')
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching items:', error));
    };

    const handleAddOrUpdate = (item) => {
        if (editingItem) {
            setItems(items.map(i => i._id === item._id ? item : i));
            setEditingItem(null);
        } else {
            setItems([...items, item]);
        }
    };

    const handleDeleteItem = (id) => {
        axios.delete(`http://localhost:5000/api/items/${id}`)
            .then(() => {
                setItems(items.filter(item => item._id !== id));
            })
            .catch(error => console.error('Error deleting item:', error));
    };

    return (
        <Container>
            <Typography variant="h2" gutterBottom align="center" style={{ margin: '20px 0' }}>
                MERN CRUD Application
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <AddItem itemToEdit={editingItem} onAddOrUpdate={handleAddOrUpdate} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ItemList items={items} onEdit={setEditingItem} onDelete={handleDeleteItem} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
