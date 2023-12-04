/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditCustomer({ customerdata, fetchCustomers }) {
	//States:
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

	//Functions:
	const handleClickOpen = () => {
		setCustomer({
			firstname: customer.firstname,
			lastname: customer.lastname,
			email: customer.email,
			phone: customer.phone,
			streetaddress: customer.streetaddress,
			postcode: customer.postcode,
			city: customer.city,
		});
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		fetch(customerdata.links[0].href, {
			method: "PUT",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(customer),
		})
			.then((response) => {
				if (!response.ok)
					throw new Error("Editing customer failed: " + response.statusText);

				fetchCustomers();
			})
			.catch((err) => console.err(err));

		handleClose();
	};

	//Rendering
	return (
		<>
			<IconButton
				size="small"
				color="primary"
				aria-label="edit customer"
				onClick={handleClickOpen}
			>
				<EditIcon />
			</IconButton>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Update Customer</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						label="Firstname"
						value={customer.firstname}
						onChange={(e) => 
							setCustomer({ ...customer, firstname: e.target.value })
						}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Lastname"
						value={customer.lastname}
						onChange={(e) =>
							setCustomer({ ...customer, lastname: e.target.value })
						}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Email"
						value={customer.email}
						onChange={(e) =>
							setCustomer({ ...customer, email: e.target.value })
						}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Phone"
						value={customer.phone}
						onChange={(e) =>
							setCustomer({ ...customer, phone: e.target.value })
						}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Streetaddress"
						value={customer.streetaddress}
						onChange={(e) =>
							setCustomer({ ...customer, streetaddress: e.target.value })
						}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Postcode"
						value={customer.postcode}
						onChange={(e) =>
							setCustomer({ ...customer, postcode: e.target.value })
						}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="City"
						value={customer.city}
						onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
						fullWidth
						variant="standard"
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