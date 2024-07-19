import Link from "next/link";

const Breadcrumb= ({title}) => {
    return (
      <div className="page-header">
      <div className="row">
          <div className="col-sm-12">
              <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                      <Link  className={"text-decoration-none  text-[#2E37A4]"}href="/soutien">Soutien Psychologique </Link>
                  </li>
                  <li className="breadcrumb-item">
                      <i className="feather-chevron-right"></i>
                  </li>
                  <li className="breadcrumb-item active">{title}</li>
              </ul>
          </div>
      </div>
  </div>
    )
  }

  export default Breadcrumb ;
