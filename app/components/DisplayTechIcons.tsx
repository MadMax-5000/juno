import Image from "next/image";
import { cn, getTechLogos } from "@/lib/utils";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);

  return (
    <div className="flex items-center -space-x-2">
      {techIcons.slice(0, 3).map(({ tech, url }) => (
        <div
          key={tech}
          className="relative bg-black rounded-full p-1.5 border border-neutral-700 hover:border-[#3ECF8E] hover:z-10 transition-all duration-200 group"
        >
          <span
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                       px-2 py-1 text-xs text-white bg-neutral-800 rounded-md shadow-lg 
                       whitespace-nowrap z-20 opacity-0 group-hover:opacity-100 pointer-events-none 
                       transition-opacity duration-200"
          >
            {tech}
          </span>

          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className="w-6 h-6 object-contain"
          />
        </div>
      ))}
      {techIcons.length > 3 && (
        <div className="relative bg-black rounded-full p-1.5 border border-neutral-700 ml-0.5">
          <span className="text-xs text-white font-medium">
            +{techIcons.length - 3}
          </span>
        </div>
      )}
    </div>
  );
};

export default DisplayTechIcons;
