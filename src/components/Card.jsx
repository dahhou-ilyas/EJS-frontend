import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Card = ({ href, title, src }) => {
    return (
        <Link
            className="rounded-xl shadow-slate-600 shadow h-[350x] w-[350px] relative cursor-pointer group overflow-hidden inline-block"
            href={href}
        >
            <div className="relative w-[350px] h-[350px]">
                <Image
                    src={src}
                    alt="thumbnail"
                    fill
                    className="rounded-t-xl transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-100"></div>
                <span className="text-white font-medium text-lg absolute bottom-4 flex items-center group-hover:-translate-y-5 transition-transform duration-300 ease-out ltr:ml-6 rtl:mr-6">
                    {title}
                    <FaArrowRight className="inline ltr:ml-2 rtl:mr-2 transition-transform duration-300 ease-out ltr:group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180" />
                </span>
            </div>
        </Link>
    );
};

export default Card;
