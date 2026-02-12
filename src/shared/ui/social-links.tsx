import Image from "next/image";

const links = [
  {
    name: "VK",
    href: "https://vk.com/id450108918",
    // без отдельной иконки используем текстовый бейдж
    type: "text" as const,
    text: "vk",
  },
  {
    name: "Instagram",
    image: "/icons/instagram.svg",
    href: "https://www.instagram.com/bokeikhan_university/",
    type: "image" as const,
  },
  {
    name: "Facebook",
    image: "/icons/facebook.svg",
    href: "https://www.facebook.com/bokeikhan.university",
    type: "image" as const,
  },
  {
    name: "YouTube",
    image: "/icons/youtube.svg",
    href: "https://www.youtube.com/c/AlikhanBokeikhanUniversity",
    type: "image" as const,
  },
  {
    name: "LinkedIn",
    href: "https://kz.linkedin.com/company/bokeikhan-university",
    type: "text" as const,
    text: "in",
  },
] as const;

export const SocialLinks = () => {
  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.name}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-abu_primary"
          >
            {link.type === "image" && link.image ? (
              <Image
                src={link.image}
                alt={link.name}
                width={20}
                height={20}
              />
            ) : (
              <span className="text-sm font-semibold uppercase">
                {link.text}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
};
