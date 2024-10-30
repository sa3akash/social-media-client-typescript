import React from "react";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import type { IGif } from "@giphy/js-types";
import { config } from "@/config";

interface Props {
  selectImage: (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => void;
  searchTerm?: string;
  limit?: number;
  width?: number;
  columns?: number;
  gutter?: number;
  className?: string;
}

const GiphyComponents: React.FC<Props> = ({
  selectImage,
  searchTerm,
  limit = 10,
  width = 300,
  columns = 2,
  gutter = 6,
  className,
}) => {
  const gf = new GiphyFetch(config.GIPHY_API_KEY);

  const fetchGifs = (offset: number) => {
    if (searchTerm) {
      return gf.search(searchTerm, { offset, limit });
    } else {
      return gf.trending({ offset, limit });
    }
  };

  return (
    <Grid
      width={width}
      columns={columns}
      gutter={gutter}
      fetchGifs={fetchGifs}
      key={searchTerm}
      onGifClick={selectImage}
      className={className}
    />
  );
};

export default GiphyComponents;
