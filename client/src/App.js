import React, { useEffect, useState } from 'react';
import log from './config/customers';
import './App.css';
import { Grid, Container, Paper, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

function App() {
  const [customer, setCustomer] = useState({});
  const [totalRewards, setTotalRewards] = useState(null);
  const handleChange = (e) => {
    setCustomer(e.target.value);
  }
  const displayRewards = () => {
    let rewardsTotal = 0;
    if (customer.transactionHistory && customer.transactionHistory.length > 0) {
      customer.transactionHistory.map(item => {
        let monthlyValues = Object.values(item);
        console.log(monthlyValues);
        monthlyValues.map(value => {
          value.map(item => {
            console.log(item.total);
            if (item.total > 100) {
              rewardsTotal += (Math.round(item.total) - 100) * 2;
            }
            if (item.total > 50) {
              rewardsTotal += (Math.round(item.total) - 50);
            }
          });
        })
      });
    }
    console.log(rewardsTotal);
    setTotalRewards(rewardsTotal);
  }


  useEffect(displayRewards, [customer]);

  return (
    <div className="App">
      <Container maxWidth='xs'>
        <Grid container
          direction='row'
          justify='center'>
          <Grid item xs={12}>
            <Paper>
              <FormControl id='customerDropdown'>
                <InputLabel id="customerSelect">Customer</InputLabel>
                <Select
                  labelId="customerSelect"
                  name='customerSelect'
                  value={customer}
                  onChange={(e) => handleChange(e)}
                >
                  {log.customers.map(item => <MenuItem value={item} key={item.id}>{item.Name}</MenuItem>)}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              {totalRewards ? totalRewards : null}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
