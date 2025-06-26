import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// No need to import './dashboard.css' anymore as we're using Tailwind CSS directly.
import './dashboard.css'
<script src="https://cdn.tailwindcss.com">
</script>

function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("mytable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


function Feature() {
    // State to hold the feature data fetched from the API
    const [feature, setFeature] = useState([]);
    // State to manage which row is currently expanded in the accordion
    const [expandedRowId, setExpandedRowId] = useState(null);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8080/')
            .then(res => {
                setFeature(res.data);
            })
            .catch(err => console.error("Error fetching feature data:", err)); // Use console.error for errors
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Helper function to format the date string
    function Getdate(olddate) {
        if (!olddate) return ''; // Handle cases where date might be null or undefined
        const date = new Date(olddate);
        // Ensure date is valid before formatting
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toISOString().slice(0, 10); // Formats to YYYY-MM-DD
    }

    // Function to toggle the expanded state of a row
    const toggleRow = (id) => {
        // If the clicked row is already expanded, collapse it (set to null), otherwise expand it
        setExpandedRowId(expandedRowId === id ? null : id);
    };

    return (
        // Main container with full viewport height and centering utility classes
        // Assuming Tailwind CSS CDN is loaded in your index.html
        <div className='vh-100  justify-content-center align-items-center'>
            {/* Navigation Bar */}
            <nav class="nav-bar">
        <p class="nav-home">Home</p>
        <p class="nav-accountone">Support</p>
        <p class="nav-accounttwo">|</p>
        <p class="nav-accounttwo">Teams</p>
        <p class="nav-accounttwo">|</p>
        <p class="nav-accounttwo">Profile</p>
        </nav>

            {/* Main Content Block for Dashboard */}
            <div className=' tableblock w-100 vh-100 bg-white rounded'>
                
                <div className='top-content'>
                <h3 className='dashboard-title'>Admin Dashboard</h3>
   
                 <Link to="/create" className='createbtn'>+ Create</Link>
                </div>
                
                

                <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.."/>

                <div className="newtable overflow-x-auto rounded-lg border border-gray-200 shadow-sm" id='mytable' >
                    <table className='featuretable table fold-table table-striped w-100 vh-10 padding-100 ' >
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
                                // Map through the feature data to render each row
                                feature.map((data) => (
                                    // Using React.Fragment to return multiple elements (main row + description row)
                                    <React.Fragment key={data.id}>
                                        {/* Main Feature Row - Clickable for Accordion */}
                                        <tr
                                            className='hover:bg-gray-50 cursor-pointer transition-colors duration-150 ease-in-out'
                                            onClick={() => toggleRow(data.id)} // Toggle row expansion on click
                                        >
                                            <td >{data.name}</td>
                                            <td >{data.status}</td>
                                            <td >{data.creator}</td>
                                            <td >{Getdate(data.start)}, {data.starttime} {data.startzone}</td>
                                            <td >{Getdate(data.end)}, {data.endtime} {data.endzone}</td>
                                            <td >{data.prod}</td>
                                            <td >{data.test}</td>
                                            <td >{data.dev}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                {/* Update Button */}
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
