import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { useEffect, useState } from "react";
import { getData } from './api/getData';
import { useTheme } from '../zustand/darkmodeState';

const DataTable = () => {
  const {darkmode} = useTheme()
  const [rows, setRows] = useState([])

  useEffect(() => {
    let liveData ;
    getData().then(res => {
      setRows(Object.values(res.data))
      liveData = new WebSocket('wss://interview.darkube.app/')
      liveData.onmessage = (res) => setRows(prev => {
       let newData = JSON.parse(res.data)
       const next = [...prev]
       next[newData.id] = newData
       return next
      })
    })
    return () => {
      if(liveData) liveData.close()
    }
  }, [])


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'buyer', headerName: 'Buyer', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'vol', headerName: 'Volume', width: 130 },
  ];

  return (
     <div className="w-1/2 h-[420px] my-auto">
      <DataGridPro
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        paginationMode="client"
        pagination
        checkboxSelection
        disableRowSelectionOnClick
        sx={{color: darkmode ? "white" : "" , '& .MuiDataGrid-aggregationColumnHeader' : {
          color: "white"
        }}}
      />
    </div>
  )
}

export default DataTable
