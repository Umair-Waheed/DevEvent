import { Suspense } from "react"
import EventDetails from "@/components/EventDetails";
const EventDetailsPage =async ({params}:{params:Promise<{slug:string}>}) => {
   const slug=await params.then((p)=>p.slug);
  //  console.log(params,slug);
  return (
   <main>
    <Suspense fallback={<div>Loading...</div>}>
    <EventDetails params={params}/>
    </Suspense>
   </main>
  )
}

export default EventDetailsPage