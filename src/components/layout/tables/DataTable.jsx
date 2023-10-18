import React, { forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TablePagination,
} from "@mui/material";
import { Spinner } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { getValorAnidado } from "Helpers/object";
import { ColumnResizer } from "./ColumnResizer";
import { TableSortLabel } from "@mui/material";
import { DateTime } from "luxon";
// import "../../../styles/custom.scss";
import "./DataTableStyle.scss";
import { useEffectSinEjecucionInicial } from "../../../hooks/useEffectSinEjecucionInicial";
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}
const EnhancedTableHead = forwardRef((props, ref) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead ref={ref}>
      <TableRow>
        {!props.sinCheckbox && (
          <TableCell
            key="checkbox"
            align="center"
            padding="normal"
            style={{ backgroundColor: "#ecf6f7" }}
          />
        )}
        <ColumnResizer columns={props.columns} className={props.resizerClass}>
          {props.columns.map((row, index) => {
            if (!row.invisible) {
              return (
                <TableCell
                  key={row.field}
                  align={row.align ?? "left"}
                  padding={row.disablePadding ? "none" : "normal"}
                  sortDirection={orderBy === row.field ? order : false}
                  style={{
                    backgroundColor: "rgba(236, 246, 247, 1)",
                    color: "rgb(0,0,0)",
                  }}
                  id={`header-${index}`}
                >
                  {row.options?.sortable ? (
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={createSortHandler(row.field)}
                    >
                      {row.label}
                    </TableSortLabel>
                  ) : (
                    row.label
                  )}
                </TableCell>
              );
            }
          })}
        </ColumnResizer>
      </TableRow>
    </TableHead>
  );
});
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const DataTable = (props) => {
  const headerRef = useRef(null);
  const rows = props.rows;
  const maxRows =
    rows.length <= 5
      ? 5
      : rows.length <= 10
      ? 10
      : rows.length <= 15
      ? 15
      : rows.length >= props.rowsMax
      ? props.rowsMax
      : 20;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(
    props.orderBy ?? props.columns[0]?.field
  );
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    props.rowsPerPage ?? maxRows
  );
  async function handleRequestSort(event, property) {
    const newOrder = orderBy === property && order === "asc" ? "desc" : "asc";
    props.onSort && (await props.onSort(property, order));
    setOrder(newOrder);
    setOrderBy(property);
  }
  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }
  function handleClick(event, row) {
    if (!props.noSelect) {
      const selectedIndex = selected.indexOf(row.id);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, row.id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    }
    props.onRowClick && props.onRowClick(row);
  }
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  useEffectSinEjecucionInicial(() => {
    var paginacion = { currentPage: page + 1, pageSize: rowsPerPage };
    props.onPaginationChange && props.onPaginationChange(paginacion);
  }, [page, rowsPerPage]);
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const isSelected = (name) => !props.noSelect && selected.indexOf(name) !== -1;
  const [focused, setFocused] = React.useState(false);
  const RenderCell = ({ row, cell }) => {
    switch (cell.tipo) {
      case "boton":
        return (
          <button
            className={
              cell.buttonProps?.clase ??
              (cell.classNameSelector && cell.classNameSelector(row))
            }
            {...cell.buttonProps}
            onClick={() => {
              cell.buttonProps?.onClick && cell.buttonProps?.onClick(row);
            }}
          >
            {cell.buttonContent ??
              (cell.buttonContentRender && cell.buttonContentRender(row))}
          </button>
        );
      case "icono":
        return cell.icon ?? (cell.iconRender && cell.iconRender(row));
      case "date":
        return (
          <span
            style={{
              fontFamily: "Poppins",
              whiteSpace: "nowrap",
            }}
          >
            {DateTime.fromISO(getValorAnidado(row, cell.field)).toFormat(
              cell.formato ?? "dd/MM/yyyy"
            )}
          </span>
        );
      case "datetime":
        return (
          <span
            style={{
              fontFamily: "Poppins",
              whiteSpace: "nowrap",
            }}
          >
            {DateTime.fromISO(getValorAnidado(row, cell.field)).toFormat(
              cell.formato ?? "dd/MM/yyyy hh:mm"
            )}
          </span>
        );
      case "time":
        return (
          <span
            style={{
              fontFamily: "Poppins",
              whiteSpace: "nowrap",
            }}
          >
            {DateTime.fromISO(getValorAnidado(row, cell.field)).toFormat(
              cell.formato ?? "hh:mm"
            )}
          </span>
        );
      case "custom":
        return cell.customCell(row);

      case "binaryImage":
        return (
          <img
            src={`data:image/svg;base64,${row[cell.label]}`}
            style={{ width: "54px", height: "54px" }}
          />
        );

      default:
        return (
          <span
            style={{
              fontFamily: "Poppins",
              whiteSpace: "initial",
            }}
          >
            {getValorAnidado(row, cell.field)}
          </span>
        );
    }
  };
  return (
    <div className={props.classTable}>
      <div className="container-busqueda-persona">
        <Table id="tabla" aria-labelledby="tableTitle" size="medium">
          {props.conCabezal && (
            <EnhancedTableHead
              ref={headerRef}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy ?? props.columns[0]?.field}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={props.columns}
              sinCheckbox={props.sinCheckbox}
              resizerClass={props.resizerClass}
            />
          )}
          <TableBody style={{ fontFamily: "Poppins" }}>
            {!props.loading &&
              stableSort(rows, getSorting(order, orderBy)).map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover={!props.noSelect}
                    onClick={(event) => {
                      event.preventDefault();
                      handleClick(event, row);
                    }}
                    role="checkbox"
                    className={row.className}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id ?? index}
                    selected={isItemSelected}
                  >
                    {!props.sinCheckbox && (
                      <div className="noneCheck">
                        <TableCell
                          className="celda-checkbox-tabla"
                          component="td"
                          id={row.id ?? index}
                          scope="row"
                          padding="none"
                        >
                          <Checkbox
                            id={labelId}
                            className={focused ? "focused" : ""}
                            icon={<FaArrowRight />}
                            checkedIcon={<FaArrowRight />}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                          />
                        </TableCell>
                      </div>
                    )}
                    <ColumnResizer
                      columns={props.columns}
                      header={headerRef}
                      className={props.resizerClass}
                    >
                      {props.columns.map((cell, cellIndex) => {
                        if (!cell.invisible) {
                          return (
                            <TableCell
                              id={`${index}-${cellIndex}`}
                              key={cell.field}
                              align={cell.align}
                              style={
                                cell.disablePadding
                                  ? { padding: 0 }
                                  : { padding: "4rem 0rem" }
                              }
                              sortDirection={orderBy === row.id ? order : false}
                            >
                              {<RenderCell row={row} cell={cell} />}
                            </TableCell>
                          );
                        }
                      })}
                    </ColumnResizer>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {rows?.length === 0 && !props.loading && (
          <div className="w-100 text-center p-5">
            <span>Sin resultados</span>
          </div>
        )}
        {props.loading && (
          <div className="w-100 pt-4 pb-8 d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {props.conPaginado && rows?.length > 0 && !props?.loading && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            labelRowsPerPage="Reg./Pág"
            component="div"
            count={props.registrosTotales ?? rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              title: "Página anterior",
            }}
            nextIconButtonProps={{
              title: "Página siguiente",
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </div>
    </div>
  );
};
DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};
export { DataTable };
