import { Box, Popover as MuiPopover, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { INode } from "../types/Campaign";
const useStyles = makeStyles({
  popoverPaper: {
    marginTop: "10px",
    overflowX: "unset",
    overflowY: "unset",
    width: "310px",
    "&::before": {
      boxShadow: "20px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 1px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      opacity: 0.9,
      content: '""',
      position: "absolute",
      top: 0,
      left: 155,
      marginTop: "-10px",
      width: 10,
      height: 10,
      backgroundColor: "white",
      transform: "translate(-50%, 50%) rotate(-45deg)",
      clipPath: "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
    },
  },
});

const Popover: React.FC<{ anchor: Element | null; onClose: () => void; nodeData: INode | null }> = ({ anchor, onClose, nodeData }) => {
  const classes = useStyles();
  if (!nodeData) return <div></div>;
  const { data } = nodeData;

  const formatDecimal = (value: string) => +parseFloat(value).toFixed(2);

  return (
    <MuiPopover
      open={anchor !== null}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      classes={{
        paper: classes.popoverPaper,
      }}
    >
      <Paper
        style={{
          padding: 10,
          minWidth: 230,
          opacity: 0.8,
        }}
      >
        <Box>
          <Typography variant="h6" title={data.contentName}>
            {data.name}
          </Typography>
        </Box>
        {typeof data.date === "object" && (
          <Box mb={1}>
            <Typography variant="body1">
              From {data.date.from} to {data.date.to}
            </Typography>
          </Box>
        )}
        {typeof data.date === "string" && (
          <Box mb={1}>
            <Typography variant="body1">{data.date}</Typography>
          </Box>
        )}
        <Box mt={2}>
          <Typography variant="body1">Details</Typography>
        </Box>
        <TableContainer style={{ marginTop: 10 }}>
          <Table size="small">
            <TableBody>
              {data.data.analytics.map(({ value, label, color }: any, index: number) => (
                <TableRow key={index}>
                  <TableCell style={{ padding: 0 }}>
                    <div
                      style={{
                        border: `5px solid ${color}`,
                        borderRadius: 5,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell style={{ padding: 0 }}>
                  <div
                    style={{
                      border: "5px solid #cccccc",
                      borderRadius: 5,
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </MuiPopover>
  );
};

export default Popover;
