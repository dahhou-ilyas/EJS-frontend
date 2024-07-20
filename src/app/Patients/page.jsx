"use client";
import NavigationHeader from "@/components/NavigationHeader";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import Image from "next/image";
import { pagination, Table } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'

// import {onShowSizeChange,itemRender} from  '@/components/Pagination.jsx'
import "@/assets/css/style.css";
import "@/assets/css/style2.css";
import { plusicon, refreshicon, imagesend,dots,edit,deleteIcon } from "@/components/imagepath";
import {
  blogimg10,
  pdficon,
  pdficon3,
  pdficon4,
  blogimg12,
  blogimg2,
  blogimg4,
  blogimg6,
  blogimg8
} from "@/components/imagepath";

const Patients = () => {
  const path = usePathname();
  // console.log(path);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const onChange = (date, dateString) => {
    // console.log(date, dateString);
  };

  function handleRefresh(e){
    window.location.reload()
  }
  const datasource = [
    {
      NIP: "IN391331",
      Name: "Hamid El Assry",
      Sexe: "Homme",
      NumTel: "+212 23 456890",
      Email: "exemple@email.com",
      Scolarise: "Oui"
    },
    {
      NIP: "IN391332",
      Name: "John Doe",
      Sexe: "Homme",
      NumTel: "+212 23 456891",
      Email: "john.doe@exemple.com",
      Scolarise: "Non"
    },
    {
      NIP: "IN391333",
      Name: "Jane Smith",
      Sexe: "Femme",
      NumTel: "+212 23 456892",
      Email: "jane.smith@exemple.com",
      Scolarise: "Oui"
    },
    {
      NIP: "IN391334",
      Name: "Alice Johnson",
      Sexe: "Femme",
      NumTel: "+212 23 456893",
      Email: "alice.johnson@exemple.com",
      Scolarise: "Non"
    }
  ];
  const columns = [
    {
      title: "NIP",
      dataIndex: "NIP",
      render: (text, record) => (
        <>
          <h2 className="profile-image">
            <Link href={`${path}/Patient/`}>{record.NIP}</Link>
          </h2>
        </>
      ),
      sorter: (a, b) => a.NIP.length - b.NIP.length
    },
    {
      title: "Name",
      dataIndex: "Name",
      render: (text, record) => (
        <>
          <h2 className="profile-image">
            <Link href={`${path}/Patient/`}>{record.Name}</Link>
          </h2>
        </>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length
    },
    {
      title: "Sexe",
      dataIndex: "Sexe",
      render: (text, record) => (
        <>
          <h2 className="profile-image">
            <Link href={`${path}/Patient/`}>{record.Sexe}</Link>
          </h2>
        </>
      ),
      sorter: (a, b) => a.Sexe.length - b.Sexe.length
    },
    {
      title: "NumTel",
      dataIndex: "NumTel",
      render: (text, record) => (
        <>
          <h2 className="profile-image">
            <Link href={`${path}/Patient/`}>{record.NumTel}</Link>
          </h2>
        </>
      ),
      sorter: (a, b) => a.NumTel.length - b.NumTel.length
    },
    {
      title: "Email",
      dataIndex: "Email",
      render: (text, record) => (
        <>
          <h2 className="profile-image">
            <Link href={`${path}/Patient/`}>{record.Email}</Link>
          </h2>
        </>
      ),
      sorter: (a, b) => a.Email.length - b.Email.length
    },
    {
      title: "Scolarise",
      dataIndex: "Scolarise",
      render: (text, record) => (
        <>
          <h2 className="profile-image">
            <Link href={`${path}/Patient/`}>{record.Scolarise}</Link>
          </h2>
        </>
      ),
      sorter: (a, b) => a.Scolarise.length - b.Scolarise.length
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
                <Image src={dots}
                  style = {{width:'50%',height:"50%"}}
                  alt = "more"
                />
              </Link>

              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" 
                      href={`${path}/Patient/Consultation/`} >
                  <Image 
                    src={edit}
                    style = {{width:'1rem',height:"1rem"}}
                    alt = "edit"
                  />
                  Modifier
                </Link>
                <Link
                  className="dropdown-item"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_patient"
                >
                  
                  <Image 
                    src={deleteIcon}
                    style = {{width:'1rem',height:"1rem"}}
                    alt = "supprimer"
                  />
                   Supprimer
                </Link>
              </div>
            </div>
          </div>
        </>
      )
    }
  ];
  return (
    <div id="root">
      <div className="page-wrapper">
        <div className="content">
          <NavigationHeader pages={["Patients"]} currentPage="Patients" />
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
                            <div className="top-nav-search table-search-blk"></div>
                            <div className="add-group">
                              <Link
                                href="/"
                                className="btn btn-primary add-pluss ms-2"
                              >
                                <Image src={plusicon} alt="#" />
                              </Link>
                              <button
                                onClick={handleRefresh}
                                className="btn btn-primary doctor-refresh ms-2"
                              >
                                <Image src={refreshicon} alt="#" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Table Header */}
                  <div className="table-responsive doctor-list">
                    <Table
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
