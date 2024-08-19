import React from "react";
import DataTable from "../common/Table";

const StudentList = () => {
  const data = [
    {
      name: "Unity Pugh",
      ext: 9958,
      city: "Curicó",
      startDate: "2005/02/11",
      completion: 37,
    },
    {
      name: "Theodore Duran",
      ext: 8971,
      city: "Dhanbad",
      startDate: "1999/04/07",
      completion: 97,
    },
    {
      name: "Kylie Bishop",
      ext: 3147,
      city: "Norman",
      startDate: "2005/09/08",
      completion: 63,
    },
    {
      name: "Willow Gilliam",
      ext: 3497,
      city: "Amqui",
      startDate: "2009/05/11",
      completion: 30,
    },
    {
      name: "Blossom Dickerson",
      ext: 5018,
      city: "Kempten",
      startDate: "2006/11/09",
      completion: 17,
    },
  ];
  const columns = [
    { Header: "Full Name", accessor: "name" },
    { Header: "Ext.", accessor: "ext" },
    { Header: "City", accessor: "city" },
    { Header: "Start Date", accessor: "startDate" },
    { Header: "Completion", accessor: "completion" }, 
  ]
  return (
    <>
    <main id="main" className="main">
      <DataTable title="Students Applications List" data={data} columns={columns} />
      </main>
    </>
  );
};

export default StudentList;