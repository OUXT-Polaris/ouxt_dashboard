import React, { useEffect, useState } from "react";
import GenericTemplate from "../templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Repository from "../data/Repository";
import RepositoryInfo from "../data/RepositoryInfo";
import RepositoryWatcher from "../data/RepositoryWacther";
import { render } from "node-sass";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const OverView: React.FunctionComponent = () => {
  const classes = useStyles();
  const watcher = new RepositoryWatcher();
  var [repository_data, setData] = useState(new Array<RepositoryInfo>(0));
  const fetchData = async () => {
    var table_data = await watcher.getTableData();
    setData(table_data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <GenericTemplate title="Overview">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Repository</TableCell>
              <TableCell>Build Test</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Last Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repository_data.map((row) => (
              <TableRow key={row.repository}>
                <TableCell component="th" scope="row">
                  <a href={row.url}>{row.repository}</a>
                </TableCell>
                <TableCell>
                  <img src={row.build_status}></img>
                </TableCell>
                <TableCell>{row.branch}</TableCell>
                <TableCell>{row.last_update}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </GenericTemplate>
  );
};

export default OverView;
