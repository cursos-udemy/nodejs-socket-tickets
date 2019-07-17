const fs = require('fs');

class TicketControl {
    constructor() {
        this.lastTicket = 0;
        this.attentionDate = new Date();
    }

    saveControl() {
        try {
            const data = new Uint8Array(Buffer.from(JSON.stringify({ lastTicket: this.lastTicket, attentionDate: this.attentionDate })));
            fs.writeFileSync('./server/data/control.json', data);
        } catch (error) {
            console.error('Error al persistir la informacion de control');
            console.error(err);
        }
    }

    reinitialize() {
        this.lastTicket = 0;
        this.attentionDate = new Date();
        this.saveControl();
        console.info('reinitilize [OK]');
    }

    start() {
        let data = require('../data/control.json');
        if (data) {
            this.lastTicket = data.lastTicket || 0;
        } else {
            this.lastTicket = 0;
        }
        this.attentionDate = new Date();
        this.saveControl();
        console.info('start application [OK]');
    }

    stop() {

    }

    nextTicket(request) {
        this.lastTicket += 1;
        this.saveControl();
        console.info('execute nextTicket: [OK]');
        return { ticketID: this.lastTicket, userAssigned: request.user, timestamp: new Date().getTime(), box: request.box };
    }


}

module.exports = TicketControl;