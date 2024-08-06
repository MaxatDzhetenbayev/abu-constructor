import { CarouselClient } from "@/widgets/Carousel/CarouselClient";
import { CarouselProps } from "@/widgets/Carousel/modele/Carousel.interface";

function Carousel(props: CarouselProps) {
    return <CarouselClient {...props} />;
}


Carousel.displayName = "Carousel";
export default Carousel;
