const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  sendMail: function (destination, callback) {
    console.log('Howdy');
    const msg = {
      // Add verification!
      to: destination,
      from: 'securencompliant@gmail.com',
      subject: 'Welcome',
      text: 'Welcome to SNC!',
    };
    try {

      sgMail.send(msg);
    } catch(err) {
      return callback(err);
    }


  }
}

//Later incorporate type parameter to choose registration or Reminders
//For now default to reminder
