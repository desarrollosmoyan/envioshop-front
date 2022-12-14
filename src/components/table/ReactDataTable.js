import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import { Col, Modal, ModalBody, Row, Button, Spinner } from "reactstrap";
import { DataTablePagination } from "../Component";
import { setLimit, setPage } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Export = ({ data }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const copyToClipboard = () => {
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-export-title d-none d-md-inline-block">Exportar</div>
        <div className="dt-buttons btn-group flex-wrap">
          <CopyToClipboard text={JSON.stringify(data)}>
            <Button
              className="buttons-copy buttons-html5"
              onClick={() => copyToClipboard()}
            >
              <span>Copiar</span>
            </Button>
          </CopyToClipboard>{" "}
          <button
            className="btn btn-secondary buttons-csv buttons-html5"
            type="button"
            onClick={() => exportCSV()}
          >
            <span>CSV</span>
          </button>{" "}
          <button
            className="btn btn-secondary buttons-excel buttons-html5"
            type="button"
            onClick={() => exportExcel()}
          >
            <span>Excel</span>
          </button>{" "}
        </div>
      </div>
      <Modal
        isOpen={modal}
        className="modal-dialog-centered text-center"
        size="sm"
      >
        <ModalBody className="text-center m-2">
          <h5>Copied to clipboard</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">
            Copied {data.length} rows to clipboard
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const ExpandableRowComponent = ({ data }) => {
  return (
    <ul className="dtr-details p-2 border-bottom ml-1">
      <li className="d-block d-sm-none">
        <span className="dtr-title">Company</span>{" "}
        <span className="dtr-data">{data.company}</span>
      </li>
      <li className="d-block d-sm-none">
        <span className="dtr-title ">Gender</span>{" "}
        <span className="dtr-data">{data.gender}</span>
      </li>
      <li>
        <span className="dtr-title">Start Date</span>{" "}
        <span className="dtr-data">{data.startDate}</span>
      </li>
      <li>
        <span className="dtr-title">Salary</span>{" "}
        <span className="dtr-data">{data.salary}</span>
      </li>
    </ul>
  );
};

const CustomCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="custom-control custom-control-sm custom-checkbox notext">
    <input
      id={rest.name}
      type="checkbox"
      className="custom-control-input form-control"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
    <label className="custom-control-label" htmlFor={rest.name} />
  </div>
));

const ReactDataTable = ({
  data,
  columns,
  pagination,
  actions,
  className,
  selectableRows,
  expandableRows,
  keyMap,
  count,
  limit,
  page,
  setLimit,
  setPage,
}) => {
  const [tableData, setTableData] = useState(data);
  const [searchText, setSearchText] = useState("");
  //const [rowsPerPageS, setRowsPerPage] = useState(10);
  const [mobileView, setMobileView] = useState();
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    if (!keyMap) return;
    const arr = data.map((element) => {
      return Object.keys(element)
        .map((key) => {
          if (!keyMap.hasOwnProperty(key)) {
            return null;
          }
          return { [keyMap[key]]: element[key] };
        })
        .filter((e) => e);
    });
    setExportData(arr);
  }, []);
  useEffect(() => {
    let defaultData = tableData;
    if (searchText !== "") {
      defaultData = data.filter((item) => {
        return item.serviceName
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setTableData(defaultData);
    } else {
      setTableData(data);
    }
  }, [searchText]); // eslint-disable-line react-hooks/exhaustive-deps

  // function to change the design view under 1200 px
  const viewChange = () => {
    if (window.innerWidth < 960 && expandableRows) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    return () => {
      window.removeEventListener("resize", viewChange);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`dataTables_wrapper dt-bootstrap4 no-footer ${
        className ? className : ""
      }`}
    >
      <Row className={`justify-between g-2 ${actions ? "with-export" : ""}`}>
        <Col className="col-7 text-left" sm="4">
          <div id="DataTables_Table_0_filter" className="dataTables_filter">
            <label>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Buscar por empresa"
                onChange={(ev) => setSearchText(ev.target.value)}
              />
            </label>
          </div>
        </Col>
        <Col className="col-5 text-right" sm="8">
          <div className="datatable-filter">
            <div className="d-flex justify-content-end g-2">
              {actions && <Export data={exportData} />}
              <div className="dataTables_length" id="DataTables_Table_0_length">
                <label>
                  <span className="d-none d-sm-inline-block">Mostrar</span>
                  <div className="form-control-select">
                    {" "}
                    <select
                      name="DataTables_Table_0_length"
                      className="custom-select custom-select-sm form-control form-control-sm"
                      onChange={(e) => {
                        setPage(2);
                        setLimit(parseInt(e.target.value));
                      }}
                      value={limit}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>{" "}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <DataTable
        data={tableData}
        columns={columns}
        className={className}
        paginationTotalRows={count}
        selectableRows={selectableRows}
        selectableRowsComponent={CustomCheckbox}
        expandableRowsComponent={ExpandableRowComponent}
        expandableRows={mobileView}
        onChangePage={(page) => setPage(page)}
        noDataComponent={
          <div className="p-2">No hay informaci??n para mostrar</div>
        }
        sortIcon={
          <div>
            <span>&darr;</span>
            <span>&uarr;</span>
          </div>
        }
        pagination={pagination}
        paginationComponent={({
          currentPage,
          rowsPerPage,
          rowCount,
          onChangePage,
          onChangeRowsPerPage,
        }) => {
          return (
            <DataTablePagination
              customItemPerPage={limit}
              itemPerPage={limit}
              totalItems={rowCount}
              paginate={onChangePage}
              currentPage={page}
              onChangeRowsPerPage={onChangeRowsPerPage}
              setRowsPerPage={(rows) => setLimit(rows)}
            />
          );
        }}
      ></DataTable>
    </div>
  );
};

export default ReactDataTable;
