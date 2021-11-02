import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";


function EventsPage(props) { // on passe les props de getStaticProps qui est rendu avant cette fonction
  const router = useRouter(); // on garde le hook router car pas de fetch
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
          <title>All Events</title>
          <meta name="description" content="Find a lot of great events that allow you to evolve..."></meta>
        </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return { 
    props: { events: events },
    revalidate: 60 // intervalle de durée de rechargement de la page en production
    };
}

export default EventsPage;
