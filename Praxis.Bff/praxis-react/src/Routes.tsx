import React, { Component } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Home from './components/Home';
import AllHabbits from './components/AllHabbits';
import CurrentHabbits from './components/CurrentHabbits';
import Today from './components/Today';

export default class Routes extends Component {

    render() {
        return (
            <ReactRoutes>
                <Route path="/" element={<Home/>} />
                <Route path="/all" element={<AllHabbits/>} />
                <Route path="/current" element={<CurrentHabbits/>} />
                <Route path="/today" element={<Today/>} />
            </ReactRoutes>
    );
  }
}