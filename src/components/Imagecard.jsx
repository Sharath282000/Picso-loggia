import Skeleton from "react-loading-skeleton";

import React, { useState } from "react";

import "react-loading-skeleton/dist/skeleton.css";

import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

const Imagecard = ({ displayImages, imagehandle, isLoading }) => {
  const SKELETON_COUNT = 30;

  const skeletonArray = Array(SKELETON_COUNT).fill(0);

  const isContentReady = !isLoading && displayImages.length > 0;

  const imageOpacity = isContentReady ? 1 : 0;

  const skeletonOpacity = isContentReady ? 0 : 1;

  return (
    <div style={{ position: "relative" }}>
      <div
        className="grid"
        style={{
          gridAutoRows: "100px",

          opacity: imageOpacity,

          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {displayImages.map((data) => (
          <div
            key={data.id}
            className="grid-img"
            style={{ width: "100%", height: "100%" }}
          >
            <LazyLoadImage
              src={data.src.large2x}
              id={data.id}
              placeholderSrc={data.src.medium}
              threshold={1000}
              style={{
                width: "100%",

                height: "100%",

                transition: "ease-in-out",
              }}
              onClick={imagehandle}
              effect="blur"
              wrapperProps={{
                style: { transitionDelay: "1s" },
              }}
            />
          </div>
        ))}
        {displayImages.length === 0 &&
          skeletonArray.map((_, index) => (
            <div
              key={`p-${index}`}
              className="grid-img"
              style={{ height: "100px" }}
            ></div>
          ))}
      </div>

      <div
        style={{
          position: "absolute",

          top: 0,

          left: 0,

          width: "100%",

          height: "100%",

          zIndex: 1,

          opacity: skeletonOpacity,

          transition: "opacity 0.5s ease-in-out",

          pointerEvents: isContentReady ? "none" : "auto",
        }}
      >
        <div className="grid" style={{ gridAutoRows: "100px" }}>
          {skeletonArray.map((_, index) => (
            <div
              key={`s-${index}`}
              className="skeletongrid-img"
              style={{ width: "100%", height: "100%" }}
            >
              <Skeleton
                className="skeletiongrid-img"
                height='350px'
                style={{ borderRadius: 10, width : '350px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Imagecard;