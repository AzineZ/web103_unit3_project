import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const { id } = useParams()
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false

        const loadLocationEvents = async () => {
            try {
                setLoading(true)
                setError(null)

                const [locationData, eventsData] = await Promise.all([
                    LocationsAPI.getLocationById(id),
                    LocationsAPI.getEventsByLocation(id)
                ])

                if (!ignore) {
                    setLocation(locationData)
                    setEvents(eventsData)
                }
            }
            catch (error) {
                console.error('Unable to load location events:', error)

                if (!ignore) {
                    setError('Unable to load this location. Please try again.')
                }
            }
            finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }

        loadLocationEvents()

        return () => {
            ignore = true
        }
    }, [id])

    if (loading) {
        return <h2>Loading location...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents
