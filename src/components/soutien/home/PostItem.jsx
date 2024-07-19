import Link from "next/link";
import Image from "next/image";


const PostItem = ({ href, imgSrc, imgAlt, title, description }) => (
    <li>
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
  );

  export default PostItem ;