import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface Pet {
  name: string;
  src: string;
  /** Resting tilt in degrees */
  tilt: number;
}

const pets: Pet[] = [
  { name: "Tommy", src: "/pets/tommy.jpg", tilt: -7 },
  { name: "Mini", src: "/pets/mini.jpg", tilt: 6 },
];

export default function PetPolaroids() {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    <div className="relative flex justify-center items-end gap-6 pt-4 pb-2 min-h-[140px]">
      {pets.map((pet) => {
        const isOpen = expanded === pet.name;
        return (
          <motion.button
            key={pet.name}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(isOpen ? null : pet.name);
            }}
            className="relative bg-white p-2 pb-5 shadow-md hover:shadow-lg cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]"
            initial={false}
            animate={{
              rotate: isOpen ? 0 : pet.tilt,
              scale: isOpen ? 1.8 : 1,
              y: isOpen ? -28 : 0,
              zIndex: isOpen ? 20 : 1,
              boxShadow: isOpen
                ? "0 20px 40px rgba(0,0,0,0.25)"
                : "0 4px 8px rgba(0,0,0,0.12)",
            }}
            whileHover={!isOpen ? { y: -4, rotate: 0 } : undefined}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            aria-label={isOpen ? `Collapse ${pet.name}'s photo` : `Show ${pet.name}'s photo`}
            aria-expanded={isOpen}
          >
            <img
              src={pet.src}
              alt={pet.name}
              className="w-20 h-20 object-cover block select-none pointer-events-none"
              loading="lazy"
              draggable={false}
            />
            <span className="absolute bottom-0.5 left-0 right-0 text-center text-[11px] italic text-gray-700 font-medium">
              {pet.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
