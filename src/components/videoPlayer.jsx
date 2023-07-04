import { Video } from "cloudinary-react";
import React from "react";

const VideoPlayer = ({ videoUrl }) => {
  if (videoUrl) {
    return (
      <div>
        <Video
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}
          publicId={videoUrl}
          controls
        />
      </div>
    );
  } else {
    return <>No Video Available</>;
  }
};

export default VideoPlayer;
