// import React, { Component } from 'react';
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
            debugger;
            return res.data;
        }).catch(res => {
                return res.data;
            }
        );
    }

    if (method == "get") {
        axios.get(api, mydata).then(result => {
            return result;
        });
    }
}
