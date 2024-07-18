"use client"
import Sidebar from "@/components/Sidebar";
import NavigationHeader from "@/components/NavigationHeader";

import Image from "next/image";
import {  pagination,Table } from "antd";
import { useState } from "react";
import Link from "next/link";
import "@/assets/css/style.css";
import "@/assets/css/bootstrap.min.css";

import { plusicon,refreshicon,imagesend } from "@/components/imagepath";
import { blogimg12,blogimg2, blogimg4, blogimg6, blogimg8} from '@/components/imagepath';

const Prescriptions = ()=>{
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const onChange = (date, dateString) => {
      // console.log(date, dateString);
    };


  const datasource = [
    {
      id:1,
      Prescription: "New Prescription 1",
      Consultation: "Infection(IN18381)",
      Medicaments : "Amoxiciline"
    },
    {
      id:2,
      Prescription: "New Prescription 2",
      Consultation: "Consultation 2 (INXXXXX)",
      Medicaments : "Medicaments 3"

    },
    {
      id:3,
      Prescription: "New Prescription 3",
      Consultation: "Consultation 3 (INXXXXX)",
      Medicaments : "Medicament 3"

    },
  ]
  const columns = [
      {
          title: "Prescription",
          dataIndex: "Prescription",
          render: (text, record) => (
            <>
                <h2 className="profile-image">
                    <Link href="Prescriptions/Modifier-Prescription">{record.Prescription}</Link>
                </h2>

            </>
          ),
          sorter: (a, b) => a.Prescription.length - b.Prescription.length
      },
      {
          title:"Consultation",
          dataIndex: "Consultation",
              sorter: (a, b) => a.Consultation.length - b.Consultation.length
      },
      {
          title:"Medicaments",
          dataIndex: "Medicaments",
              sorter: (a, b) => a.Medicaments.length - b.Medicaments.length
      },
      {
        title: "",
        dataIndex: "FIELD8",
        render: (text, record) => (
          <>
            <div className="text-end">
              <div className="dropdown dropdown-action">
                <Link
                  href="#"
                  className="action-icon dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  
                >
                  <i class="fa fa-ellipsis-vertical" />
                </Link> 
                <div className="dropdown-menu dropdown-menu-end">
                  <Link className="dropdown-item" href="/editdoctor">
                    <i className="far fa-edit me-2" />
                    Edit
                  </Link>
                  <Link className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_patient">
                    <i className="fa fa-trash-alt m-r-5"></i> Delete</Link>
                </div>
              </div>
            </div>
          </>
        ),
      },
  ]
  const pages = ['Patients','Patient','Prescriptions'];
  return (
    <div id="root">
      <Sidebar activeClassName="patients" />
      <div className="page-wrapper">
        <div className="content">
          <NavigationHeader pages = {pages} currentPage="Prescriptions" />
          <div className="row">
          <div className="col-sm-12">
              <div className="card card-table show-entire">
                <div className="card-body">
                  {/* Table Header */}
                  <div className="page-table-header mb-2">
                    <div className="row align-items-center">
                      <div className="col">
                        <div className="doctor-table-blk">
                          <h3>Prescriptions</h3>
                          <div className="doctor-search-blk">
                            <div className="top-nav-search table-search-blk">
                              {/* <form>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search here"
                                />
                                <Link className="btn">
                                  <Image src={searchnormal} alt="#" />
                                </Link>
                              </form> */}
                            </div>
                            <div className="add-group">
                              <Link
                                href="Prescriptions/Ajouter-Prescription"
                                className="btn btn-primary add-pluss ms-2"
                              >
                                <Image src={plusicon} alt="#" />
                              </Link>
                              <Link
                                href="#"
                                className="btn btn-primary doctor-refresh ms-2"
                              >
                                <Image src={refreshicon} alt="#" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                  {/* /Table Header */}
                  <div className="table-responsive doctor-list">
                    <Table
                      // pagination={{
                      //   total: datasource.length,
                      //   showTotal: (total, range) =>
                      //     `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      //   // showSizeChanger: true,
                      //   onShowSizeChange: onShowSizeChange,
                      //   itemRender: itemRender
                      // }}
                      columns={columns}
                      dataSource={datasource}
                      rowSelection={rowSelection}
                      rowKey={(record) => record.id}
                      style={{
                        backgroundColor: "#f2f2f2" // Replace with your desired background color for the table
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Prescriptions;