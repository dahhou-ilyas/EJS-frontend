// app/actions/sendEmail.js
"use server"


import nodemailer from "nodemailer";

export default async function sendEmail(pdfBase64) {

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eespacesantejeunes@gmail.com",
      pass: "emkh ziin cjgv tpmz",
    },
  });

  try {
    await transport.verify();

    const sendResult = await transport.sendMail({
      from: "eespacesantejeunes@gmail.com",
      to: "nfcreativehorizon@gmail.com",
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

    console.log(sendResult);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}