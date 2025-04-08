import * as React from 'react';

interface FullContactFormEmailProps {
  name: string;
  email: string;
  telephone: string;
  type: 'webapp' | 'ai-integration' | 'automatisering' | 'waarde' | 'other';
  btw: string;
  company_name: string;
  description: string;
  referrer: string | undefined;
}

/*export const FullContactFormEmail: React.FC<Readonly<FullContactFormEmailProps>> = ({
  name, email, telephone, type, btw, company_name, description, referrer,
}) => (
  <main>
    Name: <strong>{name}</strong>
    Email: <strong>{email}</strong>
    Telephone: <strong>{telephone}</strong>
    Project Type: <strong>{type}</strong>
    BTW: <strong>{btw}</strong>
    Bedrijfsnaam: <strong>{company_name}</strong>
    Message: <p>{description}</p>
    Sent from: <strong>{referrer || 'Not specified or hidden'}</strong>
  </main>
);*/

export default function FullContactFormEmail({ name, email, telephone, type, btw, company_name, description, referrer, }: FullContactFormEmailProps) {
  return (`
    <main>
      <p>Name: <strong>${name}</strong></p>
      <p>Email: <strong>${email}</strong></p>
      <p>Telephone: <strong>${telephone}</strong></p>
      <p>Project Type: <strong>${type}</strong></p>
      <p>BTW: <strong>${btw}</strong></p>
      <p>Bedrijfsnaam: <strong>${company_name}</strong></p>
      <p>Message: ${description}</p>
      <p>Sent from: <strong>${referrer || 'Not specified or hidden'}</strong></p>
    </main>  
  `)
}