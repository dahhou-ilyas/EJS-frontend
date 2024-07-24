import Link from "next/link";
import Image from "next/image";


const PostItem = ({ href, imgSrc, imgAlt, title, description,arabic }) => {
  if (arabic) {
    return (
      <li style={{ display: 'flex' ,alignItems:'center'}}>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div className="post-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="date-posts">
              <h5>{title}</h5>
            </div>
            <h4>
              <Link className="text-decoration-none" href={href}>
                {description}
              </Link>
            </h4>
          </div>
        </div>
        <div className="post-thumb" style={{ marginLeft: '0px' }}>
          <Link href={href}>
            <Image
              className="img-fluid"
              src={imgSrc}
              alt={imgAlt}
              width={80}
              height={80}
            />
          </Link>
        </div>
      </li>
    );
  }

return(
    <li >
      <div className="post-thumb">
        <Link href={href}>
          <Image
            className="img-fluid"
            src={imgSrc}
            alt={imgAlt}
            width={80}
            height={80}
          />
        </Link>
      </div>
      <div className="post-info">
        <div className="date-posts">
          <h5>{title}</h5>
        </div>
        <h4>
          <Link className="text-decoration-none" href={href}>
            {description}
          </Link>
        </h4>
      </div>
    </li>
    )

  
};

  export default PostItem ;