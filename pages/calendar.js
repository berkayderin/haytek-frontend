import { Button, Form, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import dateFormat, { masks } from 'dateformat'

import FullCalendar from '@fullcalendar/react'
import Layout from '@/components/layout'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import trLocale from '@fullcalendar/core/locales/tr'

const now = new Date()

export default function CalendarPage() {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Sulama',
      start: '2023-11-13T16:00:00',
      end: '2023-11-13T18:00:00',
    },
  ])
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
  })

  const renderEventContent = (eventInfo) => {
    const start = eventInfo.event.start
    const formattedStart = start.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    const formattetEnd = eventInfo.event.end.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <div className='d-flex flex-column align-items-start justify-content-center px-2 py-1 bg-dark text-white border rounded'>
        <b>Başlangıç Saati: {formattedStart}</b>
        <b>Bitiş Saati: {formattetEnd}</b>
        <b>Görev Adı: {eventInfo.event.title}</b>
      </div>
    )
  }

  const handleDateSelect = (selectInfo) => {
    setShowModal(true)
    setNewEvent({
      title: '',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    })
  }

  const addTask = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents([...events, { ...newEvent, id: createEventId() }])
      setShowModal(false)
    }
  }

  const createEventId = () => {
    return String(events.length + 1)
  }

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event
    setSelectedEvent(event)
    setShowModal(true)
  }

  const handleDelete = () => {
    const event = selectedEvent

    if (event) {
      const updatedEvents = events.filter((e) => e.id !== event.id)
      setEvents(updatedEvents)
      setSelectedEvent(null)
    }

    setShowModal(false)
  }

  return (
    <Layout>
      <div className='calendar-container'>
        <div className='d-flex justify-content-end align-items-center mb-3'>
          <Button
            variant='primary'
            onClick={() => setShowModal(true)}
            style={{ backgroundColor: '#551B5E', borderColor: '#551B5E' }}
          >
            Görev Ekle
          </Button>
        </div>
        <FullCalendar
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
          ]}
          locale={trLocale}
          initialDate={new Date()}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek',
          }}
          initialView='dayGridMonth'
          nowIndicator={true}
          titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
          editable={true}
          selectable={true}
          selectMirror={true}
          weekends={true}
          events={events}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent ? 'Etkinlik Detayları' : 'Yeni Etkinlik'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent ? (
            <div>
              <p>
                <b>Görev:</b> {selectedEvent.title}
              </p>
              <p>
                <b>Başlangıç:</b>{' '}
                {dateFormat(selectedEvent.start, 'dd.mm.yyyy HH:MM')}
              </p>
              <p>
                <b>Bitiş:</b>{' '}
                {dateFormat(selectedEvent.end, 'dd.mm.yyyy HH:MM')}
              </p>
            </div>
          ) : (
            <Form>
              <Form.Group>
                <Form.Label>Görev</Form.Label>
                <Form.Control
                  type='text'
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className='mb-2'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Başlangıç Tarihi ve Saati</Form.Label>
                <Form.Control
                  type='datetime-local'
                  value={newEvent.start}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, start: e.target.value })
                  }
                  className='mb-2'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bitiş Tarihi ve Saati</Form.Label>
                <Form.Control
                  type='datetime-local'
                  value={newEvent.end}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, end: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Kapat
          </Button>
          {selectedEvent ? (
            <Button variant='danger' onClick={handleDelete}>
              Sil
            </Button>
          ) : (
            <Button
              variant='primary'
              onClick={addTask}
              disabled={!newEvent.title}
              style={{ backgroundColor: '#551B5E', borderColor: '#551B5E' }}
            >
              Ekle
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}
