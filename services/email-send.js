// Should create fill-in-the-blank template for:
// 1. Registration
//2. Reminders
//3. Password reset (??)

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Later incorporate type parameter to choose registration or Reminders
//For now default to reminder
function sendMail(destination) {

  const msg = {
    // Add verification!
    to: destination.value,
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
