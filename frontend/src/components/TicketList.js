import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            const response = await axios.get('http://localhost:8000/tickets/');
            setTickets(response.data);
        };

        fetchTickets();
    }, []);

    const handleStatusChange = async () => {
        if (selectedTicket) {
            const updatedTicket = await axios.put(`http://localhost:8000/tickets/${selectedTicket.id}`, {
                status
            });
            const newTickets = tickets.map(ticket =>
                ticket.id === updatedTicket.data.id ? updatedTicket.data : ticket
            );
            setTickets(newTickets);
            setSelectedTicket(updatedTicket.data);
        }
    };

    return (
        <div>
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket.id} onClick={() => setSelectedTicket(ticket)}>
                        {ticket.name} - {ticket.status}
                    </li>
                ))}
            </ul>

            {selectedTicket && (
                <div>
                    <h2>{selectedTicket.name}</h2>
                    <p>{selectedTicket.description}</p>
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="new">New</option>
                        <option value="in progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <button onClick={handleStatusChange}>Update Status</button>
                </div>
            )}
        </div>
    );
}

export default TicketList;
