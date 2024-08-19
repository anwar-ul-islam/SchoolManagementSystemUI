import { useMemo } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";

const Campus = () => {
  // Example data
  const data = useMemo(
    () => [
      {
        id: 1,
        campusName: "Campus 1",
        city: "New York",
        address: "123 Main St",
        state: "NY",
        country: "USA",
        postalCode: "10001",
        email: "campus1@example.com",
        phoneNumber: "123-456-7890"
      },
      {
        id: 2,
        campusName: "Campus 2",
        city: "Los Angeles",
        address: "456 Elm St",
        state: "CA",
        country: "USA",
        postalCode: "90001",
        email: "campus2@example.com",
        phoneNumber: "987-654-3210"
      },
      {
        id: 3,
        campusName: "Campus 3",
        city: "Chicago",
        address: "789 Oak St",
        state: "IL",
        country: "USA",
        postalCode: "60601",
        email: "campus3@example.com",
        phoneNumber: "555-555-5555"
      },
      // Add more data as needed
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: "S.No", accessor: "id", width: "" },
      { Header: "Campus Name", accessor: "campusName", width: "" },
      { Header: "City", accessor: "city", width: "" }, 
      { Header: "Address", accessor: "address", width: "" }, 
      { Header: "State", accessor: "state", width: "" }, 
      { Header: "Country", accessor: "country", width: "" }, 
      { Header: "Postal code", accessor: "postalCode", width: "" }, 
      { Header: "Email", accessor: "email", width: "" }, 
      { Header: "Phone number", accessor: "phoneNumber", width: "" }, 
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data, // Pass the data here
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    // <main id="main" className="main">
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Campus List</h5>
                {/* <p>This table includes pagination, sorting, and search functionality.</p> */}

                {/* Search */}
                <input
                  value={globalFilter || ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search..."
                  className="form-control mb-3"
                />

                {/* Table */}
                <div className="table-container"
                style={{
                    maxWidth: "100%",      // Note the camelCase for 'maxWidth'
                    overflowX: "auto",     // camelCase for 'overflow-x'
                    overflowY: "auto",     // camelCase for 'overflow-y'
                    height: "150px", 
                }}
                >
                <table
                  {...getTableProps()}
                  className="table datatable table-bordered"
                  style={{minWidth: "100%"}}
                >
                  <thead>
                    {headerGroups.map((headerGroup, headerGroupIndex) => (
                      <tr
                        key={`header-group-${headerGroupIndex}`}
                        {...headerGroup.getHeaderGroupProps()}
                      >
                        {headerGroup.headers.map((column, columnIndex) => (
                          <th
                            key={`column-${columnIndex}`}
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                                : ""}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, rowIndex) => {
                      prepareRow(row);
                      return (
                        <tr key={`row-${rowIndex}`} {...row.getRowProps()}>
                          {row.cells.map((cell, cellIndex) => (
                            <td
                              key={`cell-${rowIndex}-${cellIndex}`}
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-between">
                  <div>
                    <button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      {"<<"}
                    </button>{" "}
                    <button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      {"<"}
                    </button>{" "}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                      {">"}
                    </button>{" "}
                    <button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      {">>"}
                    </button>{" "}
                    <span>
                      Page{" "}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{" "}
                    </span>
                  </div>

                  <div>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                      {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                          Show {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    // </main>
  );
};

export default Campus;