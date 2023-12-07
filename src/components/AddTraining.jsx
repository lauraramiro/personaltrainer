import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// eslint-disable-next-line react/prop-types
export default function AddTraining({ customerdata }) {

	const [training, setTraining] = useState({
		activity: "",
		date: Date,
		duration: "",
		customer: customerdata,
	});

	const [open, setOpen] = useState(false);


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		fetch("https://traineeapp.azurewebsites.net/gettrainings", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(training),
		})
			.then((response) => {
				if (!response.ok)
					throw new Error("Error adding training: " + response.statusText);
			})
			.catch((err) => console.err(err));

		handleClose();
	};


	return (
		<>
			<Button
				size="small"
				color="primary"
				onClick={handleClickOpen}
			> Add Training
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add training</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						label="Activity"
						value={training.activity}
						onChange={(e) =>setTraining({ ...training, activity: e.target.value })}
						fullWidth
						variant="outlined"
					/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							label="DD/MM/YYYY hh:mm aa"
							inputFormat="DD/MM/YYYY hh:mm aa"
							value={training.date}
							onChange={(value) => setTraining({ ...training, date: value.toISOString() })}
							fullWidth
							variant="outlined"
						/>
					</LocalizationProvider>
					<TextField
						margin="dense"
						label="Duration (min)"
						value={training.duration}
						onChange={(e) => setTraining({ ...training, duration: e.target.value })}
						fullWidth
						variant="outlined"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}