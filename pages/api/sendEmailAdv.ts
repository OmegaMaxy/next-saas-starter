import { NextApiRequest, NextApiResponse } from 'next';
import FullContactFormEmail from './Emails/FullContactFormEmail'
import { Resend } from 'resend';
//import { resend } from 'utils/constants';

export default async function SendEmailAdv(req: NextApiRequest, res: NextApiResponse) {

  try {
    const { description, email, name, telephone, type, btw, company_name } = req.body;
    const referrer = req.headers.referer;

    const resend = new Resend('re_W33GQU8f_4fhUEzM5g79woWtt2tCvW792');
    const { data, error } = await resend.emails.send({
      from: 'OmegaUna <info@omegauna.be>',
      to: ['info@omegauna.be'],
      subject: `Nieuw bericht: ${name}`,
      html: FullContactFormEmail({ name, email, telephone, type, btw, company_name, description, referrer })
      //react: FullContactFormEmail({ name, email, telephone, type, btw, company_name, description, referrer })
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
