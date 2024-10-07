const WebSocket = require('ws');
const fs = require('fs');
const csv = require('csv-parser');

const wss = new WebSocket.Server({ port: 5000 });
const data = [];

fs.createReadStream('Gas_Sensors_Measurements.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

wss.on('connection', (ws) => {
  console.log('Client connected');
  let index = 0;

  const interval = setInterval(() => {
    if (index < data.length) {
      const timestamp = new Date().toLocaleTimeString(); // Get the current time
      const rowData = { ...data[index], timestamp }; // Add timestamp to the row data
      ws.send(JSON.stringify(rowData)); // Send the data to the client
      index++;
    } else {
      clearInterval(interval);
      ws.close(); // Close the connection when done
    }
  }, 1000); // Send data every 30 seconds
});
