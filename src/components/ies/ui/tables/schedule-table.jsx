import React from "react";

import { Table } from "antd";
import { onShowSizeChange, itemRender } from './pagination'
import dayjs from "dayjs";
import Link from "next/link";

const Data_Table = ({ livesData, showLinkAndQuestions, defaultSorting }) => {
  const convertDateArrayToString = (dateArray) => {
    if (Array.isArray(dateArray) && dateArray.length >= 3) {
      const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    }
    return null;
  };

  const columns = [
    {
      title: "Thématique",
      dataIndex: "thematique",
      render: (theme, record) => {
        return <a href="#" onClick={() => showLinkAndQuestions(record)} style={{ fontSize: 'calc(1em + 0.2vw)', paddingLeft: '2px' }}>{theme.contenu}</a>
      },
      sorter: (a, b) => {
        const aContent = a["thematique"]?.contenu || "";
        const bContent = b["thematique"]?.contenu || "";
        return aContent.localeCompare(bContent, 'fr');
      },
      className: 'custom-theme-column'
    },
    {
      title: "Date (DD-MM-YYYY)",
      dataIndex: "date",
      render: (dateTime) => {
        const dateTimeString = convertDateArrayToString(dateTime);

        const formattedDateP1 = dayjs(dateTimeString).format('DD-MM-YYYY');
        const formattedDateP2 = dayjs(dateTimeString).format('HH:mm');
        return (
          <span style={{ display: 'flex', justifyContent: 'flex-start', fontSize: 'calc(1em + 0.2vw)' }}>
            <strong className="me-1">{formattedDateP1}</strong>
            <p className="m-0 p-0 ms-1">{formattedDateP2}</p>
          </span>
        );
      },
      sorter: (a, b) => {
        const aDate = convertDateArrayToString(a["date"]);
        const bDate = convertDateArrayToString(b["date"]);

        if (!aDate || !dayjs(aDate).isValid()) return 1;
        if (!bDate || !dayjs(bDate).isValid()) return -1;

        return dayjs(aDate).unix() - dayjs(bDate).unix();
      },
      defaultSortOrder: defaultSorting
    },
    {
      title: "Questions des jeunes",
      dataIndex: "questions",
      render: (areQuestionsAvailable) => {
        if (areQuestionsAvailable.length == 0) return <span style={{ fontSize: 'calc(1em + 0.2vw)' }}>Non Reçus</span>
        return <span style={{ fontSize: 'calc(1em + 0.2vw)' }}>Reçus</span>
      },
      sorter: (a, b) => {
        const aContent = a["questions"]?.length || 0;
        const bContent = b["questions"]?.length || 0;
        return aContent - bContent;
      }
    }, {
      title: "Statistiques",
      dataIndex: "lienStatistiques",
      render: (areStatsAvailable, record) => {
        const queryParams = new URLSearchParams({
          id: record.id,
          thematique: record.thematique.contenu
        }).toString();

        return !areStatsAvailable ? (
          <Link href={`/ies/professional/stats?${queryParams}`} style={{ fontSize: 'calc(1em + 0.2vw)' }}>
            Cliquez ici
          </Link>
        ) : (
          <p style={{ fontSize: 'calc(1em + 0.2vw)' }}>Non disponibles</p>
        );
      },
      sorter: (a, b) => {
        // This doesnt make sense, just for now let it be for testing
        return (a.lienStatistiques === b.lienStatistiques) ? 0 : a.lienStatistiques ? -1 : 1;
      },
    }
  ];

  return (
    <>
      <div className="page-wrapper custom-wrapper-full-width">
        <div className="content m-0 p-0">
          <div className="row h-auto">
            <div className="col-sm-12">
              <div className="card-box p-1">
                <div className="card-block">
                  <div className="table-responsive">
                    <Table
                      pagination={{
                        total: livesData.length,
                        showTotal: (total, range) =>
                          `${range[0]} à ${range[1]} de ${total} entrées`,
                        // showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      columns={columns}
                      dataSource={livesData}
                      rowKey={(record) => record.key}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Data_Table;
