import Link from "next/link";
import { searchnormal } from "@/components/TeleExpertise/imagepath";
import Image from "next/image";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useRouter } from "next/navigation";

const ChatSideContent = ({ users }) => {
  const router = useRouter();

  const openConversation = (userId) => {
    router.push(`/TeleExpertise/Chat/${userId}`);
  };
  return (
    <div className="col-xl-4 d-flex">
      <div className="card chat-box-clinic ">
        <div className="chat-widgets">
          {/* search bar */}
          <div className="top-liv-search top-chat-search">
            <form>
              <div className="chat-search">
                <div className="form-group me-2 mb-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here"
                  />
                  <Link href="/" className="btn">
                    <Image src={searchnormal} alt="#" />
                  </Link>
                </div>
              </div>
            </form>
          </div>
          {/* search bar */}
          {/* list of users */}
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="chat-user-group d-flex align-items-center"
                onClick={() => openConversation(user.name.toString())}
                style={{ cursor: "pointer" }}
              >
                <div className="img-users call-user">
                  <Link href="/">
                    <Image src={user.avatar} alt="img" />
                  </Link>
                  <span
                    className={`active-users ${user.active ? "bg-info" : ""}`}
                  />
                </div>
                <div className="chat-users">
                  <div className="user-titles d-flex">
                    <h5>{user.name}</h5>
                    <div className="chat-user-time">
                      <p>{user.lastMessageTime}</p>
                    </div>
                  </div>
                  <div className="user-text d-flex">
                    <p>{user.lastMessage}</p>
                    {user.unreadCount > 0 && (
                      <div className="chat-user-count">
                        <span>{user.unreadCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* list of users */}

          {/* <div className="chat-user-group d-flex align-items-center">
            <div className="img-users call-user">
              <Link href="/">
                <Image src={Avatar4} alt="img" />
              </Link>
              <span className="active-users bg-info" />
            </div>
            <div className="chat-users">
              <div className="user-titles d-flex">
                <h5> Bernardo James </h5>
                <div className="chat-user-time">
                  <p>11:35 AM</p>
                </div>
              </div>
              <div className="user-text d-flex">
                <p>Lorem ipsum dolor sit amet...</p>
              </div>
            </div>
          </div>
          <div className="chat-user-group d-flex align-items-center">
            <div className="img-users call-user">
              <Link href="/">
                <Image src={Avatar5} alt="img" />
              </Link>
              <span className="active-users" />
            </div>
            <div className="chat-users">
              <div className="user-titles d-flex">
                <h5> Harald Kowalski </h5>
                <div className="chat-user-time">
                  <p>11:35 AM</p>
                </div>
              </div>
              <div className="user-text d-flex">
                <p>Lorem ipsum dolor sit amet...</p>
                <div className="chat-user-count">
                  <span>5</span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-user-group d-flex align-items-center">
            <div className="img-users call-user">
              <Link href="/">
                <Image src={Avatar6} alt="img" />
              </Link>
              <span className="active-users bg-info" />
            </div>
            <div className="chat-users">
              <div className="user-titles d-flex">
                <h5> Alexandr Donnelly </h5>
                <div className="chat-user-time">
                  <p>11:35 AM</p>
                </div>
              </div>
              <div className="user-text d-flex">
                <p>Lorem ipsum dolor sit amet...</p>
                <div className="chat-user-count">
                  <span>3</span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-user-group d-flex align-items-center">
            <div className="img-users call-user">
              <Link href="/">
                <Image src={Avatar7} alt="img" />
              </Link>
              <span className="active-users" />
            </div>
            <div className="chat-users">
              <div className="user-titles d-flex">
                <h5> Regina Dickerson </h5>
                <div className="chat-user-time">
                  <p>11:35 AM</p>
                </div>
              </div>
              <div className="user-text d-flex">
                <p>Lorem ipsum dolor sit amet...</p>
              </div>
            </div>
          </div>
          <div className="chat-user-group mb-0 d-flex align-items-center">
            <div className="img-users call-user">
              <Link href="/">
                <Image src={Avatar8} alt="img" />
              </Link>
              <span className="active-users bg-info" />
            </div>
            <div className="chat-users">
              <div className="user-titles d-flex">
                <h5> Forest Kroch</h5>
                <div className="chat-user-time">
                  <p>11:35 AM</p>
                </div>
              </div>
              <div className="user-text d-flex">
                <p>Lorem ipsum dolor sit amet...</p>
                <div className="chat-user-count">
                  <span>3</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatSideContent;
