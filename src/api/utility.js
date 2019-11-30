import React, { Component } from 'react';
import endpoints from './endpoints';
import axios from 'axios';


export default function MyResult(api, mydata, method) {
    debugger;
    var token = localStorage.getItem('access');
    if (method == "post") {
        axios.post(api,
            mydata,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }
        ).then(res => {
            debugger;
            return res;
        }).catch(
            error => {
                console.log(error);
            }
        );
    }

    if (method == "get") {
        axios.get(api, mydata).then(result => {
            return result;
        });
    }
}
