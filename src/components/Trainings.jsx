import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs';
import { IconButton, Snackbar } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";



export default function Trainings() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);


    const [columnDefs] = useState([ 
        {
			cellRenderer: (params) => (
				<IconButton
					size="small"
					color="error"
					aria-label="delete training"
					onClick={() => deleteTraining(params.data.id)}
				>
					<DeleteIcon />
				</IconButton>
			),
			width: 50,
		},
        {field: 'activity', sortable: true, filter: true, headerName: 'Activity'},
        {field: 'date', sortable: true, filter: true, headerName: 'Date', valueFormatter: (params) => 
            dayjs(params.data.date).format("DD.MM.YYYY hh:mm")
        },
        {field: 'duration', sortable: true, filter: true, headerName: 'Duration (min)'},
        {headerName: 'Customer', sortable: true, filter: true, cellRenderer: (params) => {
            if (params.customer !== null) {
                return `${params.data.customer.firstname} ${params.data.customer.lastname}`;
            }
            
        }},
    ]); 


    const fetchTrainings = () => {
        fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(error => {
          console.error("Error fetching trainings:", error);
        });
    }

    useEffect(() => {
        fetchTrainings();
    }, []);



    const deleteTraining = (id) => {
		if (window.confirm("Are you sure?")) {
			fetch(import.meta.env.VITE_API_URL + `/api/trainings/${id}`, {
				method: "DELETE",
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error in deletion: " + response.statusText);
					} else {
						setOpen(true);
						fetchTrainings();
					}
				})
				.catch((err) => console.error(err));
		}
	};


    return (
        <div className="ag-theme-material" style={{ width: 1000, height:1000 }}>
            <h2>Trainings</h2>
            <AgGridReact
                rowData={trainings}
                animateRows={true}
                rowSelection="single"
                columnDefs={columnDefs}
            />
            <Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
				message="Training deleted succesfully"
			/>
        </div>
    );
}