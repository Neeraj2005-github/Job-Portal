
import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <div className='dashboard'>
                <div className='header'>
                    <img className='logo' src='logo.png'></img>
                    <div className='logotext'><span>Job</span> Portal</div>
                    <img className='logouticon'  src='logout.jpg'alt=' ' />
                    <label className='fullnametext' >fullname</label>
                </div>
                <div className='menu'>menu</div>
                <div className='outlet'>outlet</div>
            </div>
        );
    }
}

export default Dashboard;
