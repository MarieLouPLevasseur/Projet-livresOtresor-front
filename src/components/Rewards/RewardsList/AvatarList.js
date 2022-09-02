import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const images = [
  {
    img: 'https://zupimages.net/up/22/34/4x7f.png',
    title: 'Avatar number 1',
  },
  {
    img: 'https://zupimages.net/up/22/34/1x4x.png',
    title: 'Avatar number 2',
  },
  {
    img: 'https://zupimages.net/up/22/34/iyfi.png',
    title: 'Avatar number 3',
  },
  {
    img: 'https://zupimages.net/up/22/34/e9mx.png',
    title: 'Avatar number 4',
  },
  {
    img: 'https://zupimages.net/up/22/34/8d6j.png',
    title: 'Avatar number 5',
  },
  {
    img: 'https://zupimages.net/up/22/34/2nf1.png',
    title: 'Avatar number 5',
  },
  {
    img: 'https://zupimages.net/up/22/34/xst4.png',
    title: 'Avatar number 5',
  },
  {
    img: 'https://zupimages.net/up/22/34/mexa.png',
    title: 'Avatar number 5',
  },
  {
    img: 'https://zupimages.net/up/22/34/4x7f.png',
    title: 'Avatar number 1',
  },
  {
    img: 'https://zupimages.net/up/22/34/1x4x.png',
    title: 'Avatar number 2',
  },
  {
    img: 'https://zupimages.net/up/22/34/iyfi.png',
    title: 'Avatar number 3',
  },
];

export default function AvatarList() {
  return (
    <ImageList
      sx={{
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr)) !important",
        gridAutoColumns: "minmax(150px, 1fr)"
      }}
    >
      {images.map((image) => (
        <ImageListItem>
          <img src={image.img} alt={image.title} />
          <ImageListItemBar title={image.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
