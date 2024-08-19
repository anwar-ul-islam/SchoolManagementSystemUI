import DataTable from "../common/Table";

const Department = () => {
  // Example data
  const data = [
    {
      id: 1,
      departmentName: "Computer Science",
      capacity: 50,
    },
    {
      id: 2,
      departmentName: "BBA",
      capacity: 40,
    },
    {
      id: 3,
      departmentName: "Media Science",
      capacity: 30,
    },
    // Add more data as needed
  ];
  const columns = [
    { Header: "S.No", accessor: "id" },
    { Header: "Department Name", accessor: "departmentName"},
    { Header: "Capacity", accessor: "capacity" },
  ];

  return (
    <div
      style={{
        minWidth: "100%",
        overflowX: "auto",
        overflowY: "auto",
        maxHeight: "300px",
      }}
    >
      <DataTable title="Department" data={data} columns={columns} />
    </div>
  );
};

export default Department;
