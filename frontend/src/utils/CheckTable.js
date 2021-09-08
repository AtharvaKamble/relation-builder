import { React } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
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

// function createData(name, relation, relative) {
//   return { name, relation, relative };
// }

var rows = [];
// createData('John Doe', 'brother', 'Dwight'),
// createData('Dwight', 'friend', 'Jim'),
// createData('Jim', 'brother', 'Jane'),
// createData('Jim1', 'brother', 'Jane'),
// createData('Jim2', 'brother', 'Jane'),
// createData('Jim3', 'brother', 'Jane'),
// createData('Jim4', 'brother', 'Jane'),
// createData('Jim5', 'brother', 'Jane'),
// createData('Jim6', 'brother', 'Jane'),
// createData('Jim7', 'brother', 'Jane'),

function addToRows(a) {
    rows = []
    rows = [...a]
}

// const rowNew = [['jane', 'john'], ['jim', 'dwight'], ['sameer', 'aayushi', 'dwight']]  // SAMPLE DATA

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function CustomizedTables(props) {
  const classes = useStyles();
  console.log('YEHEYEE ', rows)
  if (props.userData.connectedPeopleList) {
      addToRows(props.userData.connectedPeopleList)
  }

  console.log("CheckTable ", props.userData.connectedPeopleList)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableBody>
          {rows.map((row) => (
              <TableRow>
              {
                  row.map(r => (
                        <TableCell align="center" component="th" scope="row">{r}</TableCell>
                  ))
              }
              </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;
