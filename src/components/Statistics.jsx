import { useState, useEffect } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { groupBy, sumBy } from 'lodash';


function Statistics(){

    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
      fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(error => {
          console.error("Error fetching trainings:", error);
        });

    }

    const groupActivities = () => {
      const activites = groupBy(trainings, 'activity');
      const newData = Object.keys(activites).map((activity) => ({
        name: activity,
        value: sumBy(activites[activity], 'duration'),
      }));
      
      return newData;
    }

    useEffect(() => fetchTrainings(), [])

    return (
        <>
            <h2>Statistics</h2>
            <ResponsiveContainer width="105%" height={400}>
                <BarChart width={150} height={40} data={groupActivities()}  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft', offset: -10}} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}

export default Statistics;