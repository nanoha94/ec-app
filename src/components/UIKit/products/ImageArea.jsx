import React from "react";
import { IconButton } from "@material-ui/core";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from "styled-components";

const StyledIconButton = styled(IconButton)`
  height: 48px;
  width: 48px;
`

const ImageArea = (props) => {
  return (
    <div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <StyledIconButton>
          <label>
            <AddPhotoAlternateIcon />
            <input className="u-display-none" type="file" id="image" />
          </label>
        </StyledIconButton>
      </div>
    </div>
  );
};

export default ImageArea;
