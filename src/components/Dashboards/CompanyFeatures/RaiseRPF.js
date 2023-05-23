import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    body1: {
      // fontSize: "1rem",
      // align = "center",
      // display:"flex",
      // justifyContent="center"
      // Other CSS properties
    },
  },
});
const RaiseRPF = () => {
  return (
    <ThemeProvider theme={theme} >
      <div style={{ top: "20px", margin: "80px 15px 15px 15px",align: "center"}}>
        <Typography
          gutterBottom
          varient="h5"
          align="center"
          fontSize={30}
          fontWeight={500}
        >
          RFP_FORMS
        </Typography>
        <Card
          style={{ maxWidth: 450, margin: "5px auto", padding: "20px 5px" }}
        >
          <CardContent>
            <Typography gutterBottom varient="h7">
              RFT Company
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    label="Rfp Title"
                    placeholder="Rfp Title"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Amount of money"
                    placeholder="Amount of money"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    type="email"
                    label="Sector"
                    placeholder="sector"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    type="Number"
                    label="Timeline money utilisation"
                    placeholder="Timeline money utilisation"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="State"
                    placeholder="State"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default RaiseRPF;
