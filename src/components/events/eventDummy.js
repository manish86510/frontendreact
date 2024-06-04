import React, { useState, useEffect } from 'react';
import axios from 'axios';
import endpoints, { base_uri } from '../../api/endpoints';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

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
    padding:"20% 0% 0% 30%"
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
  };

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

  const readMoreStyle = {
    color: '#007BFF',
    cursor: 'pointer',
    fontFamily :'Daikon-Regular'
  };

  return (
    <>
      {data.length>0 ? <Grid> {data.map((event) => (
        <div key={event.id} style={cardStyle}>
          <div style={titleStyle}>{event.title}</div>
          <div style={dateStyle}>{event.date}</div>
          <div style={shortDescStyle}>{event.short_desc}</div>
          <img src={`${base_uri}${event.banner}`} alt="Event" style={photoStyle} />
          <div style={priceStyle}>{`₹${event.amount}`}</div>
          <div
            id={`long-desc-${event.id}`}
            style={expanded[event.id] ? expandedDescStyle : longDescStyle}
          >
            {event.long_desc}
          </div>
          {isOverflowing[event.id] && (
            <span
              style={readMoreStyle}
              onClick={() => toggleExpand(event.id)}
            >
              {expanded[event.id] ? ' Show less' : '...Read more'}
            </span>
          )}
          <div style={guestStyle}>Guest: {event.guests}</div>
        </div>
      ))}</Grid> : <Box style={loader}> <CircularProgress  color="secondary" /></Box>}
    </>
  );
};

export default EventCard;
