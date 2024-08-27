import React from 'react';

import "../../../../public/assets/css/font-awesome.min.css";

const LiveBanner = ({ text = "Nous sommes actuellement en direct ! Cliquez ici pour accéder à la session et participer." }) => {
    return (
        <div className="live-banner" onClick={() => console.log(777)}>
            <p className="live-text">
                <i className='fa fa-youtube-play' style={{ marginRight: '8px' }}></i>{text}
            </p>
        </div>
    );
};

export default LiveBanner;
