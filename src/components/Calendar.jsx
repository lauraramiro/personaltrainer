import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

export default function TrainingCalendar() {

    const [trainings, setTrainings] = useState([]);

    const getTrainings = () => {
      fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then(response => response.json())
        .then(data => {
          setTrainings(data);
        })
        .catch(error => {
          console.error("Error fetching trainings:", error);
        });
    }

    const events = trainings.map((training) => {
        const startDateTime = new Date(training.date); 
        const endDateTime = new Date(startDateTime.getTime() + training.duration * 60000);
        return {
            id: training.id,
            title: `${training.activity} with ${training.customer.firstname} ${training.customer.lastname}` ,
            start: startDateTime,
            end: endDateTime,
            allDay: false
        };
    });

    useEffect(() => {
        getTrainings();
    }, [])    

    return (
        <div style={{height:'100%'}}>
        <Calendar
            localizer={momentLocalizer(moment)}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={["month", "week", "day", "agenda"]}
            style={{ height: 650 }}     
        />
        </div>
    );
}