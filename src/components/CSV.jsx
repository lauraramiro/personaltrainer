/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import { IosShare } from "@mui/icons-material";

function CSV({  customers }) {
    const CSVData = customers.map(customer => ({
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        phone: customer.phone,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city
    }));

    return (
        <Button 
            variant="outlined"
            size="small"
            startIcon={<IosShare />}
        >
            <CSVLink data={CSVData} filename={"customers.csv"}>
                Export
            </CSVLink>
        </Button>
        
    );
}

export default CSV;