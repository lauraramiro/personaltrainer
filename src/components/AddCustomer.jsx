import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

// eslint-disable-next-line react/prop-types
export default function AddCustomer({ fetchCustomers }) {

	const [customer, setCustomer] = useState({
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		streetaddress: "",
		postcode: "",
		city: "",
	});
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		fetch("https://traineeapp.azurewebsites.net/api/customers", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(customer),
		})
			.then((response) => {
				if (!response.ok)
					throw new Error("Adding customer failed: " + response.statusText);

				fetchCustomers();
			})
			.catch((err) => console.err(err));

		handleClose();
	};

	return (
		<>
			<Button
				variant="contained"
				size="small"
				startIcon={<AddIcon />}
				onClick={handleClickOpen}
			>
				Add Customer
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Customer</DialogTitle>
				<DialogContent>
					<TextField
						margin="normal"
						label="Firstname"
						value={customer.firstname}
						fullWidth
						variant="standard"
                        size="small"
						onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
					/>
					<TextField
						margin="dense"
						label="Lastname"
						value={customer.lastname}
						fullWidth
						variant="standard"
                        size="small"
						onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
					/>
					<TextField
						margin="dense"
						label="Email"
						value={customer.email}
						fullWidth
						variant="standard"
                        size="small"
						onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
					/>
					<TextField
						margin="dense"
						label="Phone"
						value={customer.phone}
						fullWidth
						variant="standard"
                        size="small"
						onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
					/>
					<TextField
						margin="dense"
						label="Streetaddress"
						value={customer.streetaddress}
						fullWidth
						variant="standard"
                        size="small"
						onChange={(e) => setCustomer({ ...customer, streetaddress: e.target.value })}
					/>
					<TextField
						margin="dense"
						label="Postcode"
						value={customer.postcode}
						fullWidth
						variant="standard"
                        size="small"
						onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
					/>
					<TextField
						margin="dense"
						label="City"
						value={customer.city}
						fullWidth
						variant="standard"
                        size="small"
						onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
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