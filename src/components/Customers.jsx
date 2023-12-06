import { useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
//import { DataGrid } from '@mui/x-data-grid';



export default function Customers() {

    const [customers, setCustomers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(false);
    const gridRef = useRef();



    const [columnDefs] = useState([ 
        {cellRenderer: (params) => (<IconButton
					size="small"
					color="error"
					aria-label="delete customer"
					onClick={() => deleteCustomer(params.data.links[0].href)}
				>
					<DeleteIcon />
				</IconButton>
			),
			width: 60
		},
        {cellRenderer: (params) => (<EditCustomer customerdata={params.data} fetchCustomers={fetchCustomers}/>),width: 60},
        {cellRenderer: (params) => (<AddTraining customerdata={params.data.links[0].href} />),width: 130},
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        
		
		
    ]); 

    useEffect(() => fetchCustomers, []);


    const fetchCustomers = () => {
        fetch("https://traineeapp.azurewebsites.net/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.err(err))
    }


    const deleteCustomer = (url) => {
		if (window.confirm("Are you sure?")) {
			fetch(url, { method: "DELETE" })
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error in deletion: " + response.statusText);
					} else {
						setOpen(true);
						fetchCustomers();
					}
				})
				.catch((err) => console.error(err));
		}
	};

	const getParams = () => {
		return {
			columnKeys: [
				"firstname",
				"lastname",
				"email",
				"phone",
				"streetaddress",
				"postcode",
				"city",
			],

			suppressQuotes: true,
		};
	};

    const onBtnExport = useCallback(() => {
		gridRef.current.api.exportDataAsCsv(getParams());
	}, []);


    return (
        
        <>   
			<AddCustomer fetchCustomers={fetchCustomers} /> 
            <Button size="small" onClick={onBtnExport}>
					Export
				</Button>
            <div className="ag-theme-material" style={{ width: 1200, height: 600 }}>
                <AgGridReact
                    rowData={customers}
                    animateRows={true}
                    rowSelection="single"
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationAutoPageSize={true}
                    editType='none'
                />
            </div>
        </>/*
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