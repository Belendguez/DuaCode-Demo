import { useRef } from "react";

export default function Carousel({ images = [] }) {
  const containerRef = useRef(null);

  if (!images || images.length === 0) return null;

  const scrollByWidth = (direction = 1) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8; // 80% del contenedor
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative w-full flex items-center">

      {/* Contenedor scroll */}
      <div
        ref={containerRef}
        className="overflow-x-auto flex gap-4 py-2 px-2 scroll-smooth snap-x snap-mandatory"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-none w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 snap-center rounded-lg overflow-hidden"
          >
            <img
              src={img}
              alt={`Imagen ${i + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>

    </div>
  );
}