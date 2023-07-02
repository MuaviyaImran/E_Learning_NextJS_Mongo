
import {  Video } from 'cloudinary-react';
import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
    console.log(videoUrl)
  return (
    <div>
      <Video cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME} publicId={videoUrl} controls />
    </div>
  );
};

export default VideoPlayer;
