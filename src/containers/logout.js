import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        localStorage.clear();
        history.push('/login');
    }, [history]);

    return null;
};

export default Logout;
