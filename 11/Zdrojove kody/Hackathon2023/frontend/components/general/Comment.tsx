import Icon from "./Icon";

export default function Comment({
  name,
  text,
}: {
  name: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
        <Icon icon="Tree" className="text-white w-4 h-4" />
      </div>

      <div className="w-fit">
        <p className="font-bold">{name}</p>
        <p className="text-gray-500 w-[40rem] text-sm">{text}</p>
      </div>
    </div>
  );
}
