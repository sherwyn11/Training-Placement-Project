const sgMail = require('@sendgrid/mail')

const sendgridApiKey = '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'

sgMail.setApiKey(sendgridApiKey)

const sendNewCompanyEmail = (email,name) => {
    sgMail.sendMultiple({
        to: email,
        from: 'sherwyndsouza1999@gmail.com',
        subject: 'New Company',
        text: `Placement for new company ${name} has started`
    })
}

const sendMail = (email) => {
    sgMail.sendMultiple({
        to: email,
        from: 'sherwyndsouza1999@gmail.com',
        subject: 'Forgot password',
        html: '<p>Click here if you forgot your password<p><br></br><a href = "/">localhost:3000/forgot-password</a>'
    })
}


module.exports = {
    sendNewCompanyEmail,
    sendMail
}
