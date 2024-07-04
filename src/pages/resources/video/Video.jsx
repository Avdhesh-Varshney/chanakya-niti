import React from 'react';
import Card from '../../../components/shared/Card';
// import './Video.css'; // Import the CSS file

const Video = () => {
  return (
    <div className="video-container">
      <Card 
        imgSrc="/src/assets/image.webp" 
        title="Chanakya Niti" 
        description="" 
        path="/resources/video/chanakya" 
        btnName="Watch Chanakya's Story" 
      />
    </div>
  )
}

export default Video;



// import React from 'react';
// import Card from '../../../components/shared/Card';
// import './Video.css'; // Import the CSS file

// const Video = () => {
//   return (
//     <div className="video-container">
//       <h1 className="title">Chanakya's Video</h1>
//       <iframe 
//         width="560" 
//         height="315" 
//         src={`https://www.youtube.com/embed/yIehOJylev8`} 
//         title="YouTube video player" 
//         frameBorder="0" 
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//         allowFullScreen
//       ></iframe>
//       <Card 
//         imgSrc="/src/assets/image.webp" 
//         title="Chanakya Niti" 
//         description="" 
//         path="/resources/video/chanakya" 
//         btnName="Watch Chanakya's Story" 
//       />
//     </div>
//   )
// }

// export default Video;
