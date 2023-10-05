// import React, { useEffect, useState } from 'react';
// import MostWantedCard from './mostWantedCard';
// import { axios } from 'axios';
// const MostWanted = () => {

//   const [wantedList, setWantedList] = useState();

//   const fetchWantedList = () => {
//     axios.get('http://localhost:3000/get-wantedlist')
//       .then((res) => {
//         setWantedList(res.data);
//         console.log(res.data);
//       })
//   }

//   useEffect(() => {
//     fetchWantedList();
//   }, [])
//   return (
//     <div className="mostWantedWrapper">
//       <div className="container">
//         <div className="missionHeading">
//           <span></span>
//           <h4>Most Wanted</h4>
//         </div>
//         {wantedList.map((individual, index) => (
//           <MostWantedCard key={index} {...individual} />
//         ))}

//         <div className="clearfix"></div>

//         <div className="row mostWantedViewMore">
//           <div className="col-md-8"></div>
//           <div className="col-md-4">
//             <div className="commonBtn">
//               <a href="https://cbi.gov.in/interpol-red-notice">VIEW MORE<span className="arrow arrow-bar is-right"></span></a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MostWanted;
