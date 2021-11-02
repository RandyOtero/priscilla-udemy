import Head from 'next/head';
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

function HomePage(props) { // props -> les infos de getStaticProps (chargées en 1er)
  return (
    <div>
      <ul>
        <Head>
          <title>NextJS Events</title>
          <meta name="description" content="Find a lot of great events that allow you to evolve..."></meta>
        </Head>
        <NewsletterRegistration />
        <EventList items={props.events} />
      </ul>
    </div>
  );
}
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return { 
    props: { events: featuredEvents },
    revalidate: 1800 // en production, la page sera rechargé au moins toutes les demi heures pour refleter les données de la base
    };
}

export default HomePage;
