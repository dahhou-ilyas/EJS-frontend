import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoCalendarNumberOutline } from "react-icons/io5";

const LiveCard = ({ backgroundImageLink, time , doctor, title, date }) => {
    const liveDuration = time ? time : "À venir";
    return (
        <div className="rounded-xl shadow-slate-600 shadow min-h-[350px] bg-gray-50 w-[330px] flex flex-col items-center my-4 relative">
            <div className="relative w-[300px] h-[200px] my-4">
                <Image 
                    src={backgroundImageLink} 
                    alt="thumbnail" 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {liveDuration}
                </div>
            </div>
            <div className="flex ltr:ml-4 rtl:mr-4 justify-start">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ltr:ml-4 rtl:mr-4">
                    <span className="font-semibold block">{doctor}</span>
                    <span className="block text-gray-800">{title}</span>
                    <IoCalendarNumberOutline color="gray" className="inline mr-2" /><span className="text-gray-500 text-sm">{date}</span>
                </div>
            </div>
        </div>
    );
}

export default LiveCard;
