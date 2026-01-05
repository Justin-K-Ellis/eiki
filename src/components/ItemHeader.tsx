interface ItemHeaderProps {
  text: string;
}

export default function ItemHeader({ text }: ItemHeaderProps) {
  return (
    <div className="mb-4 md:mb-6">
      <h2 className="font-bold text-3xl md:text-4xl">{text}</h2>
      <hr />
    </div>
  );
}
