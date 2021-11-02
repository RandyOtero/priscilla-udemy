import { useRouter } from "next/router";
import Head from "next/head";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-2fa09-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    fetcher
  );
  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

 
  let pageHeadData = <Head>
    <title>Filtered Events</title>
      <meta
        name="description"
        content={`A list of filtered events.`}
      />
  </Head>

  if (!filterData) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  );

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear; // conversion de string à number
  const numMonth = +filteredMonth; // conversion de string à number

  const isValidRange =
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error;

  if (isValidRange) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   // trop de pages possibles à rendre -> pré-générer sur le serveur (getServerSideProps)
//   // le context est nécessaire ici pcq l'on veut les infos pour un id spécifique
//   const { params } = context;
//   const filterData = params.slug;
//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }
//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       }
//     },
//   };
// }

export default FilteredEventsPage;
