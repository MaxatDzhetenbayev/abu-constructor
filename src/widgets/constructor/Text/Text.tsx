interface TextProps {
  heading: string;
  content: string;
}
function Text({
  options: { content, title_view },
  locale,
}: {
  options: { title: any; content: any, title_view: boolean };
  locale: string;
}) {

  const { title, content: body } = content[locale]

  return (
    <section >
      {
        title && <h2 className="text-3xl font-bold text-abu_primary">
          {title}
        </h2>
      }
      {
        body && <section className="flex flex-1 py-5 flex-col gap-4 md:gap-7 ">
          <div>
            <div className="quill-content"
              dangerouslySetInnerHTML={{ __html: body }}
            ></div>
          </div>

        </section>
      }
    </section>
  );
}
Text.displayName = "Text";
export default Text;
