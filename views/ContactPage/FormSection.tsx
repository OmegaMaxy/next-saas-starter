import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'components/Button';
import Input from 'components/Input';
import { media } from 'utils/media';
import MailSentState from '../../components/MailSentState';
import { emailAddress } from '../../utils/constants'

interface EmailPayload {
  name: string;
  email: string;
  description: string;
}

export default function FormSection() {
  const [hasSuccessfullySentMail, setHasSuccessfullySentMail] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitSuccessful, isSubmitting, isSubmitted, errors } = formState;

  async function onSubmit(payload: EmailPayload) {
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: 'Email from contact form', ...payload }),
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
      <h3>Stuur ons een bericht via onderstaand formulier.</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {hasErrored && <ErrorMessage>Oeps! Er ging iets mis bij het versturen van het formulier. Probeer het opnieuw of neem rechtstreeks contact met ons op via {emailAddress}.</ErrorMessage>}
        <InputGroup>
          <InputStack>
            <h2>Volledige naam</h2>
            {errors.name && <ErrorMessage>Naam is verplicht</ErrorMessage>}
            <Input placeholder="Uw volledige naam" id="name" disabled={isDisabled} {...register('name', { required: true })} />
          </InputStack>
          <InputStack>
            <h2>E-mail</h2>
            {errors.email && <ErrorMessage>Email is verplicht</ErrorMessage>}
            <Input placeholder="Uw e-mailadres" id="email" disabled={isDisabled} {...register('email', { required: true })} />
          </InputStack>
        </InputGroup>
        <InputStack>
          <h2>Waarmee kunnen wij u helpen?</h2>
          {errors.description && <ErrorMessage>Beschrijving is verplicht</ErrorMessage>}
          <Textarea
            as="textarea"
            placeholder="Typ hier uw bericht"
            id="description"
            disabled={isDisabled}
            {...register('description', { required: true })}
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

const InputGroup = styled.div`
  display: flex;
  align-items: center;

  & > *:first-child {
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
