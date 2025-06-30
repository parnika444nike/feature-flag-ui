import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './dashboard.css'; 

function Feature() {
    
    const [feature, setFeature] = useState([]);
    
    const [filteredFeature, setFilteredFeature] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState('');
    
    const [expandedRowId, setExpandedRowId] = useState(null);

    
    useEffect(() => {
        axios.get('http://localhost:8080/')
            .then(res => {
                setFeature(res.data);
                setFilteredFeature(res.data); 
            })
            .catch(err => console.error("Error fetching feature data:", err)); 
    }, []); 
    
    function Getdate(olddate) {
        if (!olddate) return ''; 
        const date = new Date(olddate);
      
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toISOString().slice(0, 10); 
    }

   
    const toggleRow = (id) => {
        
        setExpandedRowId(expandedRowId === id ? null : id);
    };

    
    const handleSearch = (event) => {
        const input = event.target.value;
        setSearchTerm(input); 

        const filter = input.toUpperCase();
        // Filter the original feature data based on the search term
        const newFilteredFeature = feature.filter(data => {
            // Check the 'name' field for a match (you can expand this to other fields)
            return data.name.toUpperCase().includes(filter);
        });
        setFilteredFeature(newFilteredFeature); // Update the filtered data
    };

    return (
        // Main container with full viewport height and centering utility classes
        <div className='vh-100 justify-content-center align-items-center'>
            {/* Navigation Bar */}
            <nav className="nav-bar">
                <p className="nav-home">Home</p>
                <p className="nav-accountone">Support</p>
                <p className="nav-accounttwo">|</p>
                <p className="nav-accounttwo">Teams</p>
                <p className="nav-accounttwo">|</p>
                <p className="nav-accounttwo">Profile</p>
            </nav>

            {/* Main Content Block for Dashboard */}
            <div className='tableblock w-100 vh-100 bg-white rounded'>
                <div className='top-content'>
                    <h3 className='dashboard-title'>Admin Dashboard</h3>
                    
                </div>

                <div className='search-create'>
                    {/* Search Input */}
                <input
                    className='search-bar'
                    type="text"
                    id="myInput"
                    placeholder="Search for feature by name..."
                    value={searchTerm} // Control the input value with state
                    onChange={handleSearch} // Use the React event handler
                />
                <Link to="/create" className='createbtn'>+ Create</Link>
                </div>

                <div className="newtable overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className='featuretable table fold-table table-striped w-100 vh-10 padding-100' id='mytable'>
                        <thead className='fold-content bg-gray-50'>
                            <tr>
                                <th className='tableitem'>Name</th>
                                <th className='tableitem'>Status</th>
                                <th className='tableitem'>Creator</th>
                                <th className='tableitem'>Start</th>
                                <th className='tableitem'>End</th>
                                <th className='tableitem'>Prod</th>
                                <th className='tableitem'>Test</th>
                                <th className='tableitem'>Dev</th>
                                <th className='tableitem'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {
                                // Map through the filteredFeature data to render each row
                                filteredFeature.map((data) => (
                                    <React.Fragment key={data.id}>
                                        <tr
                                            className='hover:bg-gray-50 cursor-pointer transition-colors duration-150 ease-in-out'
                                            onClick={() => toggleRow(data.id)}
                                        >
                                            <td>{data.name}</td>
                                            <td>{data.status}</td>
                                            <td>{data.creator}</td>
                                            <td>{Getdate(data.start)}, {data.starttime} {data.startzone}</td>
                                            <td>{Getdate(data.end)}, {data.endtime} {data.endzone}</td>
                                            <td>{data.prod}</td>
                                            <td>{data.test}</td>
                                            <td>{data.dev}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                <Link to={`update/${data.id}`} className='updatebtnn'>
                                                    Update
                                                </Link>
                                            </td>
                                        </tr>
                                        {expandedRowId === data.id && (
                                            <tr className='bg-gray-50 animate-accordion-open'>
                                                <td colSpan="9" className='px-6 py-4 text-sm text-gray-700 border-t border-gray-200'>
                                                    <strong className="font-semibold text-gray-800">Description: </strong> <p>{data.descp}</p>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Feature;