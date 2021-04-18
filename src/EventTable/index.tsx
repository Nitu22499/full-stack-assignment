import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
 
export const EventTable = ({pageview}) => {
    const [events, setEvents] = useState()

    useEffect(()=>{
        // On page load, make API call to fetch data and set on the table.
        axios.get('http://13.234.120.153/api/events/')
        .then(res=>{
            setEvents(res.data)
        });
    },[]);

    useEffect(()=>{
        // On props value change for pageview object, prepend the object as first row in the table.
            if(pageview) {
                setEvents(events => {
                    return [pageview, ...events];
                });
            }
    },[pageview]);

return <div className="table-responsive">{
    !events ? ("No Events Generated"):(
        <table className="table table-bordered text-white font-small">
            <thead>
                <tr>
                    <th>Event ID</th>
                    <th>Event Date</th>
                    <th>Page Title</th>
                    <th>Page Description</th>
                    <th>Page Tags</th>
                    <th>User ID</th>
                    <th>User joined</th>
                </tr>
            </thead>
            <tbody>
                {
                    // Populate the table
                    events.map((event, index)=>{
                        return (
                            <tr key={index}>
                                <td>{event.event_id}</td>
                                <td>{event.event_date}</td>
                                <td>{event.page_title}</td>
                                <td>{event.page_description}</td>
                                <td>{event.page_tags}</td>
                                <td>{event.user_id}</td>
                                <td>{event.user_joined}</td>
                            </tr>
                        )
                    })
                    }
            </tbody>
        </table>
    )
    }</div> 
}
  