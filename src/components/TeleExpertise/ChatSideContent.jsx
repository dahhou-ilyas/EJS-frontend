import Link from "next/link";
import { searchnormal } from "@/components/TeleExpertise/imagepath";
import Image from "next/image";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeToken } from "@/utils/docodeToken";
import { getAllMedecins } from "@/services/medecinService";

const ChatSideContent = ({userId}) => {
  const router = useRouter();
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState("");

  const openConversation = (userId) => {
    router.push(`/TeleExpertise/Chat/${userId}`);
  };


  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("access-token")
      const decodedToken = decodeToken(token)
      try {
        const res = await getAllMedecins(token)
        const filteredData = res
          .filter(d => d.id !== decodedToken.claims.id)
          .map(d => ({
            ...d,
            name: d.nom + " " + d.prenom,
          }));

        setData(filteredData);
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  const getInitials = (name) => {
    return name.charAt(0);
  };

  useEffect(() => {
    const result = data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) 
    );
    setFilteredData(result);
  }, [search, data]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="col-xl-4 d-flex">
      <div className="card chat-box-clinic ">
        <div className="chat-widgets">
          {/* search bar */}
          <div className="top-liv-search top-chat-search">
            <form onSubmit={(e) => {e.preventDefault()}}>
              <div className="chat-search">
                <div className="form-group me-2 mb-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here"
                    value={search}
                    onChange={handleSearch}
                  />
                  <div className="btn">
                    <Image src={searchnormal} alt="#" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* search bar */}
          {/* list of users */}
          <ul>
            {filteredData.map((user) => (
              <li
                key={user.id}
                className="chat-user-group d-flex align-items-center"
                onClick={() => openConversation(user.id)}
                style={{ cursor: "pointer", backgroundColor: user.id === Number(userId) ? "#2e37a4" : ""}}
              >
                <div className="img-users call-user">
                    <div 
                      className="initials avatar-img rounded-circle"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "5px"
                      }}
                    >
                      {getInitials(user.name)}
                    </div>
                  {/* <span
                    className={`active-users ${user.active ? "bg-info" : ""}`}
                  /> */}
                </div>
                <div className="chat-users">
                  <div className="user-titles d-flex">
                    <h5 style={{color: user.id === Number(userId) ? "white" : ""}}>{user.name}</h5>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatSideContent;
