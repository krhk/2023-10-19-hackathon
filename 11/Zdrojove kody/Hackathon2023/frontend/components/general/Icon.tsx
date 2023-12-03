import * as icons from "@phosphor-icons/react/dist/ssr";

export default function Icon({
  icon,
  className,
  weight = "bold",
}: {
  icon: string;
  className: string;
  weight?: string;
}) {
  // @ts-ignore
  const PhosphorIcon = icons[icon];
  if (!PhosphorIcon) return <></>;

  return <PhosphorIcon aria-hidden className={className} weight={weight} />;
}
