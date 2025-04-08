import * as React from 'react';
//import { Html, Body, Text } from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  description: string;
  referrer: string | undefined;
}

/*export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name, email, description, referrer,
}) => (
  <main>
    Name: <strong>{name}</strong>
    Email: <strong>{email}</strong>
    Message: <p>{description}</p>
    Sent from: <strong>{referrer || 'Not specified or hidden'}</strong>
  </main>
);*/

export default function ContactFormEmail({ name, email, description, referrer }: ContactFormEmailProps) {
  return (`
    <main>
      <p>Name: <strong>${name}</strong></p>
      <p>Email: <strong>${email}</strong></p>
      <p>Message: ${description}</p>
      <p>Sent from: <strong>${referrer || 'Not specified or hidden'}</strong></p>
    </main>
  `);
}