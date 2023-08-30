import React, { useCallback } from "react";
import { IconButton } from "@material-ui/core";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styled } from "styled-components";
import { storage } from "../../firebase";
import ImagePreview from "./ImagePreview";

const StyledIconButton = styled(IconButton)`
  height: 48px;
  width: 48px;
`;

const ImageArea = (props) => {
  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      let blob = new Blob(file, { type: "image/jpeg" });

      // 16桁のランダムを生成してファイル名とする
      const S =
        "abcdefghijklmnopqrstuvwsyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(fileName);
      
      uploadRef.put(blob).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            const newImage = { id: fileName, path: downloadURL };
            props.setImages((prevState) => [...prevState, newImage]);
          });
        })
    },
    [props]
  );

  const deleteImage = useCallback(async(id) => {
    const ret = window.confirm('この画像を削除しますか？');
    if(!ret){
      return false;
    }
    else{
      const newImages = props.images.filter(image => image.id !== id);
      props.setImages(newImages);
      storage.ref('images').child(id).delete();
    }
  }, [props])

  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 &&
          props.images.map((image) => {
            return (
              <ImagePreview key={image.id} id={image.id} path={image.path} delete={deleteImage} />
            );
          })}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <StyledIconButton>
          <label>
            <AddPhotoAlternateIcon />
            <input
              className="u-display-none"
              type="file"
              id="image"
              onChange={uploadImage}
            />
          </label>
        </StyledIconButton>
      </div>
    </div>
  );
};

export default ImageArea;
