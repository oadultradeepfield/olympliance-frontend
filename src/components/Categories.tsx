import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      emoji: "📚",
      title: "General",
      description: "Random Questions",
    },
    {
      id: 2,
      emoji: "🧮",
      title: "Mathematics",
      description: "Preparing for IMO",
    },
    {
      id: 3,
      emoji: "⚛️",
      title: "Physics",
      description: "Preparing for IPhO",
    },
    {
      id: 4,
      emoji: "🧪",
      title: "Chemistry",
      description: "Preparing for IChO",
    },
    {
      id: 5,
      emoji: "💻",
      title: "Informatics",
      description: "Preparing for IOI",
    },
    {
      id: 6,
      emoji: "🔬",
      title: "Biology",
      description: "Preparing for IBO",
    },
    {
      id: 7,
      emoji: "🤯",
      title: "Philosophy",
      description: "Preparing for IPO",
    },
    {
      id: 8,
      emoji: "🪐",
      title: "Astronomy",
      description: "Preparing for IOAA",
    },
    {
      id: 9,
      emoji: "🌏",
      title: "Geography",
      description: "Preparing for iGeo",
    },
    {
      id: 10,
      emoji: "💬",
      title: "Linguistics",
      description: "Preparing for IOL",
    },
    {
      id: 11,
      emoji: "🗿",
      title: "Earth Science",
      description: "Preparing for IESO",
    },
  ];

  return (
    <div className="container mx-auto mb-12 px-6 py-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {categories.map((category) => (
          <Link to={`/${category.title.toLowerCase()}`}>
            <div
              key={category.id}
              className={
                "card transform border-2 transition-all duration-300 hover:border-secondary hover:text-secondary"
              }
            >
              <div className="card-body items-center text-center">
                <div className="mb-4 flex h-16 w-24 items-center justify-center rounded-full text-6xl">
                  {category.emoji}
                </div>
                <h3 className="card-title mb-2 text-xl font-semibold">
                  {category.title}
                </h3>
                <p className="text-base-3-content">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
