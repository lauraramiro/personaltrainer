import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-material.css';
import * as dayjs from 'dayjs';


export default function Trainings() {

    const [trainings, setTrainings] = useState([]);

    const [columnDefs] = useState([ 
        {field: 'activity', sortable: true, filter: true, headerName: 'Activity'},
        {field: 'date', sortable: true, filter: true, headerName: 'Date', valueFormatter: (params) => 
            dayjs(params.data.date).format("DD.MM.YYYY hh:mm")
        },
        {field: 'duration', sortable: true, filter: true, headerName: 'Duration (min)'},
        {headerName: 'Customer', sortable: true, filter: true, cellRenderer: (params) => {
            return `${params.data.customer.firstname} ${params.data.customer.lastname}`;
        }},
    ]); 


    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.err(err))
    }, []);

    return (
        <div className="ag-theme-material" style={{ width: 1000, height:1000 }}>
            <AgGridReact
                rowData={trainings}
                animateRows={true}
                rowSelection="single"
                columnDefs={columnDefs}
            />
        </div>
    );
}