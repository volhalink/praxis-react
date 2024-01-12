import React, { Component } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Home from './components/Home';
import AllHabits from './components/AllHabits';
import ActiveHabits from './components/ActiveHabits';
import Today from './components/Today';
import Profile from './components/profile/Profile'
import History from './components/History';

export default class Routes extends Component {

    render() {
        return (
            <ReactRoutes>
                <Route path="/" element={<Home/>} />
                <Route path="/all" element={<AllHabits/>} />
                <Route path="/active" element={<ActiveHabits/>} />
                <Route path="/today" element={<Today/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/history" element={<History/>} />
            </ReactRoutes>
    );
  }
}