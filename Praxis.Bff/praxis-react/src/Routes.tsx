import React, { Component } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Home from './components/Home';
import AllHabits from './components/AllHabits';
import CurrentHabits from './components/CurrentHabits';
import Today from './components/Today';
import Profile from './components/Profile'

export default class Routes extends Component {

    render() {
        return (
            <ReactRoutes>
                <Route path="/" element={<Home/>} />
                <Route path="/all" element={<AllHabits/>} />
                <Route path="/current" element={<CurrentHabits/>} />
                <Route path="/today" element={<Today/>} />
                <Route path="/profile" element={<Profile/>} />
            </ReactRoutes>
    );
  }
}