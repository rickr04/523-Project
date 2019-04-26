const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);




module.exports = {
  sendMail: function(data, callback) {
    //  if (data.type == "register") {
    const msg = {
      "to": data.email,
      "from": "securencompliant@gmail.com",
      // If you update the template you MUST update the template ID here
      "templateId": process.env.SENDGRID_REG_TEMPLATE,
      "dynamic_template_data": {
        "subject": "Welcome",
        "name": data.name,
        "company": data.company,
      },
    };

    //}


    try {
      sgMail.send(msg);
    } catch (err) {
      return callback(err);
    }


  }
}

//Later incorporate type parameter to choose registration or Reminders
//For now default to reminder
