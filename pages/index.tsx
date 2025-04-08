import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';
import { EnvVars } from 'env';
import { getAllPosts } from 'utils/postsFetcher';
import Cta from 'views/HomePage/Cta';
import Features from 'views/HomePage/Features';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import Testimonials from 'views/HomePage/Testimonials';
import RichText from 'components/RichText';
import { media } from 'utils/media';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import WaveCta from 'components/WaveCta';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Tempor nostrud velit fugiat nostrud duis incididunt Lorem deserunt est tempor aute dolor ad elit."
        />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <SimpleSection>
            <div style={{ "flex": "1" }}>
              <SectionTitle>
                Waarde creatie met AI en ontwikkeling op maat
              </SectionTitle>
              <SectionSubTitle>
                67+ projecten gerealiseerd
              </SectionSubTitle>
            </div>
            <div style={{ "flex": "1", "padding": "0 2rem" }}>
              <RichText>
                Bij OmegaUna helpen we je niet alleen met <b>webontwikkeling</b> en <b>automatisering</b>, maar ook met <b>AI-oplossingen</b> die je bedrijf schaalbaar en efficiënter maken. Of je nu je processen wilt versnellen, je bedrijf wilt opschalen of handmatig werk wilt elimineren – wij helpen jou waarde creëren.
              </RichText>
            </div>
          </SimpleSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Testimonials />
          <FeaturesGallery />
          <Cta />
        </DarkerBackgroundContainer>
        <WhiteBackgroundContainer style={{ "paddingTop": "12rem" }}>
          <SimpleSection>
            <div style={{ "flex": "1" }}>
              <OverTitle style={{ "lineHeight": "1.1", "marginBottom": "2rem" }}>Enkele uit ons portfolio</OverTitle>
              <SectionTitle>
                Verhalen waar we trots op zijn.
              </SectionTitle>
              <RichText>
                Lars kwam naar ons met een duidelijke uitdaging: zijn e-commercebedrijf groeide snel, maar daarmee groeide het manueel werk ook.
              </RichText>  
              <RichText style={{ "marginTop": "2rem" }}>
                Tijdens onze samenwerking kreeg Lars het gevoel dat hij nu écht de controle had over zijn bedrijf. En wij? We waren trots om een essentieel onderdeel te zijn van zijn succesverhaal.
              </RichText>
            </div>
            <div style={{ "flex": "1", "padding": "0 2rem" }}>
              <RichText>
                <h1>Lars</h1>
              </RichText>
              <RichText>
                Mede-eigenaar E-commercebedrijf
              </RichText>
              <RichText style={{ "marginTop": "2rem" }}>
                Als snelgroeiend e-commercebedrijf liepen we vast op de hoeveelheid handmatige processen, vooral in voorraadbeheer en klantenservice. 
                Dankzij de expertise van OmegaUna hebben we nu AI-gestuurde automatiseringen die voorraadupdates, klantvragen en orderverwerking moeiteloos afhandelen.
              </RichText>
              <RichText style={{ "marginTop": "2rem" }}> 
                Het resultaat? <b>Minder fouten</b>, snellere service en ruimte om verder te groeien zonder extra personeel. Hun team dacht <b>proactief</b> mee en leverde maatwerk waar we écht iets aan hebben.
              </RichText>
            </div>
          </SimpleSection>
        </WhiteBackgroundContainer>
      </HomepageWrapper>
      <WaveCta />
    </>
  );
}

const SimpleSection = styled(Container)`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 2rem;

  ${media('<=desktop')} {
    flex-direction: column;
  }
`;

const SectionTitle = styled.h1`
  font-size: 5.2rem;
  font-weight: normal;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;

  ${media('<=tablet')} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`;

const SectionSubTitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.03em;

  ${media('<=tablet')} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`;

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
