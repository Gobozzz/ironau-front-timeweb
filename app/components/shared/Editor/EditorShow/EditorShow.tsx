"use client";
import ImageNext from "next/image";
import styles from "./EditorShow.module.css";
import DOMPurify from "dompurify";

interface Props {
  blocks: any[];
}

const Header = ({ data }: { data: any }) => <h1>{data.text}</h1>;
const Paragraph = ({ data }: { data: any }) => (
  <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.text) }} />
);

const Image = ({ data }: { data: any }) => (
  <ImageNext
    width={600}
    height={320}
    loading="lazy"
    src={data.file.url}
    alt="Фото"
  />
);
const List = ({ data }: { data: any }) => {
  if (data.style === "unordered") {
    return (
      <ul>
        {data.items.map((item: { content: string }, index: number) => (
          <li key={index}>{item.content}</li>
        ))}
      </ul>
    );
  } else {
    return (
      <ol>
        {data.items.map((item: { content: string }, index: number) => (
          <li key={index}>{item.content}</li>
        ))}
      </ol>
    );
  }
};
const Quote = ({ data }: { data: any }) => <blockquote>{data.text}</blockquote>;
const Table = ({ data }: { data: any }) => {
  if (data.withHeadings) {
    return (
      <div className={styles.table_wrapper}>
        <table>
          <thead>
            <tr>
              {data.content[0].map((cell: any, cellIndex: number) => (
                <th key={cellIndex}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.content.map((row: any, index: number) => {
              if (index === 0) return;
              return (
                <tr key={index}>
                  {row.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className={styles.table_wrapper}>
        <table>
          <tbody>
            {data.content.map((row: any, index: number) => (
              <tr key={index}>
                {row.map((cell: any, cellIndex: number) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
const Warning = ({ data }: { data: any }) => (
  <div className={styles.warning}>
    <div>❗</div>
    <div>
      <div className={styles.warning_title}>{data.title}</div>
      <div className={styles.warning_text}>{data.message}</div>
    </div>
  </div>
);

const componentMap: Record<string, React.FC<{ data: any }>> = {
  header: Header,
  image: Image,
  List: List,
  quote: Quote,
  table: Table,
  warning: Warning,
  paragraph: Paragraph,
};

export function EditorShow({ blocks }: Props) {
  return (
    <div className={styles.text_editor}>
      {blocks.map((block, index) => {
        const Component = componentMap[block.type];
        if (!Component) return null;
        return <Component key={index} data={block.data} />;
      })}
    </div>
  );
}
