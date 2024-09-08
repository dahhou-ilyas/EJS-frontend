'use client'
import React, { useState, useEffect } from 'react';

import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import Live_Card from '@/components/ies/ui/cards/live-card';
import axios from 'axios';
import Loading from '../utility/loading';
import { SPRINGBOOT_API_URL } from '@/config';

const List_Lives = ({ toDashboard }) => {
  //const [data, setData] = useState([])
  const [changeLoad, setChangeLoad] = useState(false)
  const [livePrecedents, setlivePrecedents] = useState([]);
  const [liveLoaded, setLivesLoaded] = useState(false);

  const fetcholdlives = async () => {
    // A optimiser: encore même problème
    const datalive = await axios(`${SPRINGBOOT_API_URL}/streams?phase=outdated`)
    setlivePrecedents(datalive.data)
    setLivesLoaded(true);
  }

  useEffect(() => {
    fetcholdlives()
  }, [])

  const load = () => setChangeLoad(!changeLoad)

  return (
    <div className="main-wrapper">
      <div className="page-wrapper custom-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href={toDashboard} >Tableau de bord </a>
                  </li>
                  <li className="breadcrumb-item">
                    <i><FeatherIcon icon="chevron-right" /></i>
                  </li>
                  <li className="breadcrumb-item active">Lives</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            {liveLoaded ? (
              livePrecedents.length > 0 ? (
                livePrecedents.map((item) => (
                  <Live_Card key={item.id} item={item} />
                ))
              ) : (
                <p>Données non disponibles</p>
              )
            ) : (
              <Loading />
            )}
            {/*data && data.length > 0 &&
              <div className="col-lg-12">
                <div className="invoice-load-btn">
                  <a className="btn" onClick={load}>
                    Charger plus de vidéos
                  </a>
                </div>
              </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List_Lives
