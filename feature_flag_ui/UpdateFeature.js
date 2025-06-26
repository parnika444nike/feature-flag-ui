import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './dashboard.css'


function UpdateFeature(){
    const[name, setName]=useState('')
    const[status, setStatus]=useState('')
    const[start, setStart]=useState('')
    const[starttime, setStarttime]=useState('')
    const[startzone, setStartzone]=useState('')
    const[end, setEnd]=useState('')
    const[endtime, setEndtime]=useState('')
    const[endzone, setEndzone]=useState('')
    const[prod, setProd]=useState('')
    const[dev, setDev]=useState('')
    const[test, setTest]=useState('')
    const[descp, setDescp]=useState('')
    

    
    const navigate = useNavigate();
    const{id} = useParams();  
    useEffect(()=>{
        console.log("status updated to", status)
    }, [status])
    useEffect(() => {
        // Fetch the existing feature data when the component mounts
        
        axios.get(`http://localhost:8080/feature/${id}`)
            .then(res => {
               
                const featureData = res.data;
                if (featureData ) {
                    
                    setDescp(featureData.descp ||'');
                    setName(featureData.name || '');
                    setStatus(featureData.status || '');
                    
                    // Format dates for input type="date"
                    setStart(featureData.start ? new Date(featureData.start).toISOString().split('T')[0] : '');
                    setStarttime(featureData.starttime || '');
                    setStartzone(featureData.startzone || '');
                    setEnd(featureData.end ? new Date(featureData.end).toISOString().split('T')[0] : '');
                    setEndtime(featureData.endtime || '');
                    setEndzone(featureData.endzone || '');
                    setProd(featureData.prod || '');
                    setTest(featureData.test || '');
                    setDev(featureData.dev || '');

           
                }
            })
            .catch(err => console.log(err));
    }, [id]); 
    

    function handleSubmit(event){
        event.preventDefault();
       
        const req = { name, status, creator:"Parnika", start, starttime, startzone, end, endtime, endzone, prod, test, dev, descp};
        console.log("Request payload:", req);
        axios.put('http://localhost:8080/update/'+id, req)
        .then(res => {
            console.log("Response", res);
            navigate('/');

        }).catch(err => console.log("Axios error",err));

    }


    return(
        <div className=' w-100'>
            <nav className="nav-bar">
        <p className="nav-home">Home</p>
        <p className="nav-accountone">Support</p>
        <p className="nav-accounttwo">|</p>
        <p className="nav-accounttwo">Teams</p>
        <p className="nav-accounttwo">|</p>
        <p className="nav-accounttwo">Profile</p>
        </nav>
            <div className='w-50 vh-100 bg-white rounded'>
            <form onSubmit={handleSubmit}>
                <h2 className='updatetitle '>Update Feature Flag</h2>
                
                <div className='mb-2 d-flex w-100'>
                <label htmlFor="" className='labelendzoneu w-100'>Status</label>
                    <select value={status} className='labelstatuss form-control' onChange={e => {setStatus(e.target.value); console.log(status)}}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labeldescp w-100'>Description</label>
                    <input type="text" value={descp} className='labeldescr form-control' onChange={e => setDescp(e.target.value)}/>    
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelstart  w-100'>Start Date</label>
                    <input type="date" value={start} className='form-control' onChange={e => setStart(e.target.value)}/>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelstarttime w-100'>Start Time</label>
                    <input type="time" value={starttime} className='form-control' onChange={e => setStarttime(e.target.value)}/>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelstartzone  w-100'>Start Zone</label>
                    <select value={startzone} className='form-control' onChange={e => setStartzone(e.target.value)}>
                    <option value="IST">IST</option>
                    <option value="EST">EST</option>
                    <option value="UTC">UTC</option>
                    </select>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelend  w-100'>End Date</label>
                    <input type="date" value={end} className='labelendd form-control' onChange={e => setEnd(e.target.value)}/>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelendtime  w-100'>End Time</label>
                    <input type="time" value={endtime} className='form-control' onChange={e => setEndtime(e.target.value)}/>
                </div>
                <div className='mb-2 w-100'>
                    <label htmlFor="" className='labelendzone  w-100'>End Zone</label>
                    <select value={endzone} className='form-control' onChange={e => setEndzone(e.target.value)}>
                    <option value="IST" >IST</option>
                    <option value="EST">EST</option>
                    <option value="UTC">UTC</option>
                    </select>
                </div>
                <div className='mb-2 w-100'>
                <label htmlFor="" className='labeprod w-100'>Prod Status</label>
                    <select value={prod} className='labelprodd form-control' onChange={e => setProd(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                </div>
                <div className='mb-2 w-100'>
                <label htmlFor="" className='labeltest w-100'>Test Status</label>
                <select value={test} className='form-control' onChange={e => setTest(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                </div>
                <div className='mb-2 w-100'>
                <label htmlFor="" className='labeldev w-100'>Dev Status</label>
                <select value={dev} className='form-control' onChange={e => setDev(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>    
                </div>
                <button className='updatebtn btn-success'>Update</button>
                <button href="/Feature.js" className='cancelbtn2'>Cancel</button>
            </form>
            </div>
        </div>
    )
}

export default UpdateFeature