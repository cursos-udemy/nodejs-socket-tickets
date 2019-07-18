const fs = require('fs');

class Ticket {
    constructor(ticketID, box, user) {
        this.timestamp = new Date();
        this.status = 'PENDING';
        this.ticketID = ticketID;
        this.box = box;
        this.user = user;
    }
}
class TicketControl {
    constructor() {
        this.lastTicket = 0;
        this.attentionDate = new Date();
        this.tickets = [];
    }

    saveControl() {
        try {
            const status = {
                lastTicket: this.lastTicket,
                attentionDate: this.attentionDate,
                tickets: this.tickets
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
        this.saveControl();
        console.info('reinitilize [OK]');
    }

    start() {
        let data = require('../data/control.json');
        if (data) {
            this.lastTicket = data.lastTicket || 0;
            this.tickets = data.tickets || [];
        } else {
            this.lastTicket = 0;
            this.tickets = [];
        }
        this.attentionDate = new Date();
        this.saveControl();
        console.info('start application [OK]');
    }

    stop() {

    }

    nextTicket(request) {
        this.lastTicket += 1;
        const ticket = new Ticket(this.lastTicket, request.box, request.user);
        this.tickets.push(ticket);
        this.saveControl();
        console.info('execute nextTicket: [OK]');
        return {...ticket};
    }

    getStatus() {
        return {
            ticketID: this.lastTicket
        }
    }

}

module.exports = TicketControl;