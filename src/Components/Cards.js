import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';

export default function Cards() {

    const [cards, setCard] = useState([{ id: uuidv4(), title: '',show:true }]);

    //Function to handle input changed by card
    const handleInputCard = (event, idCard) => {
        const newCard = cards.map(card => {
            if (card.id === idCard) {
                return { ...card, title: event.target.value }
            }
            return card
        })
        setCard(newCard);
        console.log('cards:',cards);
    };

    //Function duplicate card
    const handleDuplicateCard = () => {
        const newCard = { id: uuidv4(), title: '',show:true};
        setCard([...cards, newCard]);
    } 
    const onPress = (event,id)=> {
        if (event.key === 'Enter') {
            console.log('yes');
         const newCard = cards.map(card =>{
            if (id === card.id) {
                return { ...card,show:false}
            }
            return card
         });
         setCard(newCard);
       }
    }
    
    console.log('card:',cards);
    
    
    return (
        <div>
            {cards.map((card, index) => (
                <div key={card.id}>
                    <input
                        key={card.id}
                        value={card.title}
                        autoFocus
                        onChange={(event) => handleInputCard(event, card.id)}
                        onKeyPress={(e) => onPress(e,card.id)}
                        placeholder='Enter a card please'
                        />
                </div>
            ))}
           <Button variant='light' onClick={handleDuplicateCard}>Add card </Button>
        </div>
    )
}
