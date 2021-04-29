import React, { useState, useEffect,forwardRef } from "react";
import MaterialTable from 'material-table'
import { TablePagination} from '@material-ui/core';
import {MuiThemeProvider} from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';

import Search from '@material-ui/icons/Search';


const tableIcons = { Search: forwardRef((props, ref) => <Search {...props} ref={ref} />)}

const theme = createMuiTheme({
  palette: {
primary:{
main:'#000080'}

  },

});

const Table = () => {
  let url = `https://api.covid19india.org/data.json`;

  const [tableData,setTableData] = useState([]);

  

  useEffect(() => {
    const fetchStateData = async () => {
      const stateArr = [];

      const res = await fetch(url);
      const data = await res.json();
      console.log(data.statewise);

      data.statewise.map((val, idx) => stateArr.push(({ stateName: val?.state, cases: val?.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })));
      console.log(stateArr.shift());
      console.log(stateArr.pop());
      console.log(stateArr);

      setTableData(stateArr)

    };
  
    fetchStateData();
  }, [url]);
  console.log(tableData);
  const [columnData,setColumnData]= useState([{title:'State',field:'stateName'},{title:'Cases',field:'cases'}])
 


  return (
    <div className='table-data'>
      <MuiThemeProvider theme={theme}> 
       <MaterialTable
     title='Covid India'
   
     columns={columnData}
     data={tableData}
     tableIcons={tableIcons}
     options={{ search:false,paging:false,sorting:true,  searchFieldStyle:{width:'12rem'}}}
  

   
     
     
    />
    </MuiThemeProvider>
   
  
    </div>
  );
};

export default Table;
