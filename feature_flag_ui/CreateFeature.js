import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function CreateFeature(){
    const[name, setName]=useState('')
    const[status, setStatus]=useState('Active')
    const[start, setStart]=useState('')
    const[starttime, setStarttime]=useState('')
    const[startzone, setStartzone]=useState('IST')
    const[end, setEnd]=useState('')
    const[endtime, setEndtime]=useState('')
    const[endzone, setEndzone]=useState('IST')
    const[prod, setProd]=useState('Active')
    const[dev, setDev]=useState('Active')
    const[test, setTest]=useState('Active')
    const[descp, setDescp]=useState('')
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        console.log("called")
        const req = {name, status, creator:"Parnika", start, starttime, startzone, end, endtime, endzone, prod, test, dev, descp};
        axios.post('http://localhost:8080/create', req)
        .then(res => {
            console.log( res);
            navigate('/');

        }).catch(err => console.log(err));

    }


    return(
        <div className='  vh-100 justify-content-center align-items-center'>
            <nav class="nav-bar w-100">
        <p class="nav-home">Home</p>
        <p class="nav-accountone">Support</p>
        <p class="nav-accounttwo">|</p>
        <p class="nav-accounttwo">Teams</p>
        <p class="nav-accounttwo">|</p>
        <p class="nav-accounttwo">Profile</p>
        </nav>
            <div className='w-50 vh-100 bg-white rounded'>
            <form onSubmit={handleSubmit}>
                <h2 className='createtitle'>Create Feature Flag</h2>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelstartu w-100'>Name</label>
                    <input type="text" placeholder={name} className='form-control' onChange={e => setName(e.target.value)}/>
                </div>


                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelstartu w-100'>Description</label>
                    <input type="text" placeholder={descp} className='form-control' onChange={e => setDescp(e.target.value)}/>
                </div>


                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelendzoneu w-100'>Status</label>
                    <select placeholder={status} className='form-control' onChange={e => setStatus(e.target.value)}>
                    <option>Active</option>
                    <option>Inactive</option>
                    </select>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelstartu w-100'>Start Date</label>
                    <input type="date" placeholder={start} className='form-control' onChange={e => setStart(e.target.value)}/>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelstarttimeu w-100'>Start Time</label>
                    <input type="time" placeholder="Enter Name" className='form-control' onChange={e => setStarttime(e.target.value)}/>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelstartzoneu w-100'>Start Zone</label>
                    <select placeholder={status} className='form-control' onChange={e => setStartzone(e.target.value)}>
                    <option>IST</option>
                    <option>UTC</option>
                    <option>EST</option>
                    </select>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelendu w-100'>End Date</label>
                    <input type="date" placeholder="Enter Name" className='form-control' onChange={e => setEnd(e.target.value)}/>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelendtimeu w-100' >End Time</label>
                    <input type="time" placeholder="Enter Name" className='form-control' onChange={e => setEndtime(e.target.value)}/>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelendzoneu w-100'>End Zone</label>
                    <select placeholder={status} className='form-control' onChange={e => setEndzone(e.target.value)}>
                    <option>IST</option>
                    <option>UTC</option>
                    <option>EST</option>
                    </select>
                </div>
                <div className='mb-2 w-100'>
                <label htmlFor="" className='labelendzoneu w-100'>Prod Status</label>
                    <select placeholder={prod} className='form-control' onChange={e => setProd(e.target.value)}>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                </div>
                <div className='mb-2 w-100'>
                <label htmlFor="" className='labelendzoneu w-100'>Test Status</label>
                <select placeholder={test} className='form-control' onChange={e => setTest(e.target.value)}>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                </div>
                <div className='mb-2 w-100'>
                <label htmlFor="" className='labelendzoneu w-100'>Dev Status</label>
                <select placeholder={dev} className='form-control' onChange={e => setDev(e.target.value)}>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>    
                </div>
                <button className='createbtnn btn btn-success'>Create</button>
                <button href='/feature.js' className='cancelbtn'>Cancel</button>
            </form>
            </div>
        </div>
    )
}

export default CreateFeature