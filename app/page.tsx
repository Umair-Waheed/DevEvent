import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { IEvent } from '@/database';
import {cacheLife } from "next/cache"

const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL;
const page = async() => {
  'use cache';
  cacheLife('minutes')
  
     const response =await fetch(`${BASE_URL}/api/events`);
    // console.log(response);
    const {events}=await response.json();
    // console.log(events);
    
  return (
    <div>
      <section>
        <h1 className="text-center">The Hub for Every Dev <br/> Future Hosted Events</h1>
        <p className="text-center mt-5">Meetups, Hackathons and Conference, All in one Place.</p>
        <ExploreBtn />

        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>

          <ul className="events">
            {events.map((event:IEvent)=>(
              <li className="list-none" key={event.title}>
                <EventCard {...event}/>
              </li>
            ))}
          </ul>

        </div>
      </section>
      </div>
  )
}

export default page