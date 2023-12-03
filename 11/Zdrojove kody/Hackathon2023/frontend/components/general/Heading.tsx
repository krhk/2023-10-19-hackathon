import Icon from "./Icon";

export function Heading({
  title,
  icon,
  description,
}: {
  title: string;
  icon?: string;
  description?: string;
}) {
  return (
    <div className="flex gap-2 items-center mb-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && <p>{description}</p>}
      </div>

      {icon && <Icon icon={icon} className="w-6 h-6 text-black" />}
    </div>
  );
}

export function HeadingSmall({ title }: { title: string }) {
  return <h1 className="text-xl font-bold mb-8">{title}</h1>;
}
