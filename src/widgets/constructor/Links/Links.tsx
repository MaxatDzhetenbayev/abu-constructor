function Links({
  contents,
  options: { content },
  locale,
}: {
  contents: Array<any>;
  options: any;
  locale: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-3xl font-bold text-abu_primary">
        {content[locale].title}
      </h2>
      <ul className="transition-colors duration-150 flex flex-col gap-3 ">
        {contents.map(({ content }, idx) => (
          <li
            key={idx}
            className="hover:text-[#640000] text-xl underline hover:underline-offset-2  "
          >
            <a href={content[locale].link} target="_blank">
              {content[locale].title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
Links.displayName = "Links";

export default Links;
