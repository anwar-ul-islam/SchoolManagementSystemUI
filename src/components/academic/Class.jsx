import DataTable from "../common/Table";

const Class = () => {
  // Example data
  const data = [
      { id: 1, className: "Class 1", classDescription: "Description 1", capacity: 30,},
      { id: 2, className: "Class 2", classDescription: "Description 2", capacity: 25 },
      { id: 3, className: "Class 3", classDescription: "Description 3", capacity: 30 },
      // Add more data as needed
    ];
  const columns =  [
      { Header: "S.No", accessor: "id", width: "" },
      { Header: "Class Name", accessor: "className", width: "" },
      { Header: "Class Description", accessor: "classDescription", width: "" }, // Wider column
      { Header: "Capacity", accessor: "capacity", width: "" },  

   ];
   

  
 
  return (
    <div style={{ minWidth: '100%', overflowX: 'auto', overflowY: 'auto', maxHeight: '300px' }}>
      <DataTable  data={data} columns={columns} />
    </div>
  );
};

export default Class;