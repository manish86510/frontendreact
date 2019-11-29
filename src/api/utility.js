import React, { Component } from 'react';
import endpoints from './endpoints';
import axios from 'axios';


export default function MyResult(api, mydata) {
    var token = localStorage.getItem('access');
    axios.post(api,
    mydata,
    {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }
    ).then(result => {
        return result;
    });
}
