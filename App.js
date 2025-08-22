import React from 'react';
// import { eventsData } from './eventsData';
// import EventList from './components/EventList';
import ToDoList from './components/ToDoList';

const App = () => {
    // const [events, setEvents] = useState(eventsData);

    return (
        <div className="App">
            <h1>Event Booking System</h1>
            {/* <EventList events={events} /> */}
            <ToDoList/>
        </div>
    );

};

export default App;
