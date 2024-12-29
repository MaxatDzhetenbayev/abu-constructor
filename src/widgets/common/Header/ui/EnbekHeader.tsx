import Image from "next/image"
import Link from "next/link"

import { Navbar } from "@/features"

export const EnbekHeader = () => {
    return <header className=" w-full">
        <div className="max-w-[1500px] py-3 md:py-0 mx-auto h-[133px] items-center flex md:flex-row flex-col gap-3  justify-center  md:gap-10">
            <h1 className="  font-bold text-center md:text-end">«АБАЙ ОБЛЫСЫНЫҢ ЕҢБЕК МОБИЛЬДІЛІГІ ОРТАЛЫҒЫ» КММ</h1>
            <Link
                href="/"
                className="flex gap-3 items-center"
            >
                <Image
                    src={`/enbek/enbek.png`}
                    alt="logo"
                    width={70}
                    height={70}
                    priority
                    className="md:w-[55px] md:h-[55px] w-[50px] h-[50px]"
                    style={{ objectFit: "contain" }}
                />
                <Image
                    src={`/enbek/oblysy.png`}
                    alt="logo"
                    width={140}
                    height={90}
                    className="md:w-[120px] md:h-[70px] w-[100px] h-[50px]"
                    priority
                    style={{ objectFit: "contain" }}
                />
            </Link>
        </div>
        <Navbar />
    </header>

}
