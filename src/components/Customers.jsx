import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-material.css';


export default function Customers() {

    const [customers, setCustomers] = useState([]);


    const [columnDefs] = useState([ 
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true}
    ]); 

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.err(err))
    }, []);


    return (        
        <div className="ag-theme-material" style={{ width: 1000, height:1000 }}>
            <AgGridReact
                rowData={customers}
                animateRows={true}
                rowSelection="single"
                columnDefs={columnDefs}
            />
        </div>/*
        <div style={{ height: 400, width: '100%'}}>
            <DataGrid
                rows={customers}
                columns={columnDefs}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5},
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>*/
    );
}