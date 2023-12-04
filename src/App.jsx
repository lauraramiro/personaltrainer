import './App.css'
import Customers from './components/Customers'
import Trainings from './components/Trainings'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TrainingCalendar from './components/Calendar';
import { useState } from 'react';


function App() {
  const [value, setValue] = useState('one');


  const handleChange = (event, value) => {
    setValue(value);
    };

  return (
    <>
        <Tabs value={value} onChange={handleChange}>
          <Tab value='one' label='Customers' />
          <Tab value='two' label='Trainings' />
          <Tab value='three' label='Calendar' />
        </Tabs>
        {value === 'one' && <div><Customers /></div>}
        {value === 'two' && <div><Trainings /></div>}
        {value === 'three' && <div><TrainingCalendar /></div>}
    </>
  )
}

export default App
