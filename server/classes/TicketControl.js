const fs = require('fs');
const path = require('path');

class TicketControl {
    constructor() {
        let data = require('../data/control.json');
        this.lastTicket = data.lastTicket || 0;
        this.attentionDate = new Date();
    }

    reinitialize() {
        this.lastTicket = 0;
        this.attentionDate = new Date();

        const data = new Uint8Array(Buffer.from(JSON.stringify({lastTicket: this.lastTicket, attentionDate: this.attentionDate})));
        fs.writeFileSync('./server/data/control.json', data);
        console.log('reinitilize');
    }

    start() {

    }

    stop() {

    }
}

module.exports = TicketControl;