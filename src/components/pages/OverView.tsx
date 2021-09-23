import React from "react";
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
import RepositoryWatcher from "../data/RepositoryWacther";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const OverView: React.FC = () => {
  const classes = useStyles();
  const repository_data = new RepositoryWatcher().getTableData();

  return (
    <GenericTemplate title="ROS2 packages">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Repository</TableCell>
              <TableCell>Build Test</TableCell>
              <TableCell>Latest Version</TableCell>
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
                <TableCell>{row.latest_version}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </GenericTemplate>
  );
};

export default OverView;
