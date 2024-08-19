import { useState, useMemo } from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AcademicModal from "./AcademicModal";
import ConfirmationModal from "./ConfirmationModal"; // Import the ConfirmationModal component

// eslint-disable-next-line react/prop-types
const DataTable = ({ data, columns, onUpdate, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Define the action column with edit and delete buttons
  const actionColumn = useMemo(() => ({
    Header: "Actions",
    Cell: ({ row }) => (
      <div>
        <button
          className="btn btn-sm btn-primary me-2"
          onClick={() => handleEditClick(row.original)}
        >
          <FaEdit />
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDeleteClick(row.original)}
        >
          <FaTrashAlt />
        </button>
      </div>
    ),
  }), [onUpdate, onDelete]);

  // Add the action column to the columns array
  const extendedColumns = useMemo(() => [...columns, actionColumn], [columns, actionColumn]);

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
      columns: extendedColumns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  // Handle edit click
  const handleEditClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsEditModalOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    onDelete(selectedRowData);
    setIsDeleteModalOpen(false);
  };

  // Handle form submission in edit modal
  const handleEditModalSubmit = (event) => {
    event.preventDefault();
    const updatedData = Object.fromEntries(new FormData(event.target).entries());
    onUpdate(updatedData);
    setIsEditModalOpen(false);
  };

  return (
    <>
      {/* Table Section */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card py-3">
              <div className="card-body">
                {/* Search */}
                <input
                  value={globalFilter || ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search..."
                  className="form-control mb-3"
                />

                {/* Table */}
                <table
                  {...getTableProps()}
                  className="table datatable table-bordered"
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
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
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

      {/* Academic Modal */}
      {isEditModalOpen && selectedRowData && (
        <AcademicModal
          id="editModal"
          title="Edit Academic Details"
          fields={columns.map(col => ({
            label: col.Header,
            name: col.accessor,
            type: 'text', // Assuming all are text inputs, modify based on your needs
          }))}
          initialValues={selectedRowData}
          onSubmit={handleEditModalSubmit}
        />
      )}

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
      />
    </>
  );
};

export default DataTable;
