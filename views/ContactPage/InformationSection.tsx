import styled from 'styled-components';
import { emailAddress } from 'utils/constants';

export default function InformationSection() {
  return (
    <Wrapper>
      <h3>Je kan ons makkelijk bereiken</h3>
      <p>
        <span>Bel ons:</span> <b>+32 484 80 55 70</b>
      </p>
      <p>
        <span>Mail ons:</span> <b>{emailAddress}</b>
      </p>
      <p>
        Maandag – Zaterdag: 09u00 – 19u00
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  margin-right: 3rem;
  margin-bottom: 3rem;

  h3 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  p {
    font-weight: normal;
    font-size: 1.6rem;
    color: rgba(var(--text), 0.7);
  }

  span {
    opacity: 1;
    color: rgba(var(--text), 1);
  }
`;
