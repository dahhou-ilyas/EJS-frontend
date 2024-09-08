import React from 'react';
import { blogimg1, profiles03 } from "@/components/ies/utility/image-path";
import Image from 'next/image';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { SPRINGBOOT_API_URL } from '@/config';

const Live_Card = ({ item }) => {
  const handleRedirect = (lienStreamYard) => {
    const url = lienStreamYard.startsWith('http') ? lienStreamYard : `https://${lienStreamYard}`;
    window.location.href = url;
  };

  return (
    <div className="col-sm-6 col-md-6 col-xl-4">
      <div className="blog grid-blog">
        <div className="blog-image">
          <a href="#" onClick={(e) => { e.preventDefault(); handleRedirect(item.lienYoutube); }}><Image className="img-fluid" src={`${SPRINGBOOT_API_URL}/streams/${item.id}/image`} width={313} height={173} alt="Video" /></a>
        </div>
        <div className="blog-content">
          <div className="blog-grp-blk">
            <div className="blog-img-blk">
              <a href="#"><Image className="img-fluid" src={profiles03} width={300} height={300} alt="Professional" /></a>
              <div className="content-blk-blog ms-2">
                <h4><a href="#">Dr. {item.responsable.infoUser.nom}</a></h4>
                <h5><a href="#" onClick={(e) => { e.preventDefault(); handleRedirect(item.lienYoutube); }}>{item.thematique.contenu}</a></h5>
              </div>
            </div>
            <span><i className="feather-calendar me-1"></i>{item.date[0]}/{item.date[1]}/{item.date[2]}</span>
          </div>
          <h3 className="blog-title"><a href="#" onClick={(e) => { e.preventDefault(); handleRedirect(item.lienYoutube); }}>{item.subject}</a></h3>
          <p>{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Live_Card;
