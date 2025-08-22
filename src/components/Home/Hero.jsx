import Image from "next/image";
import bannerImg from "../../assets/banner.png"
const Hero = () => {
    return (
        <section
        >
    {/* <Image src={bannerImg.src} width={full} height={full} alt="image" />             */}
    <img src={bannerImg.src} className="w-full rounded-2xl" alt="" />
        </section>
    );
};

export default Hero;