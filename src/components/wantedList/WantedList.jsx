import React from 'react';
import MostWantedCard from './mostWantedCard';
const MostWanted = () => {

    const wantedIndividuals = [
        {
          title: 'Shaikh Shakeel',
          imageSrc: 'https://cbi.gov.in/assets/images/wanted/908928958Shaikh-Shakeel.jpg',
          description: 'Description for Shaikh Shakeel.',
          link: 'https://www.interpol.int/How-we-work/Notices/View-Red-Notices#1995-23758',
        },
        // Add more individuals as needed
      ];
    
  return (
    <div className="mostWantedWrapper">
      <div className="container">
        <div className="missionHeading">
          <span></span>
          <h4>Most Wanted</h4>
        </div>
        {wantedIndividuals.map((individual, index) => (
        <MostWantedCard key={index} {...individual} />
      ))}

        <div className="clearfix"></div>

        <div className="row mostWantedViewMore">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="commonBtn">
              <a href="https://cbi.gov.in/interpol-red-notice">VIEW MORE<span className="arrow arrow-bar is-right"></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostWanted;
