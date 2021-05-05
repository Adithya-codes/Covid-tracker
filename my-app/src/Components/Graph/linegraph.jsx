import { Timeline } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {Line} from 'react-chartjs-2'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "20rem",
    textAlign: "center",
    marginLeft: "1rem",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    paddingLeft: "-2rem",
  },
}));

const Linegraph = ({ countryList }) => {
  const classes = useStyles();
  const [country, setCountry] = useState("India");
  const [date,setDate]= useState([]);
  const[caseCount,setCaseCount]=useState([])

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const url = `https://disease.sh/v3/covid-19/historical?lastdays=7`;

  useEffect(() => {
    const casesArr = [];
    const recoveredArr = [];
    const deathsArr = [];

    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();

      data.map((key, idx) =>
        casesArr.push({ country: key.country, cases: key.timeline.cases })
      );
      data.map((key, idx) =>
        recoveredArr.push({
          country: key.country,
          recovered: key.timeline.recovered,
        })
      );
      data.map((key, idx) =>
        deathsArr.push({ country: key.country, deaths: key.timeline.deaths })
      );

      console.log(casesArr, deathsArr);
      let selected = [];
      const dataArr = []

      selected.push(casesArr.find((el) => el.country === country));

      console.log(selected);

      const cases = (selected? selected.map((el) => el?.cases):[]);

      console.log(cases);

      cases.map((el)=>{
           
        var month = Object.keys(el)

      for(var i=0;i<month.length;i++){

        
      var n= month[i][0]

      console.log(n);
      }

      console.log(n);

      n=5

      if(n===5)
      {
        var x = Object.values(el)
        console.log(x);
        
      }
      
          

        
          
        

      })
      

      const dates = (cases? Object.keys(cases[0]):'');

      const casesCount = (cases?Object.values(cases[0]):'');

     

      console.log(dates);

      console.log(casesCount,dates);
      setDate(dates)
      setCaseCount(casesCount)
    };

    fetchData();
  }, []);

  console.log(caseCount);
  console.log(date);

  const caseslineChart = (

    caseCount?<Line
    data={{labels:date,
    datasets:[{data:caseCount,label:'Infected',borderColor:'#e23028',fill:false,backgroundColor:'#e23028'}]}}
    
    />:null


  )

 
  return (
    <div className="line-graph-container">
      <div className="input-field">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Country
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={country}
            onChange={handleChange}
            label="Country"
          >
            {countryList.map((val, idx) => (
              <MenuItem value={val.name}>{val.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="graph-data">

        
      <div className="cases-graph">

        <h1> Infected</h1>

        {caseslineChart}

    
      </div>
      <div className="recovered-graph">
        <h1> recovered graph</h1>
      </div>
      <div className="death-graph">
        <h1> death graph</h1>
      </div>
      </div>
    </div>
  );
};

export default Linegraph;
