import React from "react";

interface NewsItemProps {
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  id: number;
}

export const NewsItem = ({
  id,
  title,
  description,
  date,
  imageUrl,
}: NewsItemProps) => {
  return (
    <div className="card shadow-md">
      <figure>
        <img src={imageUrl} className="w-full h-48 object-cover" alt={title} />
      </figure>
      <div className="card-body px-3 pb-3">
        <sup className="text-sm text-black/75 font-medium">{date}</sup>
        <h2 className="card-title line-clamp-1 text-lg">{title}</h2>
        <p className="line-clamp-1 text-md">{description}</p>
        <div className="card-actions justify-end">
          <a href={`/news/${id}`} className="btn btn-primary text-white w-full">
            Детальнее
          </a>
        </div>
      </div>
    </div>
  );
};
