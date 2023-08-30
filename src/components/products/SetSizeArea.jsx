import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";
import TextInput from "../UIKit/TextInput";

const IconCell = styled(TableCell)`
  padding: 0;
  height: 48px;
  width: 48px;
`;

const CheckIcon = styled(IconButton)`
  float: right;
`;

const SetSizeArea = (props) => {
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value);
    },
    [setSize]
  );

  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value);
    },
    [setQuantity]
  );

  const addSize = (index, size, quantity) => {
    if (size === "" || quantity === "") {
      return false;
    }

    // 新規追加
    if (index === props.sizes.length) {
      props.setSizes((prevState) => [...prevState, { size, quantity }]);
      setIndex(index + 1);
      setSize("");
      setQuantity("");
    }
    // 編集
    else {
      const newSizes = props.sizes;
      newSizes[index] = { size, quantity };
      props.setSizes(newSizes);
      setIndex(newSizes.length);
      setSize("");
      setQuantity("");
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (index) => {
    const newSizes = props.sizes.filter((item, i) => i !== index);
    props.setSizes(newSizes);
  };

  const memoIndex = useMemo(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <IconCell />
              <IconCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, i) => {
                return (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <IconCell>
                      <IconButton
                        onClick={() => editSize(i, item.size, item.quantity)}
                      >
                        <EditIcon />
                      </IconButton>
                    </IconCell>
                    <IconCell>
                      <IconButton onClick={() => deleteSize(i)}>
                        <DeleteIcon />
                      </IconButton>
                    </IconCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label={"サイズ"}
            required={true}
            onChange={inputSize}
            value={size}
            type={"text"}
          />
          <TextInput
            fullWidth={false}
            label={"数量"}
            required={true}
            onChange={inputQuantity}
            value={quantity}
            type={"number"}
          />
        </div>
        <CheckIcon onClick={() => addSize(index, size, quantity)}>
          <CheckCircleIcon />
        </CheckIcon>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
