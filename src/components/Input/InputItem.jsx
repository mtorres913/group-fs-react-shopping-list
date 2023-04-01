import axios from 'axios';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';



function InputItem({ item, fetchItemList }) {

    useEffect(() => {
        // At this point, React is ready!
        fetchItemList();
    }, []); // ! Remember the empty Array


    const deleteItem = (e) => {
        console.log(`Deleting item ${item.id}`);
        axios.delete(`/list/${item.id}`).then((response) => {
            fetchItemList();
        }).catch((error) => {
            console.log(`Error in deleteItem ${error}`);
            alert('Something went wrong.');
        })
    }
    const purchaseItem = (e) => {
        // console.log(`Purchasing item ${item.id}`);
        axios.put(`/list/${item.id}`).then((response) => {
            fetchItemList();
        }).catch((error) => {
            console.log(`Error in purchaseItem ${error}`);
            alert('Something went wrong.');
        })

    }
    

    return (
        <Grid item xs={12} md={4}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5">
                        {item.name}
                    </Typography>
                    <Typography variant="h5">
                        Qty: {item.quantity}
                    </Typography>
                    <Typography variant="h5">
                        Unit: {item.unit}
                    </Typography>
                    <Typography variant="h5">
                        Item Purchased?: {item.purchased}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={(e) => deleteItem(item.id)}>Delete
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={(e) => purchaseItem(item.id)}>Purchased
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default InputItem;