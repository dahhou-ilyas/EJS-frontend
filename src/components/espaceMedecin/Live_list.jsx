'use client'
import React, { useState, useEffect } from 'react';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Live_Card from '../../components/ies/ui/cards/live-card';
import axios from 'axios';
import Loading from '../../components/ies/utility/loading';
import { SPRINGBOOT_API_URL } from '@/config';

const List_Lives = ({ toDashboard }) => {
  const [changeLoad, setChangeLoad] = useState(false);
  const [livePrecedents, setlivePrecedents] = useState([]);
  const [visibleLives, setVisibleLives] = useState([]);
  const [liveLoaded, setLivesLoaded] = useState(false);

  const fetcholdlives = async () => {
    // A optimiser: encore même problème
    const datalive = await axios(`${SPRINGBOOT_API_URL}/streams?phase=outdated`);
    setlivePrecedents(datalive.data);
    setLivesLoaded(true);
  };

  useEffect(() => {
    fetcholdlives();
  }, []);

  const load = () => setChangeLoad(!changeLoad);
  const loadMoreLives = () => {
    const newItemsToShow = itemsToShow + 3;
    setItemsToShow(newItemsToShow);
    setVisibleLives(staticData.slice(0, newItemsToShow));
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper custom-wrapper">
        <div className="content">
          <div className="row">
            {liveLoaded ? (
              visibleLives.length > 0 ? (
                visibleLives.map((item) => (
                  <Live_Card key={item.id} item={item} />
                ))
              ) : (
                <p>Données non disponibles</p>
              )
            ) : (
              <Loading />
            )}
            {visibleLives.length > 0 && visibleLives.length < livePrecedents.length && (
              <div className="col-lg-12">
                <div className="invoice-load-btn">
                  <a className="btn" onClick={loadMoreLives}>
                    Charger plus de vidéos
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List_Lives;
