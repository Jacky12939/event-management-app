import { useState }
from "react";

import useEvents
from "../../hooks/useEvents";
import ParticipantLayout from "../../components/Participant/ParticipantLayout";
import EventSearch from "../../components/Participant/EventSearch";
import EventFilters from "../../components/Participant/EventFilters";
import EventCard from "../../components/Participant/EventCard";
import EmptyState from "../../components/Participant/EmptyState";

export default function EventsPage() {

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const {
    events,
    loading,
    error,
  } = useEvents();

  const filteredEvents =
    events.filter((event) => {

      const matchesSearch =

        event.title
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

       ( event.description || "" )
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =

        category === ""

        ||

        event.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  if (loading) {

    return (
      <ParticipantLayout>
        <h1>Chargement...</h1>
      </ParticipantLayout>
    );
  }

  if (error) {

    return (
      <ParticipantLayout>
        <h1>{error}</h1>
      </ParticipantLayout>
    );
  }

  return (

    <ParticipantLayout>

     

      <div
        className="
          rounded-3xl
          h-[300px]
          mb-10
          bg-cover
          bg-center
          relative
          overflow-hidden
        "
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30)",
        }}
      >

        <div className="
          absolute
          inset-0
          bg-black/50
        " />

        <div className="
          relative
          z-10
          flex
          flex-col
          justify-center
          h-full
          px-10
          text-white
        ">

          <h1 className="
            text-5xl
            font-bold
            mb-4
          ">
            Découvrez les meilleurs événements
          </h1>

          <button
  className="w-1/4
    mt-4
    bg-white
    text-black
    px-6
    py-3
    rounded-xl
    font-semibold
    hover:scale-105
    transition-all
  "
    >
    Réservez vos places maintenant
    </button>

        </div>

      </div>

     

      <div className="
        flex
        flex-col
        md:flex-row
        gap-5
        mb-10
      ">

        <EventSearch
          search={search}
          setSearch={setSearch}
        />

        <EventFilters
          category={category}
          setCategory={setCategory}
        />

      </div>

    

      {filteredEvents.length > 0 ? (

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
        ">

          {filteredEvents.map((event) => (

            <EventCard
              key={event.id}
              event={event}
            />

          ))}

        </div>

      ) : (

        <EmptyState />

      )}

    </ParticipantLayout>
  );
}