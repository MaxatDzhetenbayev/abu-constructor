"use client";
import { useParams, usePathname } from "next/navigation";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui";


import { INavigation } from "@/entities/navigation/model/navigation.model";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useNavigationList } from "../api/useNavigationList";

interface INavListProps {
    hoveredItem: number | null;
    setHoveredItem: (id: number | null) => void;
}
export const NavigationList = ({
    hoveredItem,
    setHoveredItem,
}: INavListProps) => {
    const { data: navigations, isFetching } = useNavigationList();
    const locale = useParams().locale as string;

    const handleMouseEnter = (id: number) => {
        setHoveredItem(id);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };
    return (
        <div className="flex-1">
            {/* {isFetching ? ( */}
            {/*     <div className="w-[600px] grid place-items-center h-[5.875rem]"> */}
            {/*         <Skeleton className="w-full h-[3rem]" /> */}
            {/*     </div> */}
            {/* ) : */}
            {mock ? (
                <ul className="flex gap-4">
                    <NavList lvl={0} pages={mock} locale={locale} />
                </ul>
            ) : (
                <span>Навигация не найдена</span>
            )}
        </div>
    );
};

const NavList = ({
    pages,
    locale,
    lvl
}: {
    pages: INavigation[];
    locale: string | string[];
    lvl: number
}) => {
    const path = usePathname();
    return pages.map((page) => {
        if (page.children.length === 0) {
            return (
                <Link
                    className={clsx(
                        "text-left pl-6 p-1 rounded-md text-white bg-enbek_primary_active",
                        path == `/${locale}${page.slug}` && "font-bold",
                    )}
                    href={`/${locale}${page.slug}`}
                    key={page.id}
                >
                    {page.title[locale as string]}
                </Link>
            );
        } else {
            return (
                <DropdownMenu key={page.id}>
                    <DropdownMenuTrigger asChild>
                        <div className="p-1 cursor-pointer  rounded-md flex gap-2 items-center  text-center text-white justify-normal ">
                            <span className="ml-2    lg:ml-5">
                                {page.title[locale as string]}
                            </span>
                            <ChevronRight className={clsx("transition rotate-90 mt-1")} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side={lvl == 0 ? 'bottom' : 'right'}
                        align="start"
                        className="flex flex-col gap-3  text-white bg-enbek_primary_active py-2 border-1  border-enbek_primary"
                    >
                        <NavList lvl={lvl + 1} locale={locale} pages={page.children} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    });
};
export const mock: INavigation[] = [

    {
        "id": 2,
        "title": {
            "en": "Prospective students",
            "kz": "Талапкерлерге",
            "ru": "Поступающим"
        },
        "slug": "prospective",
        "variant": "vertical",
        "navigation_type": "group",
        "order": 2,
        "parent_id": null,
        "createdAt": "2024-08-11T10:29:42.375Z",
        "updatedAt": "2024-12-18T11:12:35.067Z",
        "children": [
            {
                "id": 92,
                "title": {
                    "en": "Bachelor's degree",
                    "kz": "Бакалавр дәрежесі",
                    "ru": "Бакалавриат"
                },
                "slug": "bachelor's_degree",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 2,
                "parent_id": 2,
                "createdAt": "2024-09-18T05:54:02.284Z",
                "updatedAt": "2024-12-18T11:12:36.580Z",
                "children": []
            },
            {
                "id": 93,
                "title": {
                    "en": "Master's degree",
                    "kz": "Магистр деңгейі",
                    "ru": "Магистратура"
                },
                "slug": "master's_degree",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 3,
                "parent_id": 2,
                "createdAt": "2024-09-18T05:55:06.023Z",
                "updatedAt": "2024-12-18T11:12:38.015Z",
                "children": []
            },
            {
                "id": 94,
                "title": {
                    "en": "Doctorate",
                    "kz": "Докторантура",
                    "ru": "Докторантура"
                },
                "slug": "doctorates_degree",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 4,
                "parent_id": 2,
                "createdAt": "2024-09-18T05:56:47.178Z",
                "updatedAt": "2024-12-18T11:12:39.314Z",
                "children": []
            },
            {
                "id": 52,
                "title": {
                    "en": "Grants",
                    "kz": "Гранттар",
                    "ru": "Гранты"
                },
                "slug": "grants",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 5,
                "parent_id": 2,
                "createdAt": "2024-08-26T00:39:34.282Z",
                "updatedAt": "2024-12-18T11:12:40.287Z",
                "children": []
            },
            {
                "id": 55,
                "title": {
                    "en": "Admissions committee",
                    "kz": "Қабылдау комиссиясы",
                    "ru": "Приемная комиссия"
                },
                "slug": "admissions_committee",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 6,
                "parent_id": 2,
                "createdAt": "2024-08-26T00:41:31.936Z",
                "updatedAt": "2024-12-18T11:12:41.338Z",
                "children": []
            },
            {
                "id": 53,
                "title": {
                    "en": "Subject Olympiads",
                    "kz": "Пәндік олимпиадалар",
                    "ru": "Предметные олимпиады"
                },
                "slug": "subject_olympiads",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 7,
                "parent_id": 2,
                "createdAt": "2024-08-26T00:40:21.440Z",
                "updatedAt": "2024-12-18T11:12:42.331Z",
                "children": []
            },
            {
                "id": 51,
                "title": {
                    "en": "Joint educational programs",
                    "kz": "Бірлескен білім беру бағдарламалары",
                    "ru": "Совместные образовательные программы"
                },
                "slug": "joint_educational_programs",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 8,
                "parent_id": 2,
                "createdAt": "2024-08-26T00:39:14.226Z",
                "updatedAt": "2024-12-18T11:12:43.196Z",
                "children": []
            },
            {
                "id": 54,
                "title": {
                    "en": "Benefits and discounts",
                    "kz": "Жеңілдіктер мен жеңілдіктер",
                    "ru": "Льготы и скидки"
                },
                "slug": "benefits&discounts",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 9,
                "parent_id": 2,
                "createdAt": "2024-08-26T00:41:00.138Z",
                "updatedAt": "2024-12-18T11:12:44.221Z",
                "children": []
            }
        ]
    },
    {
        "id": 22,
        "title": {
            "en": "Science",
            "kz": "Ғылым",
            "ru": "Наука"
        },
        "slug": "science",
        "variant": "vertical",
        "navigation_type": "group",
        "order": 3,
        "parent_id": null,
        "createdAt": "2024-08-25T23:51:19.638Z",
        "updatedAt": "2024-12-18T11:12:12.635Z",
        "children": [
            {
                "id": 56,
                "title": {
                    "en": "Science ABU",
                    "kz": "Ғылым ABU",
                    "ru": "Наука ABU"
                },
                "slug": "science_abu",
                "variant": "horizontal",
                "navigation_type": "group-link",
                "order": 1,
                "parent_id": 22,
                "createdAt": "2024-08-26T00:42:59.262Z",
                "updatedAt": "2024-08-26T00:42:59.262Z",
                "children": []
            },
            {
                "id": 57,
                "title": {
                    "en": "Scientific community",
                    "kz": "Ғылыми қоғамдастық",
                    "ru": "Научное сообщество"
                },
                "slug": "scientific_community",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 2,
                "parent_id": 22,
                "createdAt": "2024-08-26T00:43:22.224Z",
                "updatedAt": "2024-12-18T11:12:14.577Z",
                "children": []
            },
            {
                "id": 58,
                "title": {
                    "en": "Projects and initiatives",
                    "kz": "Жобалар мен бастамалар",
                    "ru": "Проекты и инициативы "
                },
                "slug": "projects&initiatives",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 3,
                "parent_id": 22,
                "createdAt": "2024-08-26T00:43:52.890Z",
                "updatedAt": "2024-12-18T11:12:17.081Z",
                "children": []
            },
            {
                "id": 59,
                "title": {
                    "en": "Research centers, resources and funding",
                    "kz": "Зерттеу орталықтары, ресурстар және қаржыландыру",
                    "ru": "Научные центры, ресурсы и финансирование"
                },
                "slug": "research_centers",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 4,
                "parent_id": 22,
                "createdAt": "2024-08-26T00:44:30.796Z",
                "updatedAt": "2024-12-18T11:12:18.480Z",
                "children": []
            },
            {
                "id": 60,
                "title": {
                    "en": "Training of scientific personnel",
                    "kz": "Ғылыми кадрларды даярлау",
                    "ru": "Подготовка научных кадров"
                },
                "slug": "training_of_scientific_personnel",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 5,
                "parent_id": 22,
                "createdAt": "2024-08-26T00:45:01.118Z",
                "updatedAt": "2024-12-18T11:12:19.681Z",
                "children": []
            },
            {
                "id": 61,
                "title": {
                    "en": "Scientific journals",
                    "kz": "Ғылыми журналдар",
                    "ru": "Научные журналы"
                },
                "slug": "scientific_journals",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 6,
                "parent_id": 22,
                "createdAt": "2024-08-26T00:45:42.616Z",
                "updatedAt": "2024-12-18T11:12:20.645Z",
                "children": []
            },
            {
                "id": 62,
                "title": {
                    "en": "Start-up ecosystem",
                    "kz": "Іске қосу экожүйесі",
                    "ru": "Стартап экосистема"
                },
                "slug": "start-up_ecosystem",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 7,
                "parent_id": 22,
                "createdAt": "2024-08-26T00:46:11.041Z",
                "updatedAt": "2024-12-18T11:12:22.858Z",
                "children": []
            }
        ]
    },
    {
        "id": 23,
        "title": {
            "en": "Education",
            "kz": "Білім",
            "ru": "Образование"
        },
        "slug": "education",
        "variant": "vertical",
        "navigation_type": "group",
        "order": 4,
        "parent_id": null,
        "createdAt": "2024-08-25T23:52:01.991Z",
        "updatedAt": "2024-12-18T11:11:48.310Z",
        "children": [
            {
                "id": 63,
                "title": {
                    "en": "Academic policy",
                    "kz": "Академиялық саясат",
                    "ru": "Академическая политика"
                },
                "slug": "academic_policy",
                "variant": "horizontal",
                "navigation_type": "group-link",
                "order": 1,
                "parent_id": 23,
                "createdAt": "2024-08-26T00:46:55.423Z",
                "updatedAt": "2024-12-11T05:03:45.892Z",
                "children": []
            },
            {
                "id": 65,
                "title": {
                    "en": "Академические советы факультетов",
                    "kz": "Академические советы факультетов",
                    "ru": "Академические советы факультетов"
                },
                "slug": "academic_advice-on_faculty_quality",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 2,
                "parent_id": 23,
                "createdAt": "2024-08-26T00:48:05.001Z",
                "updatedAt": "2024-12-18T11:11:52.478Z",
                "children": []
            },
            {
                "id": 66,
                "title": {
                    "en": "Educational and methodological advice",
                    "kz": "Оқу-әдістемелік кеңес",
                    "ru": "Учебно-методический совет"
                },
                "slug": "educational&methodological_advice",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 3,
                "parent_id": 23,
                "createdAt": "2024-08-26T00:49:10.096Z",
                "updatedAt": "2024-12-18T11:11:55.080Z",
                "children": []
            },
            {
                "id": 64,
                "title": {
                    "en": "Regulatory documents",
                    "kz": "Нормативтік құжаттар",
                    "ru": "Нормативные документы"
                },
                "slug": "regulatory_documents",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 4,
                "parent_id": 23,
                "createdAt": "2024-08-26T00:47:27.737Z",
                "updatedAt": "2024-12-18T11:11:56.281Z",
                "children": []
            },
            {
                "id": 67,
                "title": {
                    "en": "Professional practice",
                    "kz": "Кәсіби тәжірибе",
                    "ru": "Профессиональная практика"
                },
                "slug": "professional_practice",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 5,
                "parent_id": 23,
                "createdAt": "2024-08-26T00:49:35.783Z",
                "updatedAt": "2024-12-18T11:11:57.290Z",
                "children": [
                    {
                        "id": 68,
                        "title": {
                            "en": "Inclusive education",
                            "kz": "Инклюзивті білім беру",
                            "ru": "Инклюзивное образование"
                        },
                        "slug": "inclusive_education",
                        "variant": "horizontal",
                        "navigation_type": "content",
                        "order": 6,
                        "parent_id": 23,
                        "createdAt": "2024-08-26T00:50:06.908Z",
                        "updatedAt": "2024-12-18T11:11:58.557Z",
                        "children": []
                    }
                ]
            },
            {
                "id": 68,
                "title": {
                    "en": "Inclusive education",
                    "kz": "Инклюзивті білім беру",
                    "ru": "Инклюзивное образование"
                },
                "slug": "inclusive_education",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 6,
                "parent_id": 23,
                "createdAt": "2024-08-26T00:50:06.908Z",
                "updatedAt": "2024-12-18T11:11:58.557Z",
                "children": []
            },
            {
                "id": 69,
                "title": {
                    "en": "Dual training",
                    "kz": "Дуальды оқыту",
                    "ru": "Дуальное обучение"
                },
                "slug": "dual_training",
                "variant": "horizontal",
                "navigation_type": "content",
                "order": 7,
                "parent_id": 23,
                "createdAt": "2024-08-26T00:50:31.827Z",
                "updatedAt": "2024-12-18T11:11:59.622Z",
                "children": [
                    {
                        "id": 68,
                        "title": {
                            "en": "Inclusive education",
                            "kz": "Инклюзивті білім беру",
                            "ru": "Инклюзивное образование"
                        },
                        "slug": "inclusive_education",
                        "variant": "horizontal",
                        "navigation_type": "content",
                        "order": 6,
                        "parent_id": 23,
                        "createdAt": "2024-08-26T00:50:06.908Z",
                        "updatedAt": "2024-12-18T11:11:58.557Z",
                        "children": []
                    },
                ]
            }
        ]
    }
]
