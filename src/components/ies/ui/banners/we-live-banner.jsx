import React from 'react';

import "@/../public/ies/assets/css/font-awesome.min.css";

const handleRedirect = (lien) => {
    const url = lien.startsWith('http') ? lien : `https://${lien}`;
    window.location.href = url;
};

const Live_Banner = ({ lien, text = "Nous sommes actuellement en direct ! Cliquez ici pour accéder à la session et participer." }) => {
    return (
        <div className="live-banner" onClick={(e) => { e.preventDefault(); handleRedirect(lien); }}>
            <p className="live-text">
                <i className='fa fa-youtube-play' style={{ marginRight: '8px' }}></i>{text}
            </p>
        </div>
    );
};

export default Live_Banner;
