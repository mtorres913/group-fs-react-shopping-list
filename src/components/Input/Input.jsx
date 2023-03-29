import { useState, useEffect } from 'react';
import axios from 'axios';
import './Input.css';
import InputItem  from './InputItem.jsx';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';


function Input() {
    const [itemName, setItemName] = useState('')
    const [itemQuantity, setItemQuantity] = useState('')
    const [itemUnit, setItemUnit] = useState('')
    const [itemList, setItemList] = useState([]);



    const fetchItemList = () => {
        axios.get('/list').then((response) => {
            // Update the array, React does the rest!
            setItemList(response.data);
        }).catch((error) => {
            console.log(`Error in GET ${error}`);
            alert('Something went wrong.');
        });
    }
    useEffect(() => {
        // At this point, React is ready!
        fetchItemList();
    }, []); // ! Remember the empty Array

  
  
    const submitForm = (e) => {
        e.preventDefault();
        axios.post('/list', {
            //Using values from our variables in state
            name: itemName,
            quantity: itemQuantity,
            unit: itemUnit
        }).then((response) => {
            setItemName('');
            setItemQuantity('');
            setItemUnit('');
            fetchItemList();
        }).catch((error) => {
            console.log(`Error in POST ${error}`)
            alert('Something went wrong.');
        })
    }

    
    return (
        <Container>
            {/* Used for testing */}
            {/* { JSON.stringify(itemList) } */}
            <form onSubmit={submitForm}>
                Name:<input type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)} />
                <br />
                Quantity:<input type="number"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)} />
                <br />
                Unit:<input type="text"
                    value={itemUnit}
                    onChange={(e) => setItemUnit(e.target.value)} />
                <input type="submit" />
            </form>
            <Grid container spacing={2}>
                {
                    itemList.map((item) => (
                     <InputItem
                        key={item.id} 
                        item={item}
                        fetchItemList={fetchItemList}
                        />
                    ))
                }
           </Grid>
            </Container>
    );
}

export default Input;