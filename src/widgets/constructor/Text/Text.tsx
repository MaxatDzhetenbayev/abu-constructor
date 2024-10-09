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
  console.log(title_view)

  return (
    <section className="p-4 ">
      {title_view === true &&
        <h2 className="text-3xl mb-2 ">{content?.[locale]?.title}</h2>
      }
      <div
        className="quill-content"
        dangerouslySetInnerHTML={{ __html: content[locale].content }}
      />
    </section>
  );
}
Text.displayName = "Text";
export default Text;
