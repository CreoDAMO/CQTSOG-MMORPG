import React, { useState, useEffect } from 'react';
import { CryptoQuestContract } from '../contracts/CryptoQuestContract';

function World() {

  const [events, setEvents] = useState([]);

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await CryptoQuestContract.methods.getEvents().call();
        setEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>World Map</h2>
      <h3>Upcoming Events</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <span>{event.eventName}</span>
            <span>{event.startTime}</span>
            <span>{event.endTime}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default World;
