// My Groups component
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: Groups component to show list of my groups.

import React, { useEffect, useState } from "react";
import profile_pic from '../../static/images/profile.jpg';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import MyGroupsComponent from "../shared/MyGroupsComponent";

import { RiSendPlaneFill } from 'react-icons/ri';
import { IoCreateOutline } from 'react-icons/io5';

export default function MyEventsMobile() {

    const loggedInUserId = localStorage.getItem("uid");

    // Loading
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);

    const getMyRegisteredEvents = async () => {
        axios.get('/api/events/myEvents?', {
            params: {memberId: loggedInUserId}
        })
        .then(res => {
            setEvents(res.data)
            setIsLoading(false);

        }).catch(err => {
        console.log(err)
        })
    }

    useEffect (() => {
        getMyRegisteredEvents();
    }, [])

  return (
    <div class="w-full bg-white p-5 rounded-t-xl">
        <div className='mb-5'>
            <div class="flex items-center">
                <div class="w-4/5">
                    <p className='text-lg font-semibold'>
                        My Events <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Registered</span>
                    </p>
                </div>
                <div class="w-1/5 flex justify-end text-lg cursor-pointer" data-tooltip-target="tooltip-create-group" data-tooltip-placement="right">
                    <Link to="/groups/create">
                        <IoCreateOutline />
                    </Link>
                </div>
                <div id="tooltip-create-group" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Create group
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>

        {events.length == 0 && 
        <>
            <div className="text-sm">
                You are not registered to any events yet.
            </div>
        </>
        }
        {events.slice(0).reverse().map((event)=> (
            <MyGroupsComponent event={event} type='events'/>
        ))}

    </div>
  )
}