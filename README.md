# Ticket Support System

## Overview

Three pages for this application, home page(ticket submission form), log-in page, and tickets page(accessed only by admin).
For tickets page will allow you to see ticket details, respond to the ticket, and update the status of that ticket.

## How to run the project

1. Clone the repo

### Frontend

` cd frontend && npm install && npm start `

Afterwards, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend

` cd backend/app && python main.py `

Afterwards, open [http://localhost:8000](http://localhost:8000) to view it in the browser.


## Database

To set up the database run:

` python backend/app/setup_database.py `

It will include samples to start the setup, feel free to remove for production.
