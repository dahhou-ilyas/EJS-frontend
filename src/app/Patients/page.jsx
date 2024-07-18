"use client";
import NavigationHeader from "@/components/NavigationHeader";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import Image from "next/image";
import {  pagination,Table } from "antd";
import { useState } from "react";

// import {onShowSizeChange,itemRender} from  '@/components/Pagination.jsx'
import "@/assets/css/style.css";
import { plusicon,refreshicon,imagesend } from "@/components/imagepath";
import { blogimg10, pdficon, pdficon3, pdficon4, blogimg12,
  blogimg2, blogimg4, blogimg6, blogimg8} from '@/components/imagepath';

const Patients = () => {
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
      Img:blogimg2,
      Name: "Andrea Lalema",
      Department: "Otolaryngology",
      Specialization: "Infertility",
      Degree: "MBBS, MS",
      Mobile: "+1 23 456890",
      Email: "example@email.com",
      JoiningDate: "01.10.2022",
      FIELD9: ""
    },
    {
      id:2,
      Img:blogimg4,
      Name: "Dr.Smith Bruklin",
      Department: "Urology",
      Specialization: "Prostate",
      Degree: "MBBS, MS",
      Mobile: "+1 23 456890",
      Email: "example@email.com",
      JoiningDate: "01.10.2022",
      FIELD9: ""
    },
    {
      id:3,
      Img:blogimg6,
      Name: "Dr.William Stephin",
      Department: "Radiology",
      Specialization: "Cancer",
      Degree: "MBBS, MS",
      Mobile: "+1 23 456890",
      Email: "example@email.com",
      JoiningDate: "01.10.2022",
      FIELD9: ""
    },
    {
      id:4,
      Img:blogimg12,
      Name: "Bernardo James",
      Department: "Dentist",
      Specialization: "Prostate",
      Degree: "MBBS, MS",
      Mobile: "+1 23 456890",
      Email: "example@email.com",
      JoiningDate: "01.10.2022",
      FIELD9: ""
    },
    {
      id:5,
      Img:blogimg10,
      Name: "Cristina Groves",
      Department: "Gynocolgy",
      Specialization: "Prostate",
      Degree: "MBBS, MS",
      Mobile: "+1 23 456890",
      Email: "example@email.com",
      JoiningDate: "01.10.2022",
      FIELD9: ""
    },
    {
      id:6,
      Img:blogimg8,
      Name: "Mark Hay Smith",
      Department: "Gynocolgy",
      Specialization: "Prostate",
      Degree: "MBBS, MS",
      Mobile: "+1 23 456890",
      Email: "example@email.com",
      JoiningDate: "01.10.2022",
      FIELD9: ""
    },
    {
      id:7,
      Img:blogimg2,
      Name: "Andrea Lalema",
      Department: "Otolaryngology",
      Specialization: "Infertility",
      Degree: "MBBS, MS",
      Mobile: "+1 23 456890",
      Email: "example@email.com",
      JoiningDate: "01.10.2022",
      FIELD9: ""
    },
    {
      id:8,
      Img:blogimg4,
      Name: "Dr.Smith Bruklin",
      Department: "Urology",
      Specialization: "Prostate",
      Degree: "MBBS, MS",
      Mobile: "+1 23 456890",
      Email: "example@email.com",
      JoiningDate: "01.10.2022",
      FIELD9: ""
    }
  ]
  const columns = [
      {
          title: "Name",
          dataIndex: "Name",
          render: (text, record) => (
              <>
                  <h2 className="profile-image">
                      <Link href="/Patients/Patient">{record.Name}</Link>
                  </h2>

              </>
          ),
          sorter: (a, b) => a.Name.length - b.Name.length
      },
      {
          title:"Department",
          dataIndex: "Department",
              sorter: (a, b) => a.Department.length - b.Department.length
      },
      {
          title:"Specialization",
          dataIndex: "Specialization",
              sorter: (a, b) => a.Specialization.length - b.Specialization.length
      },
      {
          title:"Degree",
          dataIndex: "Degree",
              sorter: (a, b) => a.Degree.length - b.Degree.length
      },
      {
          title:"Mobile",
          dataIndex: "Mobile",
              sorter: (a, b) => a.Mobile.length - b.Mobile.length,
              render: (text, record) => (
                  <>

                          <Link href="#">{record.Mobile}</Link>

                  </>
              )
      }, {
          title:"Email",
          dataIndex: "Email",
              sorter: (a, b) => a.Email.length - b.Email.length
      }, {
          title:"JoiningDate",
          dataIndex: "JoiningDate",
              sorter: (a, b) => a.JoiningDate.length - b.JoiningDate.length
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
  return (
    <div id="root">
      <Sidebar activeClassName="patients" />
      <div className="page-wrapper">
        <div className="content">
          <NavigationHeader pages={['Patients']} currentPage="Patients" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table show-entire">
                <div className="card-body">
                  {/* Table Header */}
                  <div className="page-table-header mb-2">
                    <div className="row align-items-center">
                      <div className="col">
                        <div className="doctor-table-blk">
                          <h3>Patients</h3>
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
                                href="/"
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
        <div
          id="delete_patient"
          className="modal fade delete-modal"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <Image src={imagesend} alt="#" width={50} height={46} />
                <h3>Are you sure want to delete this ?</h3>
                <div className="m-t-20">
                  {" "}
                  <Link
                    href="#"
                    className="btn btn-white me-2"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </Link>
                  <button type="submit" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            id="delete_patient"
            className="modal fade delete-modal"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <Image src={imagesend} alt="#" width={50} height={46} />
                  <h3>Are you sure want to delete this ?</h3>
                  <div className="m-t-20">
                    {" "}
                    <Link
                      href="#"
                      className="btn btn-white me-2"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </Link>
                    <button type="submit" className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Patients;
