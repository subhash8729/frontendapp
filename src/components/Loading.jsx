import React from 'react';

const Loading = ({ loading }) => {
  return (
    <div className={`${loading ? "flex" : "hidden"} fixed top-0 left-0 w-full h-full z-50 items-center bg-[#ffffffb4] justify-center `}>
      <img src="/images/loading_image.webp" alt="loading img" className="w-16 h-16" />
    </div>
  );
};

export default Loading;
