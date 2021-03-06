const fs = require('fs');

const TOP_MAX = 4;

class Ticket {
    constructor(ticketID, user) {
        this.status = 'PENDING';
        this.ticketID = ticketID;
        this.box = null;
        this.createTimestamp = new Date();
        this.createUser = user;
        this.attendTimestamp = null;
        this.attendUser = null;
    }
}

class TicketControl {
    constructor() {
        this.lastTicket = 0;
        this.attentionDate = new Date();
        this.tickets = [];
        this.lastTicketsAttended = [];
    }

    saveControl() {
        try {
            const status = {
                lastTicket: this.lastTicket,
                attentionDate: this.attentionDate,
                tickets: this.tickets,
                lastTicketsAttended: this.lastTicketsAttended
            };
            const data = new Uint8Array(Buffer.from(JSON.stringify(status)));
            fs.writeFileSync('./server/data/control.json', data);
        } catch (error) {
            console.error('Error al persistir la informacion de control');
            console.error(err);
        }
    }

    reinitialize() {
        this.lastTicket = 0;
        this.attentionDate = new Date();
        this.tickets = [];
        this.lastTicketsAttended = [];
        this.saveControl();
        console.info('reinitilize [OK]');
    }

    start() {
        let data = require('../data/control.json');
        if (data) {
            this.lastTicket = data.lastTicket || 0;
            this.tickets = data.tickets || [];
            this.lastTicketsAttended = data.lastTicketsAttended || [];
        } else {
            this.lastTicket = 0;
            this.tickets = [];
            this.lastTicketsAttended = [];
        }
        this.attentionDate = new Date();
        this.saveControl();
        console.info('start application [OK]');
    }

    createTicket(request) {
        this.lastTicket += 1;
        const ticket = new Ticket(this.lastTicket, request.user);
        this.tickets.push(ticket);
        this.saveControl();
        console.info('Ticket Created!');
        return {...ticket};
    }

    attendTicket(request) {
        if (this.tickets.length === 0) {
            return {status: 'error', message: 'No hay tickets pendientes!'};
        }
        const ticket = this.tickets.shift();
        ticket.attendUser = request.username;
        ticket.attendTimestamp = new Date();
        ticket.box = request.box;
        ticket.status = 'ASSIGNED';
        
        this.lastTicketsAttended.unshift(ticket);
        if (this.lastTicketsAttended.length > 4) {
            this.lastTicketsAttended.pop();
        }

        this.saveControl();
        console.info('ticket asigned!');
        return ticket;
    }

    getStatus() {
        return {
            ticketID: this.lastTicket,
            lastTicketsAttended: this.lastTicketsAttended
        }
    }


}

module.exports = TicketControl;