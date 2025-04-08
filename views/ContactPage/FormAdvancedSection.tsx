import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import { media } from 'utils/media';
import MailSentState from '../../components/MailSentState';
import { emailAddress } from '../../utils/constants'
import SectionTitle from 'components/SectionTitle';

interface EmailPayload {
  name: string;
  email: string;
  description: string;
  telephone: string;
  type: 'webapp' | 'ai-integration' | 'automatisering' | 'waarde' | 'other';
  btw: string;
  company_name: string;
}

export default function FormAdvancedSection() {
  const [hasSuccessfullySentMail, setHasSuccessfullySentMail] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitSuccessful, isSubmitting, isSubmitted, errors } = formState;

  async function onSubmit(payload: EmailPayload) {
    try {
      const res = await fetch('/api/sendEmailAdv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: 'Email from contactadv form', ...payload }),
      });

      if (res.status !== 204) {
        setHasErrored(true);
      }
    } catch {
      setHasErrored(true);
      return;
    }

    setHasSuccessfullySentMail(true);
  }

  const isSent = isSubmitSuccessful && isSubmitted;
  const isDisabled = isSubmitting || isSent;
  const isSubmitDisabled = Object.keys(errors).length > 0 || isDisabled;

  if (hasSuccessfullySentMail) {
    return <MailSentState />;
  }

  return (
    <Wrapper>
        <h3>
            Vraag hieronder vrijblijvend een offerte aan en ontvang binnen 1 werkdag een voorstel op maat.
        </h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {hasErrored && <ErrorMessage>Oeps! Er ging iets mis bij het versturen van het formulier. Probeer het opnieuw of neem rechtstreeks contact met ons op via {emailAddress}.</ErrorMessage>}
        <InputGroup>
          <InputStack>
            <InputTitle>Volledige naam</InputTitle>
            {errors.name && <ErrorMessage>Naam is verplicht</ErrorMessage>}
            <Input placeholder="Uw volledige naam" id="name" disabled={isDisabled} {...register('name', { required: true })} />
          </InputStack>
          <InputStack>
            <InputTitle>E-mail</InputTitle>
            {errors.email && <ErrorMessage>Email is verplicht</ErrorMessage>}
            <Input placeholder="Uw e-mailadres" id="email" disabled={isDisabled} {...register('email', { required: true })} />
          </InputStack>
          <InputStack>
            <InputTitle>Telefoonnummer</InputTitle>
            {errors.name && <ErrorMessage>Telefoonnummer is verplicht</ErrorMessage>}
            <Input placeholder="Uw telefoonnummer" id="name" disabled={isDisabled} {...register('telephone', { required: true })} />
          </InputStack>
        </InputGroup>
        <InputGroup>
          <InputStack>
            <InputTitle>Waarmee kunnen wij u helpen?</InputTitle>
            <Select placeholder="Uw volledige naam" id="name" disabled={isDisabled} {...register('type', { required: false })}>
                <option value="webapp" selected>Web Applicatie</option>
                <option value="ai-integration">AI-integratie</option>
                <option value="automatisering">Automatisering</option>
                <option value="waarde">Waarde Creatie</option>
                <option value="other">Anders</option>
            </Select>
          </InputStack>
          <InputStack>
            <InputTitle>BTW-nummer</InputTitle>
            <Input placeholder="BE1005721239" id="email" disabled={isDisabled} {...register('btw', { required: false })} />
          </InputStack>
          <InputStack>
            <InputTitle>Bedrijfsnaam</InputTitle>
            <Input placeholder="Uw bedrijf BV" id="name" disabled={isDisabled} {...register('company_name', { required: false })} />
          </InputStack>
        </InputGroup>
        <InputStack>
          <InputTitle>Meer details over uw project?</InputTitle>
          <Textarea
            as="textarea"
            placeholder="Geef ons meer duidelijkheid indien u dat wenst, anders bellen wij u terug om meer in details te gaan."
            id="description"
            disabled={isDisabled}
            {...register('description', { required: false })}
          />
        </InputStack>
        <Button as="button" type="submit" disabled={isSubmitDisabled}>
          Verzenden
        </Button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 2;

  h3 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  & > * {
    margin-bottom: 2rem;
  }
`;

const InputTitle = styled.h2`
    font-weight: normal;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;

  & > *:not(:last-child) {
    margin-right: 2rem;
  }

  & > * {
    flex: 1;
  }

  ${media('<=tablet')} {
    flex-direction: column;
    & > *:first-child {
      margin-right: 0rem;
      margin-bottom: 2rem;
    }
  }
`;

const InputStack = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

const ErrorMessage = styled.p`
  color: rgb(var(--errorColor));
  font-size: 1.5rem;
`;

const Textarea = styled(Input)`
  width: 100%;
  min-height: 20rem;
`;
