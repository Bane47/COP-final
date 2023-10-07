import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { PieChart, BarChart, LineChart } from "recharts";
import axios from "axios";

const HomeDashboard = () => {
  const [crimeData, setCrimeData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/get-crimes")
      .then((res) => {
        setCrimeData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const crimeByCategory = () => {
    const categories = ["Theft", "Assault", "Burglary", "Homicide"];
    const crimeCount = categories.map((category) => {
      return crimeData.filter((crime) => crime.category === category).length;
    });

    return (
      <PieChart
        data={crimeCount.map((count, index) => ({
          name: categories[index],
          value: count,
        }))}
        options={{
          title: "Crime by Category",
        }}
      />
    );
  };

  const crimeByLocation = () => {
    const locations = crimeData.map((crime) => crime.location);
    const locationCount = locations.reduce((acc, location) => {
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});

    return (
      <BarChart
        data={Object.entries(locationCount).map(([location, count]) => ({
          name: location,
          value: count,
        }))}
        options={{
          title: "Crime by Location",
        }}
      />
    );
  };

  const crimeTrend = () => {
    const crimeTrendData = crimeData.map((crime) => {
      return {
        month: crime.date.getMonth() + 1,
        count: 1,
      };
    });

    const crimeTrendDataByMonth = crimeTrendData.reduce((acc, crime) => {
      acc[crime.month] = (acc[crime.month] || 0) + crime.count;
      return acc;
    }, {});

    return (
      <LineChart
        data={Object.entries(crimeTrendDataByMonth).map(([month, count]) => ({
          name: month,
          value: count,
        }))}
        options={{
          title: "Crime Trend",
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h2">Crime Report Dashboard</Typography>
      <Card sx={{ width: 800, margin: 10 }}>
        <Typography variant="h6">Crime by Category</Typography>
        {crimeByCategory()}
      </Card>
      <Card sx={{ width: 800, margin: 10 }}>
        <Typography variant="h6">Crime by Location</Typography>
        {crimeByLocation()}
      </Card>
      <Card sx={{ width: 800, margin: 10 }}>
        <Typography variant="h6">Crime Trend</Typography>
        {crimeTrend()}
      </Card>
    </Box>
  );
};

export default HomeDashboard;