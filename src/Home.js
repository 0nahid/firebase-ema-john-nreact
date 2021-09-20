import React from 'react';
import { getAuth } from 'firebase/auth';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={getAuth().signOut()}>Sign Out</button>
        </div >
    );
};

export default Home;