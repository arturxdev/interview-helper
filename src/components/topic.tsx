import Image from "next/image";
export function Topic({
  img,
  title,
  description,
}: {
  img: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <Image src={img} alt={title} width={24} height={24} />
      </div>
      <h3 className="text-2xl font-semibold mb-2 leading-none tracking-tight">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
