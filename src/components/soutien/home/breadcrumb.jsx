import Link from "next/link";
import BUTTON from "@/components/button";

const Breadcrumb= ({title,arabic,showbutt}) => {
    if(arabic){
            return (
                <div className="page-header" dir="rtl" style={{ marginBottom: '25px' }}>
                <div className="row">
                    <div className="col-sm-12">
                        <ul className="breadcrumb"   style={{ marginRight: '300px' }}>
                            <li className="breadcrumb-item">
                                <Link  className={"text-decoration-none  text-[#2E37A4]"}href="/soutien">دعم نفسي  </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <i className="feather-chevron-right"></i>
                            </li>
                            <li className="breadcrumb-item active">{title}</li>
                        </ul>
                    </div>
                </div>
                {/* langue switcher */}
                {showbutt && <div   style={{ marginLeft: '45px' }}><BUTTON/></div>  }
            </div>
            )
    }
    return (
      <div className="page-header"  style={{ marginBottom: '25px' }}>
      <div className="row">
          <div className="col-sm-12">
              <ul className="breadcrumb"    style={{ marginLeft: '45px' }}>
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
       {/* langue switcher */}
        {showbutt && <div  style={{ marginRight: '300px' }} ><BUTTON/></div> }
       </div>
    )
  }

  export default Breadcrumb ;
