import { useMemo } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import DataTable from "../common/Table";

const ClassRoom
 = () => {
  // Example data
  const data = [
      { id: 1, roomNumber : "101", building:"1", capacity: 30 },
      { id: 2, roomNumber: "201",building:"2",  capacity: 25 },
      { id: 3, roomNumber: "301",building:"3",  capacity: 20 },
      // Add more data as needed
    ];
   

  const columns =  [
      { Header: "S.No", accessor: "id", width: "" },
      { Header: "RoomNumber", accessor: "roomNumber", width: "" },
      { Header: "Building", accessor: "building", width: "" },
      { Header: "Capacity", accessor: "capacity", width: "" }, 
      
    ];
  return (
    <div style={{ minWidth: '100%', overflowX: 'auto', overflowY: 'auto', maxHeight: '300px' }}>
      <DataTable  data={data} columns={columns} />
   </div>
  );
};

export default ClassRoom;