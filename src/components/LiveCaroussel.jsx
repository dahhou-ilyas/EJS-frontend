import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import LiveCard from "./LiveCard";
import Illustration from "../../public/thumbnail1.png";
import Illustration2 from "../../public/thumbnail2.png";
import Illustration3 from "../../public/thumbnail3.png";

const LiveCaroussel = () => {
    // Define sample data for all cards
    const cardsData = [
        {
            backgroundImageLink: Illustration,
            doctor: "@Dr Ahmad BENNANI",
            title: "Sensibilisation aux dangers de consommation du tabac",
            date: "Vendredi 19 Decembre 2024",
        },
        {
            backgroundImageLink: Illustration2,
            time: "12:00",
            doctor: "@Dr Fatima ZAHIRI",
            title: "Prévention du diabète chez les enfants",
            date: "Jeudi 25 Novembre 2024",
        },
        {
            backgroundImageLink: Illustration3,
            time: "15:30",
            doctor: "@Dr Ali EL KHATTABI",
            title: "Les bienfaits du sommeil pour la santé mentale",
            date: "Mercredi 15 Octobre 2024",
        },
        {
            backgroundImageLink: Illustration,
            time: "18:00",
            doctor: "@Dr Leila HAMZAOUI",
            title: "Alimentation équilibrée pour les adultes",
            date: "Samedi 5 Septembre 2024",
        },
        {
            backgroundImageLink: Illustration2,
            time: "20:30",
            doctor: "@Dr Karim BOUZIANE",
            title: "Gestion du stress au quotidien",
            date: "Lundi 15 Juillet 2024",
        },
    ];

    return (
        <>
            {/* Vertical carousel for mobile screens */}
            <div dir="ltr">
            <Carousel
                opts={{
                    align: "start",
                }}
                orientation="vertical"
                className="lg:hidden w-full max-w-sm mx-auto my-16"
            >
                <CarouselContent className="h-[800px] ml-8">
                    {cardsData.map((data, index) => (
                        <CarouselItem key={index} className="basis-1/2">
                            <LiveCard {...data} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
        {/* Horizontal carousel for larger screens */}
        <div dir="ltr">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="hidden lg:block lg:mx-auto w-full lg:max-w-[940px] xl:max-w-[1200px] mb-8"
            >
                <CarouselContent className="lg:ml-20 xl:ml-8">
                    {cardsData.map((data, index) => (
                        <CarouselItem key={index} className="lg:basis-1/2 xl:basis-1/3">
                            <LiveCard {...data} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel></div>
        </>
    );
};

export default LiveCaroussel;
