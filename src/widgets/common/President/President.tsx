import { motion, MotionProps } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";



export const President = () => {
    const t = useTranslations("home.president_message");

    return (
        <section className="relative">
            {/* Задний фон */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-abu_primary bg-opacity-95 bg-president" />

            <section className="max-w-[1500px] font-raleway px-3  w-full mx-auto my-16 rounded-[10px] overflow-hidden text-white">
                {/* Заголовок */}
                <motion.h2
                    className="text-calc-2xl max-lg:text-center  font-bold mb-20"
                    {...leftViewAnim}
                >
                    {t("title")}
                </motion.h2>

                <section className="w-full flex flex-col max-xl:gap-5 items-center xl:grid grid-cols-[auto_1fr] ">
                    <motion.div
                        {...leftViewAnim}
                        className="xl:mr-3"
                    >
                        <Image
                            src="/icons/president.png"
                            alt="president photo"
                            width={420}
                            height={420}
                            priority={true}

                        />
                    </motion.div>
                    <motion.section  {...rightViewAnim} className="flex flex-col gap-5 xl:pl-4  xl:border-l-4 border-white">
                        <p className="text-justify text-calc-md font-bold ">
                            {t("text")}
                        </p>
                        <p className="text-calc-xl italic text-right font-extrabold ">
                            {t("signature")}
                            <br />
                            {t("name")}
                        </p>
                    </motion.section>
                </section>
            </section>
        </section >
    );
};

const leftViewAnim: MotionProps = {
    transition: { duration: 0.5 },
    whileInView: {
        x: 0,
        opacity: 1,
    },
    initial: {
        opacity: 0,
        x: -100,
    }
}

const rightViewAnim: MotionProps = {
    transition: { duration: 0.5 },
    whileInView: {
        x: 0,
        opacity: 1,
    },
    initial: {
        opacity: 0,
        x: 100,
    }
}