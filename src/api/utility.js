import React, { Component } from 'react';
import endpoints from './endpoints';
import axios from 'axios';


export default function MyResult(api, mydata, method) {
    debugger;
    var token = localStorage.getItem('access');
    if(method == "post"){
        axios.post(api,
        mydata,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        ).then(result => {
            debugger;
            console.log(result);
        });
    }
    if(method == "get"){
        axios.get(api, mydata).then(result => {
            return result;
        });
    }
}
