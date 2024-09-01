import React from 'react';
import { blogimg1, profiles03 } from "@/components/ies/utility/image-path";
import Image from 'next/image';

const Live_Card = ({ item }) => {
  return (
    <div className="col-sm-6 col-md-6 col-xl-4">
      <div className="blog grid-blog">
        <div className="blog-image">
          <a href={item.lienYoutube}><Image className="img-fluid" src={`http://localhost:8080/streams/${item.id}/image`} width={313} height={173} alt="Video" /></a>
        </div>
        <div className="blog-content">
          <div className="blog-grp-blk">
            <div className="blog-img-blk">
              <a href="#"><Image className="img-fluid" src={profiles03} width={300} height={300} alt="Professional" /></a>
              <div className="content-blk-blog ms-2">
                <h4><a href="profile.html">Dr. {item.responsable.infoUser.nom}</a></h4>
                <h5><a href={item.lienYoutube}>{item.thematique.contenu}</a></h5>
              </div>
            </div>
            <span><i className="feather-calendar me-1"></i>{item.date[0]}/{item.date[1]}/{item.date[2]}</span>
          </div>
          <h3 className="blog-title"><a href={item.lienYoutube}>{item.subject}</a></h3>
          <p>{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Live_Card;
