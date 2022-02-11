import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Paper,
  // Button,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import CheckBox from "./common/CheckBox";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "subName",
    numeric: false,
    disablePadding: false,
    label: "本地 名称",
  },
  {
    id: "subType",
    numeric: false,
    disablePadding: false,
    label: "本地 类型",
  },
  {
    id: "objName",
    numeric: false,
    disablePadding: false,
    label: "远程 名称",
  },
  {
    id: "objType",
    numeric: false,
    disablePadding: false,
    label: "远程 类型",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "操作",
  },
];

function MainTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {/* <TableRow>
          <TableCell colSpan="2" align="center">本地</TableCell>
          <TableCell colSpan="2" align="center">远程</TableCell>
      </TableRow> */}

      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ fontWeight: "bold" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

MainTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function Main({ columnList, originAddColumn }) {
  const [rows, setRows] = React.useState([]);
  const [state, setState] = React.useState({
    same: false,
    different: true,
    local: true,
    origin: true,
  });

  React.useEffect(() => {
    let filtered = [];
    ["same", "different", "local", "origin"].forEach((e) => {
      filtered = state[e]
        ? [
            ...filtered,
            ...columnList[e]?.map((item) => ({ ...item, action: e })),
          ]
        : filtered;
    });

    setRows(filtered);
  }, [state, columnList]);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <CheckBox
              title="相同"
              name="same"
              state={state}
              setState={setState}
            />
            <CheckBox
              title="差别"
              name="different"
              state={state}
              setState={setState}
            />
            <CheckBox
              title="本地"
              name="local"
              state={state}
              setState={setState}
            />
            <CheckBox
              title="远程"
              name="origin"
              state={state}
              setState={setState}
            />
          </div>
        </Toolbar>
        <TableContainer>
          <Table
            // sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <MainTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    tabIndex={-1}
                    key={row.name}
                  >
                    <TableCell
                      component="th"
                      id={`enhanced-table-checkbox-${index}`}
                      scope="row"
                      padding="none"
                    >
                      {row.subName}
                    </TableCell>
                    <TableCell sx={{ ml: 1 }}>{row.subType}</TableCell>
                    <TableCell
                      sx={{ color: row.objName === "" ? "tomato" : null }}
                    >
                      {row.objName || "不存在"}
                    </TableCell>
                    <TableCell
                      sx={{ color: row.objType === "" ? "tomato" : null }}
                    >
                      {row.objType || "不存在"}
                    </TableCell>
                    <TableCell align="center">
                      {/* <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => originAddColumn(row.name)}
                      >
                        {row.action}
                      </Button> */}
                      {row.action === "same" && '-'}
                      {row.action === "different" && (
                        <>
                          <button>修改远程</button>
                          <button>修改地</button>
                        </>
                      )}

                      {row.action === "local" && (
                        <button
                          data-columnname={row.subName}
                          onClick={originAddColumn}
                        >
                          远程添加
                        </button>
                      )}

                      {row.action === "origin" && (
                        <>
                          <button>本地添加</button>
                          <button>远程删除</button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
