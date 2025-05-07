//Primera aproximación con fullcalendar 
/* npm install --save \
@fullcalendar/core \
@fullcalendar/react \
@fullcalendar/daygrid */

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { fetchApi } from 'controllers/Controller';
import { IVisit } from 'interfaces';

const Calendar = () => {
  const [visits, setVisits] = useState<IVisit[]>([]);

  const getVisits = async () => {
    const visits: IVisit[] = await fetchApi('visits');
    console.log('Fetched visits:', visits);
    if (visits) setVisits(visits);
  };

  useEffect(() => {
    getVisits();
  }, []);

  const formatVisits = (visits: IVisit[]) => {
    return visits.map((visit: IVisit) => ({
      id: visit.id?.toString(),  // Convert id to string
      title: `${visit.client} - ${visit.pet} (${visit.visitReason})`,
      start: new Date(visit.date),
      end: new Date(new Date(visit.date).getTime() + 15 * 60 * 1000), // 15 minutes duration
    }));
  };

  const events = formatVisits(visits);
  console.log('Formatted events:', events);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={events}
    />
  );
};

export default Calendar;
