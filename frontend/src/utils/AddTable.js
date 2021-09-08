import { React, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#2e1d1d',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(person, relation, relative) {
  return { person, relation, relative };
}

var rows = [];

function addToRows (a) {
    rows = []
    if (a) {
        for (var i = 0; i < a.length; i++) {
            rows.push(createData(a[i].person, a[i].relation, a[i].relative))
        }
    }
    // console.log('A-> ', a)  // DEBUG
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function CustomizedTables(props) {
  const classes = useStyles();

  useEffect(() => {
      addToRows(props.userData.relationsDataNames)
  }, [props.userData])


  // const rows = props

  // console.log("AddTable ", props.userData.relationsDataNames)  // DBEUG
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">PERSON</StyledTableCell>
            <StyledTableCell align="center">RELATION</StyledTableCell>
            <StyledTableCell align="center">RELATIVE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={[row.person, row.relative]}>
              <StyledTableCell align="center" component="th" scope="row">{row.person}</StyledTableCell>
              <StyledTableCell align="center">{row.relation}</StyledTableCell>
              <StyledTableCell align="center">{row.relative}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;
