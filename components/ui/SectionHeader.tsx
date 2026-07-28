interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-black">
        {title}
      </h1>

      <p className="text-gray-600 mt-2">
        {subtitle}
      </p>
    </div>
  );
}