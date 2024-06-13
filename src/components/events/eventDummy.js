import React, { useState, useEffect } from 'react';
import axios from 'axios';
import endpoints, { base_uri } from '../../api/endpoints';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import TodayTwoToneIcon from '@material-ui/icons/TodayTwoTone';

const EventCard = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [isOverflowing, setIsOverflowing] = useState({});
  const getToken = localStorage.getItem('access');

  const fetchEvents = async () => {
    try {
      const response = await axios.get(endpoints.GET_ALL_EVENTS, {
        headers: {
          Authorization: 'Bearer ' + getToken,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };


  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      const newIsOverflowing = {};
      data.forEach(event => {
        const element = document.getElementById(`long-desc-${event.id}`);
        if (element) {
          newIsOverflowing[event.id] = element.scrollHeight > element.clientHeight;
        }
      });
      setIsOverflowing(newIsOverflowing);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [data]);

  const toggleExpand = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  // const Time = (data)=>{
  //   if(data>=12 && data<=24){
  //     return  " PM"
  //   }
  //   else if (data >= 0 && data<12){
  //     return   " AM"
  //   }
  // }

  const convertTo12HourFormat = (time) => { 
    const [hour, minute] = time.split(':'); 
    const hours = ((hour % 12) || 12).toString().padStart(2, '0');
     const minutes = minute.padStart(2, '0'); 
     const ampm = hour >= 12 ? 'PM' : 'AM';
      return `${hours}:${minutes} ${ampm}`; };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '640px',
    margin: '20px auto',
    padding: '20px',
    // fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
  };

  const loader = {
    padding:"20% 0% 0% 45%"
  }

  const photoStyle = {
    width: '100%',
    maxWidth: '250px',
    height: 'auto',
    borderRadius: '8px',
    margin: '0 auto 20px',
    display: 'block',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
    fontFamily :'Daikon-Bold'
  };

  const dateStyle = {
    color: '#888',
    marginBottom: '10px',
    fontWeight:600,
    padding:"0.1rem 0.3rem 0rem 0.5rem"
  };

  const time = {
    fontWeight:600,
    color: '#888',
    padding:"0.1rem 0.3rem 0rem 0.3rem"
  }

  const priceStyle = {
    fontSize: '20px',
    color: '#27ae60',
    marginBottom: '10px',
  };

  const shortDescStyle = {
    fontSize: '16px',
    marginBottom: '10px',
    fontFamily :'Daikon-Regular'
  };

  const venue ={
    fontSize: '16px',
    marginBottom: '10px',
    fontFamily :'Daikon-Bold',
    display :"flex"
  }

  const longDescStyle = {
    fontSize: '14px',
    marginBottom: '10px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontFamily :'Daikon-Regular'
  };

  const expandedDescStyle = {
    fontSize: '14px',
    marginBottom: '10px',
  };

  const guestStyle = {
    fontStyle: 'italic',
    color: '#555',
    fontFamily :'Daikon-Regular'
  };

  const datetime ={
    display :'flex',
    justifyContent: 'space-between'
  }

  const datetime1 ={
    display :'flex',
  }

  const readMoreStyle = {
    color: '#007BFF',
    cursor: 'pointer',
    fontFamily :'Daikon-Regular'
  };

  const anchor ={
    textDecoration: 'none',
    color: 'inherit',
    padding:'0.1rem 0rem 0rem 0.5rem'
  }

  const arrow={
    display:'flex'
  }

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {data.length>0 ? <Grid> {data.map((event) => (
        <div key={event.id} style={cardStyle}>
          <div style={titleStyle} dangerouslySetInnerHTML={{ __html:event.title }}></div>
          <div style={datetime1}>
            <TodayTwoToneIcon/>
          <div style={dateStyle}>{event.date}</div> | 
          <div style={time}>{convertTo12HourFormat(event.time)}
            {/* {Time(Number(event.time.slice(0,2)))} */}
            </div></div>
          <div style={shortDescStyle} dangerouslySetInnerHTML={{ __html:event.short_desc }}></div>
          <img src={`${base_uri}${event.banner}`} alt="Event" style={photoStyle} />
          <div style={datetime}>
            <div style={priceStyle}>Ticket Price: {`₹${event.amount}`}</div>
            </div>
            <div style={venue}><LocationOnTwoToneIcon/>&nbsp; {event.venue}</div>
          <div
            id={`long-desc-${event.id}`}
            style={expanded[event.id] ? expandedDescStyle : longDescStyle}
            dangerouslySetInnerHTML={{ __html: event.long_desc }}
          >
          </div>
          {isOverflowing[event.id] && (
            <span
              style={readMoreStyle}
              onClick={() => toggleExpand(event.id)}
            >
              {expanded[event.id] ? ' Show less' : '...Read more'}
            </span>
          )}
          <div style={datetime}>
          <div style={guestStyle}>Guest: {event.guests}</div>
          <div style={arrow}><ArrowForwardIcon/><a href={event.url} target='_blank' style={anchor}>Apply From Here</a></div>
          </div>
          
        </div>
      ))}</Grid> : <Box style={loader}> <CircularProgress  color="secondary" /></Box>}
    </>
  );
};

export default EventCard;
