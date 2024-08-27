import React from 'react';

import "@/../public/ies/assets/css/font-awesome.min.css";

const Post_Live_Banner = ({ text = "Nous venons de terminer une session en direct ! Cliquez ici pour donner votre avis." }) => {
    return (
        <div className="live-banner live-banner-blue" >
            <p className="live-text">
                <i className='fa fa-bar-chart' style={{marginRight:'8px'}}></i>{text}
            </p>
        </div>
    );
};

export default Post_Live_Banner;
