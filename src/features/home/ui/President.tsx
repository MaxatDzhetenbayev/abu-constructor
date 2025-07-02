import { motion, MotionProps } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const President = () => {
    const t = useTranslations('home.president_message')
    const locale = useLocale()

    const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false)

    // получение ширины экрана
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Код будет выполнен только на клиенте
            const handleResize = () => setIsMobileWidth(() => window.innerWidth < 768)
            window.addEventListener('resize', handleResize)

            // Установить начальное значение
            handleResize()

            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    const leftViewAnim: MotionProps = {
        transition: { duration: 0.5 },
        whileInView: {
            x: 0,
            opacity: 1
        },
        initial: {
            opacity: 0,
            x: -100
        }
    }

    const rightViewAnim: MotionProps = {
        transition: { duration: 0.5 },
        whileInView: {
            x: isMobileWidth ? 0 : -40,
            opacity: 1
        },
        initial: {
            opacity: 0,
            x: 100
        }
    }

    return (
        <section className="relative">
            {/* Задний фон */}
            <div className="absolute top-0 left-0 right-0 bottom-0 " />

            <section className="max-w-[1500px] font-raleway px-3  w-full mx-auto my-16 rounded-[10px] overflow-hidden text-white">
                <section className="w-full flex flex-col max-xl:gap-5 items-center xl:grid grid-cols-[auto_1fr] ">
                    <motion.div {...leftViewAnim} className="xl:mr-3 rounded-[48px]">
                        <Image
                            src="/images/president.png"
                            alt="president photo"
                            width={420}
                            height={420}
                            priority={true}
                        />
                    </motion.div>
                    <motion.section
                        {...rightViewAnim}
                        className="flex flex-col bg-[#F9FAFA] gap-5 xl:pl-4   pt-10 px-5 pb-5"
                    >
                        <p className="text-justify  text-calc-xl text-[#333333] font-bold">{t('title')}</p>
                        <p className="text-justify text-black text-calc-md ">
                            {text[locale as keyof typeof text] ?? text.ru}
                        </p>
                        <p className="text-calc-xl italic text-right text-black font-extrabold ">
                            {t('signature')}
                            <br />
                            {t('university')}
                            <br />
                            {t('name')}
                        </p>
                    </motion.section>
                </section>
            </section>
        </section>
    )
}

const text = {
    kz: (
        <>
            <p className="indent-10">
                Әлихан Бөкейхан университеті өзінің отыз жылға жуық тарихында өңірдің әлеуметтік-экономикалық өрлеуіне
                мәдени-ғылыми әлеуетімен тікелей атсалысып келеді.
            </p>
            <p className="indent-10">
                Қазіргі кезеңде университет «үшінші миссиясын» жүзеге асыруда қоғам алдындағы жауапкершілікті, жаңашыл
                идеялардың ұйытқысы болуды көздейді.
            </p>
            <p className="indent-10">
                Білім беру, ғылыми зерттеу жұмыстары ұлттық болмыс, құндылықтар қалыптастыруға қызмет етеді.
            </p>
            <p className="indent-10">Әлихан Бөкейхан университеті дипломды мамандарды даярлаумен шектелмейді.</p>
            <p className="indent-10">
                Күнделікті өзгеріп отырған заман талабына бейімделген, сыни ойлау қабілеті жоғары тұлғаны қалыптастыруға
                мүдделі.
            </p>
            <p className="indent-10">
                Барлық деңгейдегі (бакалавариат-магистратура-доктарантура) білім беру бағдарламаларын жұмыс беруші
                тараптың тікелей сұранысы бойынша үнемі жетілдіреді.
            </p>
            <p className="indent-10">Сапалы университет – сапалы қоғам кепілі.</p>
            <p className="indent-10">
                Жасанды интеллект пен технология дәуірінде ізгілікті әрекетпен келешектің іргетасын қалайтын зиялылардың
                жаңа буынын қалыптастыру – біздің басты мақсатымыз.
            </p>
            <p className="indent-10">
                Білім алушылардың асыл парызы – табиғатпен үндес рухани тепе-теңдікті сақтай білу болмақ.
            </p>
            <p className="indent-10">
                Уақыт өзгереді, алайда біздің университеттің түлектері ұлттық құндылықтарды әлемдік озық үлгімен
                ұштастырып, Әлихан аманат еткендей – ұлтқа қызмет ету жолындағы «өмір бейнесіне» ілесуге ұмтылады.
            </p>
        </>
    ),
    ru: (
        <>
            <p className="indent-10">
                На протяжении почти тридцати лет своей истории Alikhan Bokeikhan University вносит значительный вклад в
                социально-экономическое развитие региона, реализуя свой культурный и научный потенциал. Сегодня
                университет активно осуществляет свою «Третью миссию», принимая на себя социальную ответственность и
                выступая источником прогрессивных идей.
            </p>
            <p className="indent-10">
                Образовательная и научно-исследовательская деятельность направлена не только на передачу знаний, но и на
                формирование национальной идентичности и ценностных ориентиров. Университет не ограничивается
                подготовкой квалифицированных специалистов: его приоритет — развитие личности, способной адаптироваться
                к стремительно меняющемуся миру, обладающей критическим мышлением и активной гражданской позицией.
            </p>
            <p className="indent-10">
                Образовательные программы всех уровней — бакалавриат, магистратура, докторантура — регулярно
                совершенствуются на основе прямого диалога с работодателями и запросов рынка труда. Качественное
                образование — основа качественного общества.
            </p>
            <p className="indent-10">
                В условиях стремительного развития технологий и распространения искусственного интеллекта университет
                ставит перед собой важнейшую задачу — подготовку нового поколения интеллектуалов, чьи гуманные действия
                станут прочным фундаментом будущего. Духовное равновесие и гармония с природой — неотъемлемая часть
                образовательной философии ABU.
            </p>
            <p className="indent-10">
                Мир меняется, но выпускники Alikhan Bokeikhan University, сочетая национальные ценности с лучшими
                мировыми практиками, будут стремиться жить и трудиться в духе служения своей нации — так, как завещал
                Алихан Бокейханов.
            </p>
        </>
    ),
    en: (
        <>
            <p className="indent-10">
                For nearly three decades, Alikhan Bokeikhan University has played an active role in the socio-economic
                development of the region, contributing through its cultural and scientific potential. Today, the
                university is committed to fulfilling its “Third mission” by embracing social responsibility and serving
                as a source of innovative ideas.
            </p>
            <p className="indent-10">
                Its educational and research activities aim not only to disseminate knowledge but also to foster
                national identity and core values. The university goes beyond simply training qualified professionals—it
                is dedicated to shaping individuals who can adapt to the ever-changing demands of the modern world and
                who possess strong critical thinking skills and a sense of civic duty.
            </p>
            <p className="indent-10">
                All academic programs—bachelor’s, master’s, and doctoral levels—are continuously updated in direct
                response to the needs of employers and the evolving labor market. A quality university is the foundation
                of a quality society.
            </p>
            <p className="indent-10">
                In an era defined by rapid technological progress and the rise of artificial intelligence, Alikhan
                Bokeikhan University is focused on nurturing a new generation of intellectuals whose humane actions will
                lay the groundwork for a sustainable future. The ability to maintain spiritual balance and live in
                harmony with nature is a key part of the university’s educational philosophy.
            </p>
            <p className="indent-10">
                Times may change, but graduates of Alikhan Bokeikhan University—combining national values with global
                best practices—will continue to follow a way of life rooted in service to the nation, as envisioned by
                Alikhan Bokeikhan himself.
            </p>
        </>
    )
}
