import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TicketForm.css';

const TicketForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8000/tickets/', {
            firstName, lastName, email, description
        });
        console.log(response.data);
    }

    return (
        <div className="ticket-form-container">
            <h1 className='ticket-form-title'>Ticket Form</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="ticket-form-input"
                />
                <input 
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="ticket-form-input"
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="ticket-form-input"
                />
                <textarea
                    placeholder="Describe your issue..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="ticket-form-input"
                />
                <button className="ticket-form-button" type="submit">
                    Submit Ticket
                </button>
            </form>
        </div>
    );
}


export default TicketForm;
