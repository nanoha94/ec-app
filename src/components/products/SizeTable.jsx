import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { styled } from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

const IconCell = styled(TableCell)`
  padding: 0;
  height: 48px;
  width: 48px;
`;

const SizeTable = (props) => {
  const sizes = props.sizes;
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((size) => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>残り{size.quantity}点</TableCell>
                <IconCell>
                  {size.quantity > 0 ? <ShoppingCartIcon /> : <div>売切</div>}
                </IconCell>
                <TableCell>
                  <FavoriteBorderIcon />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
