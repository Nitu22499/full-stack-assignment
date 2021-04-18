import axios from 'axios'
import cuid from 'cuid'
import { loremIpsum } from 'lorem-ipsum'
import { useState } from 'react'
import { randomDate } from '../utilities/randomDate'

interface Pageview {
  id: string
  created_at: Date

  page: {
    title: string
    description: string
    tags: string[]
  }

  user: {
    id: string
    created_at: Date
  }
}

export const usePageviewGenerator = () => {
  const [pageview, setPageview] = useState<any | null>(null)

  const generate = () => {
    const event: Pageview = {
      id: cuid(),
      created_at: new Date(),

      page: {
        title: loremIpsum(),
        description: loremIpsum({ count: 3 }),
        tags: Array.from({ length: Math.floor(Math.random() * 10) }, () =>
          loremIpsum({ units: 'words', count: 1 })
        )
      },

      user: {
        id: `USER${cuid()}`,
        created_at: randomDate(new Date(2019, 0, 1), new Date())
      }
    }

    const eventObj = {
      "event_id": event.id,
      "event_date": event.created_at.toISOString(),
      "page_title": event.page.title,
      "page_description": event.page.description,
      "page_tags": event.page.tags.join(', '),
      "user_id": event.user.id,
      "user_joined": event.user.created_at.toISOString()
    }

    setPageview(eventObj)

    // POST request to the API.
    axios.post('http://13.234.120.153/api/events/', eventObj)
  }

  return {
    generate,
    pageview
  }
}
