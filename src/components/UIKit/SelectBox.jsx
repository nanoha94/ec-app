import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { styled } from "styled-components";

const StyledForm = styled(FormControl)`
    margin-bottom: 16px;
    min-width: 128px;
    width: 100%;
`;

const SelectBox = (props) => {
  return (
    <StyledForm>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required ?? false}
        value={props.value}
        onChange={(event) => props.select(event.target.value)}
      >
        {props.options.map((option) => {
          return <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>;
        })}
      </Select>
    </StyledForm>
  );
};

export default SelectBox;
