import { NextApiRequest, NextApiResponse } from 'next';
import ContactFormEmail from './Emails/ContactFormEmail'
import { Resend } from 'resend';
//import { resend } from 'utils/constants';
//import * as React from 'react';
import { render } from '@react-email/render';
import React from 'react';

export default async function SendEmail(req: NextApiRequest, res: NextApiResponse) {

  try {
    const resend = new Resend('re_W33GQU8f_4fhUEzM5g79woWtt2tCvW792');

    const { description, email, name } = req.body;
    const referrer = req.headers.referer;

    const { data, error } = await resend.emails.send({
      from: 'OmegaUna <info@omegauna.be>',
      to: ['info@omegauna.be'],
      subject: `Nieuw bericht: ${name}`,
      html: ContactFormEmail({ name, email, description, referrer }),
      //react: ContactFormEmail({ name, email, description, referrer }), //(<ContactFormEmail name="" email="" description="" referrer=""/>)
    });

    // maybe send confirmation mail to customer

    if (error) {
      res.status(400).json(error);
    }

    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
