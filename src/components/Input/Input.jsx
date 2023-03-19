import { useState, useEffect } from 'react';
import axios from 'axios';

function Input() {
    const  [itemName, setItemName] = useState('')
    const  [itemQuantity, setItemQuantity] = useState('')
    const  [itemUnit, setItemUnit] = useState('')
    const  [itemList, setItemList] = useState([]);

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
        axios.post('/list',{
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
        <div>
            {/* Used for testing */}
            { JSON.stringify(itemList) }
            {/* <form onSubmit={submitForm}>
                Name:<input type="text"
                value={creatureName}
                onChange={(e) => setCreatureName(e.target.value)} />
                <br />
                Quantity:<input type="text"
                value={creatureOrigin}
                onChange={(e) => setCreatureOrigin(e.target.value)} />
                <input type="submit" />
            </form>
            <ul>
                {
                    listOfCreatures.map((creature) => (
                        // what we want to render
                        <li key={creature.id}>
                            {creature.name} from {creature.origin}
                        </li>
                    ))
                }
            </ul> */}
        </div>
    );
}

export default Input;