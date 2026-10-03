import React from 'react'
import '../css/Event.css'

const formatDate = (value) => {
    if (!value) return ''

    const [year, month, day] = String(value)
        .slice(0, 10)
        .split('-')
        .map(Number)

    if (!year || !month || !day) return value

    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(new Date(Date.UTC(year, month - 1, day)))
}

const formatTime = (value) => {
    if (!value) return ''

    const [hour, minute] = String(value).split(':').map(Number)

    if (!Number.isInteger(hour) || !Number.isInteger(minute)) return value

    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'UTC'
    }).format(new Date(Date.UTC(1970, 0, 1, hour, minute)))
}

const Event = (props) => {
    const { title, date, time, image } = props
    const formattedDate = formatDate(date)
    const formattedTime = formatTime(time)

    // TODO (optional stretch): Calculate and display a countdown.

    return (
        <article className='event-information'>
            <img src={image} alt={title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {formattedDate} <br /> {formattedTime}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
