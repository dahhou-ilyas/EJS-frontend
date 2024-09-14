"use client";
import React, { useState, useRef, useEffect } from "react";
import "@/assets/css/style.css";
import { Select, Input, Form, Dropdown, Menu, Button, Tag } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { getAllMedecins } from "@/services/medecinService";
import { decodeToken } from "@/utils/docodeToken";

const { Option } = Select;

const DoctorSelectionForm = ( {selectedDoctors, setSelectedDoctors, selectedConsultedDoctor, setSelectedConsultedDoctor, isPrivee} ) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [searchTermConsulted, setSearchTermConsulted] = useState("");
  const [selectedSpecialityConsulted, setSelectedSpecialityConsulted] = useState("");
  
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    async function fetchData() {
        const token = localStorage.getItem("access-token");
        const decodedToken = decodeToken(token);
        const userId = decodedToken.claims.id;

        const res = await getAllMedecins(token);
        const data = res
            .filter((doctor) => doctor.id !== userId)
            .map((doctor) => ({
                ...doctor,
                key: doctor.id,
                Name: doctor.nom + " " + doctor.prenom,
                Department: doctor.estGeneraliste ? "Generaliste" : doctor.specialite,
            }));

        setDoctors(data);
    }

    fetchData();
}, []);

  
  const specialities = [
    "Pédiatre",
    "Dermatologue",
    "Gynécologue",
    "Médecin généraliste",
    "Ophtalmologue",
    "Psychiatre",
    "Generaliste"
  ];

  const filteredDoctors = doctors.filter(
    (doctor) =>
      (doctor.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.Department.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpeciality ? doctor.Department === selectedSpeciality : true)
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSearchConsulted = (value) => {
    setSearchTermConsulted(value);
  };
  
  const handleSelect = (value) => {
    const selectedDoctor = doctors.find((doctor) => doctor.Name === value);
    if (
      selectedDoctor &&
      !selectedDoctors.some((doc) => doc.Name === selectedDoctor.Name)
    ) {
      setSelectedDoctors([...selectedDoctors, selectedDoctor]);
    }
  };

  const handleSelectConsulted = (value) => {
    const selectedDoctor = doctors.find((doctor) => doctor.Name === value);
    if (selectedDoctor) {
      setSelectedConsultedDoctor(selectedDoctor);
    }
  };

  const handleDeselect = (value) => {
    setSelectedDoctors(
      selectedDoctors.filter((doctor) => doctor.Name !== value)
    );
  };

  const handleDeselectConsulted = (value) => {
    setSelectedDoctors(null);
  };

  const handleSpecialitySelect = ({ key }) => {
    setSelectedSpeciality(selectedSpeciality === key ? "" : key);
  };

  const handleSpecialitySelectConsulted = ({ key }) => {
    setSelectedSpecialityConsulted(selectedSpecialityConsulted === key ? "" : key);
  };

  const specialityMenu = (
    <Menu
      onClick={handleSpecialitySelect}
      style={{ maxHeight: "200px", overflowY: "auto" }}
    >
      {specialities.map((speciality) => (
        <Menu.Item key={speciality}>
          {selectedSpeciality === speciality ? (
            <span style={{ fontWeight: "bold", color: "#2F38A3" }}>
              {speciality}
            </span>
          ) : (
            speciality
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  const getInitials = (name) => {
    return name.charAt(0);
  };

  const options1 =  filteredDoctors.map(doctor => (
    <Option key={doctor.key} value={doctor.Name}>
      <div style={{
        display: "flex",
        gap: "3px",
        alignItems: "center"
      }}>
        <div>{doctor.Name}</div>
        <div style={{ fontSize: "12px", color: "#888" }}>
          {"(" + doctor.Department + ")"}
        </div>
      </div>
    </Option>
  ))

  const options = filteredDoctors
  .map((doctor) => (
    <Option key={doctor.key} value={doctor.Name}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <img
          src={doctor.Img}
          alt="Doctor"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        /> */}
        {doctor.Img ? (
          <img 
            src={doctor.Img} 
            alt={doctor.Name} 
            className="initials" 
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
        ) : (
          <div 
            className="initials" 
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          >
            {getInitials(doctor.Name)}
          </div>
        )}
        <div>
          <div>{doctor.Name}</div>
          <div style={{ fontSize: "12px", color: "#888" }}>
            {doctor.Department}
          </div>
        </div>
      </div>
    </Option>
  ));

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        color="blue"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {value}
      </Tag>
    );
  };

  return (
    <Form
      style={{ marginTop: "60px" }}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Form.Item
        label={
          <h4
            style={{
              fontSize: "16px",
              fontFamily: "Poppins",
            }}
          >
            Choisissez le Médecin à consulter:
          </h4>
        }
      >
        <Select
          showSearch
          placeholder="Chercher un Médecin"
          onSearch={handleSearchConsulted}
          onSelect={handleSelectConsulted}
          onDeselect={handleDeselectConsulted}
          filterOption={false}
          style={{ width: "100%" }}
          dropdownRender={(menu) => (
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  placeholder="Chercher un Médecin"
                  prefix={<SearchOutlined />}
                  value={searchTermConsulted}
                  onChange={(e) => handleSearchConsulted(e.target.value)}
                  style={{ width: "100%" }}
                />

                <Dropdown overlay={specialityMenu} trigger={["click"]}>
                  <Button style={{ border: "none", padding: "0 8px" }}>
                    Spécialités <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              {menu}
            </div>
          )}
          //tagRender={tagRender}
        >
          {options1}
        </Select>
      </Form.Item>
      {
        isPrivee &&
        <hr
          className="divider"
          style={{ width: "100%" }}
        ></hr>
      }
      {
        isPrivee &&
        <Form.Item
          label={
            <h4
              style={{
                fontSize: "16px",
                fontFamily: "Poppins",
              }}
            >
              Choisissez d&apos;autre Médecins :
            </h4>
          }
        >
          <Select
            mode="multiple"
            showSearch
            placeholder="Chercher un Médecin"
            onSearch={handleSearch}
            onSelect={handleSelect}
            onDeselect={handleDeselect}
            filterOption={false}
            style={{ width: "100%" }}
            dropdownRender={(menu) => (
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    placeholder="Chercher un Médecin"
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ width: "100%" }}
                  />

                  <Dropdown overlay={specialityMenu} trigger={["click"]}>
                    <Button style={{ border: "none", padding: "0 8px" }}>
                      Spécialités <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
                {menu}
              </div>
            )}
            tagRender={tagRender}
          >
            {options}
          </Select>
        </Form.Item>
      }
    </Form>
  );
};

export default DoctorSelectionForm;
