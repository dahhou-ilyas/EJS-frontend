"use server"

import nodemailer from "nodemailer";

export default async function sendEmail(userEmail, pdfBase64) {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,  // Use 465 for SSL
    secure: true, // Use SSL
    auth: {
      user: "eespacesantejeunes@gmail.com",
      pass: "emkh ziin cjgv tpmz",
    },
    logger: true, // Enable logging
    debug: true, // Log SMTP traffic
    timeout: 30000, // 30 seconds timeout
  });

  try {
    console.log('Attempting to verify SMTP connection...');
    await transport.verify();
    console.log('SMTP connection verified successfully.');

    console.log('Attempting to send email...');
    const sendResult = await transport.sendMail({
      from: "eespacesantejeunes@gmail.com",
      to: userEmail,
      subject: "Résultat du test",
      html: "<b>Vous trouverez ci-joint le résultat de votre test!</b>",
      attachments: [
        {
          filename: "test_result.pdf",
          content: Buffer.from(pdfBase64, 'base64'),
          contentType: "application/pdf",
        },
      ],
    });

    console.log('Email sent successfully:', sendResult);
    return { success: true };
  } catch (error) {
    console.error('Error in sendEmail function:', error);
    return { success: false, error: error.message };
  }
}