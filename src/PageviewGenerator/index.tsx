import React from 'react'
import { usePageviewGenerator } from './logic'
import { EventTable } from '../EventTable/index'

export const PageviewGenerator: React.FC = () => {
  const { generate, pageview } = usePageviewGenerator()

  return (
    <>
      <button style={{ fontSize: 24, marginBottom: 40 }} onClick={generate}>
        Generate pageview
      </button>

      {pageview && (
        <>
          <h3>Last pageview</h3>
          <p>Event ID: {pageview?.event_id}</p>
          <p>Event date: {pageview?.event_date}</p>
          <p>Page title: {pageview?.page_title}</p>
          <p>Page description: {pageview?.page_description}</p>
          <p>Page tags: {pageview?.page_tags}</p>
          <p>User ID: {pageview?.user_id}</p>
          <p>User joined: {pageview?.user_joined}</p>
        </>
      )}

    {/* Passing pageview object as props to the EventTable Component.   */}
    <EventTable pageview={pageview} />
    </>
  )
}
