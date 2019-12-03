import React, { Component } from 'react';
import endpoints from './endpoints';
import axios from 'axios';


export default function MyResult(api, mydata, method) {
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
