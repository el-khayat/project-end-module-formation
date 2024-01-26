import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/navbarComponent'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ModalAddEventComponent from '../../components/modalAddEvent/modalAddEventComponent'

import PlanningService from '../../services/planningService'
import { Button } from '@mui/material'
import ModalShowEventComponent from '../../components/modalShowEvent/modalShowEventComponent'



const localizer = momentLocalizer(moment)

const CalendarPage = () => {

    const [events, setEvents] = useState([])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [openShow, setOpenShow] = useState(false);
    const handleOpenShow = () => setOpenShow(true);
    const handleCloseShow = () => setOpenShow(false);

    const [eventToshow, setEventToShow] = useState(null)



    const handelShowEvent = (event) => {
        setEventToShow(event)
        handleOpenShow()
    }
    async function fetchData() {
        const planning = await PlanningService.getAllPlannings()
        setEvents(planning)
    }
    useEffect(() => {

        fetchData();
    }, [])

    const addPlanning = async (planning) => {

        await PlanningService.createPlanning(planning);
        await fetchData();
        handleClose();
    }

    return (
        <div>
            <NavBar />


            <Button variant="outlined" onClick={handleOpen} sx={{ m: 2, marginTop: 10 }} >Add New Planning</Button>

            <ModalAddEventComponent open={open} handleClose={handleClose} addPlanning={addPlanning} />
            <ModalShowEventComponent open={openShow} handleClose={handleCloseShow} planning={eventToshow} />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '500px', margin: "16px" }}
                onSelectEvent={handelShowEvent}
                eventPropGetter={
                    (event, start, end, isSelected) => {
                        const hexColors = [
                            "#ff0000",
                            "#00ff00",
                            "#0000ff",
                            "#ffff00",
                            "#ff00ff",
                            "#00ffff",
                            "#ff8000",
                            "#8000ff",
                            "#0080ff",
                            "#ff0080",
                            "#80ff00",
                            "#0080ff",
                            "#ff80c0",
                            "#80c0ff",
                            "#c0ff80",
                            "#ffcc00",
                            "#cc00ff",
                            "#00ffcc",
                            "#ccff00",
                            "#00ccff"
                        ];
                        let newStyle = {
                            backgroundColor: "lightgrey",
                            color: 'black',
                            borderRadius: "0px",
                            border: "none"
                        };
                        newStyle.backgroundColor = hexColors[ event.entreprise.id % 20]
                        
                        if (Date.now()-1 > event.end) {
                            newStyle.backgroundColor = "#ff3333"
                        }

                        return {
                            className: "",
                            style: newStyle
                        };
                    }
                }
            />
        </div>
    )
}

export default CalendarPage
