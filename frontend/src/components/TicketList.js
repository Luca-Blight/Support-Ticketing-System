import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TicketList.css';


function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}


const TicketDetailView = ({ handleUrgencyChange,urgency,setUrgency,messageSent,setMessageSent,selectedTicket, response, setResponse, handleResponse, status, setStatus, handleStatusChange, setSelectedTicket }) => (
    
    
    
    <div>
      <h2>{selectedTicket.name}</h2>
      <p>
        <strong>Description:</strong> {selectedTicket.description}
      </p>
      <p>
      <strong>Date Created:</strong> {formatDate(selectedTicket.date)}
      </p>
      <p>
        <strong>Urgency:</strong> {selectedTicket.priority}
      </p>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder='Respond to ticket...'
        className='ticket-response-textarea'></textarea>
      <button
        className='ticket-response-button'
        onClick={handleResponse}>
        Send Response
      </button>
      <div className='ticket-status-section'>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option value='new'>New</option>
          <option value='in progress'>In Progress</option>
          <option value='resolved'>Resolved</option>
        </select>
        <button className ='ticket-status-button' onClick={handleStatusChange}>Update Status</button>
      </div>
      <div className='ticket-urgency-section'>
            <label className='ticket-urgency'>Urgency: </label>
            <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
            </select>
            <button className= 'ticket-urgency-button' onClick={handleUrgencyChange}>Update Urgency</button>
        </div>
      <button className='ticket-back-button' onClick={() => setSelectedTicket(null)}>Back to List</button>
      <div>{messageSent && <p className="confirmation-message">Message has been sent!</p>}</div>
    </div>
  );

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [status, setStatus] = useState('');
    const [response, setResponse] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // New state variable for ticket status filter
    const [messageSent, setMessageSent] = useState(false);
    const [urgency, setUrgency] = useState('');


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tickets/');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleStatusChange = async () => {
    if (selectedTicket) {
      const updatedTicket = await axios.put(
        `http://localhost:8000/tickets/${selectedTicket.id}`,
        {
          status,
        }
      );
      const newTickets = tickets.map((ticket) =>
        ticket.id === updatedTicket.data.id ? updatedTicket.data : ticket
      );
      setTickets(newTickets);
      setSelectedTicket(updatedTicket.data);
    }
  };
  const sendEmail = (message) => {
    console.log(`Would normally send email here with body: ${message}`);
  };
  const handleResponse = async () => {
    if (selectedTicket) {
        sendEmail(`Response to ticket ${selectedTicket.id}: ${response}`);
        setResponse(''); // Reset the response state
        setMessageSent(true); // Set the messageSent state to true
    }
};

    const handleUrgencyChange = async () => {
        console.log(urgency);
        console.log(selectedTicket.id);
        
        if (selectedTicket) {
            const updatedTicket = await axios.put(
                `http://localhost:8000/tickets/${selectedTicket.id}`,
                {   
                    priority: urgency,

                }
            );
            const newTickets = tickets.map((ticket) =>
                ticket.id === updatedTicket.data.id ? updatedTicket.data : ticket
            );
            setTickets(newTickets);
            setSelectedTicket(updatedTicket.data);
        }
    };

    const filteredTickets = tickets.filter(ticket => {
        if (filterStatus === 'all') return true;
        return ticket.status.toLowerCase() === filterStatus.toLowerCase();
    });

  return (
    <div>
      <h1 className='tickets-title'>Tickets</h1>

      {!selectedTicket && (
                <div className="ticket-filter-dropdown">
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All Tickets</option>
                        <option value="new">New</option>
                        <option value="in progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
            )}

      {selectedTicket ? (
        <TicketDetailView 
            handleUrgencyChange={handleUrgencyChange}
            selectedTicket={selectedTicket}
            response={response}
            setResponse={setResponse}
            handleResponse={handleResponse}
            status={status}
            setStatus={setStatus}
            handleStatusChange={handleStatusChange}
            setSelectedTicket={setSelectedTicket}
            messageSent={messageSent}
            setMessageSent={setMessageSent}
            urgency={urgency}
            setUrgency={setUrgency}
        />
        ) : (
        <ul>
                {filteredTickets.map((ticket) => (
            <li
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`ticket-item ${ticket.priority}`}> 
                {ticket.firstName} {ticket.lastName} - {ticket.status}
            </li>
        ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
