function generateRandomChar() {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabets.charAt(Math.floor(Math.random() * alphabets.length));
  }
  
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
  
  function generateLotteryTicket(existingTickets) {
    let ticket;
    const ticketSet = new Set(existingTickets);
    
    do {
      let alphaPart = generateRandomChar() + generateRandomChar();
      let numberPart = '';
      for (let i = 0; i < 4; i++) {
        numberPart += generateRandomNumber();
      }
      ticket = alphaPart + numberPart;
    } while (ticketSet.has(ticket));
    
    return ticket;
  }
  
  
function validateTickets(userTickets, existingTickets) {
    const ticketSet = new Set(existingTickets);
    const userTicketSet = new Set();
    const validFormat = /^[A-Z]{2}\d{4}$/;
  
    for (const ticket of userTickets) {
      // Check if ticket format is correct
      if (!validFormat.test(ticket)) {
        return { valid: false, message: `Invalid format: ${ticket}` };
      }
      // Check if ticket already exists in existing tickets
      if (ticketSet.has(ticket)) {
        return { valid: false, message: `Ticket already exists: ${ticket}` };
      }
      // Check if ticket is repeated in user tickets
      if (userTicketSet.has(ticket)) {
        return { valid: false, message: `Duplicate ticket in user list: ${ticket}` };
      }
      userTicketSet.add(ticket);
    }
    
    return { valid: true, message: 'All tickets are valid and unique' };
  }

 module.exports = {
    generateLotteryTicket,
    validateTickets
 }