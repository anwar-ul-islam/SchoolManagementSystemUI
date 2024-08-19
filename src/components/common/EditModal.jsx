import React, { useEffect, useState } from 'react';

const EditModal = ({ id, title, fields, data, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Populate form data with the existing data when the modal opens
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close the modal after submission
  };

  return (
    <section className="section">
      <div className="row ms-1">
        <div className="col-lg-6 mt-2">
          <div>
            <div>
              <div className="align-items-end justify-content-end d-flex ms-5 mb-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#${id}`}
                >
                  Edit
                </button>
              </div>
              <div className="modal fade" id={id} tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">{title}</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={onClose} // Close the modal when "Close" button is clicked
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <table className="table">
                          <tbody>
                            {fields &&
                              fields.map((field, index) => (
                                <tr key={index}>
                                  <td>{field.label}</td>
                                  <td>
                                    <input
                                      type={field.type}
                                      className="form-control form-control-sm"
                                      name={field.name}
                                      value={formData[field.name] || ''}
                                      onChange={handleChange}
                                    />
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={onClose} // Close the modal when "Close" button is clicked
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditModal;
