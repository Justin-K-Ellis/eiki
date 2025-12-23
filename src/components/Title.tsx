interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return <h1 className="font-bold text-4xl md:text-5xl text-center">{text}</h1>;
}
