import styled from 'styled-components';
import Page from 'components/Page';
import { media } from 'utils/media';
import FormSection from 'views/ContactPage/FormSection';
import InformationSection from 'views/ContactPage/InformationSection';
import FormAdvancedSection from 'views/ContactPage/FormAdvancedSection';

export default function ContactPage() {
  return (
    <Page title="Vraag een Offerte aan" description="Een nieuw project of interesse? Welkom!">
      <ContactContainer>
        <InformationSection />
        <FormAdvancedSection />
      </ContactContainer>
    </Page>
  );
}

const ContactContainer = styled.div`
  display: flex;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;
