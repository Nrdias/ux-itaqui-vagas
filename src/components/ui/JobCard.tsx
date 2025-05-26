import Link from 'next/link';
import React from 'react';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedAt: string;
  description: string;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  type,
  salary,
  postedAt,
  description,
}: JobCardProps) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-medium text-gray-900">{title}</h3>
          <div className="flex items-center mt-1 text-gray-600">
            <span>{company}</span>
            <span className="mx-2">•</span>
            <span>{location}</span>
          </div>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
            {type}
          </span>
          {salary && (
            <span className="inline-block ml-2 text-gray-600">
              {salary}
            </span>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 line-clamp-3 mb-4">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Publicada em {postedAt}
        </span>
        <Link href={`/vagas/${id}`} className="btn btn-primary">
          Ver vaga
        </Link>
      </div>
    </div>
  );
};

export default JobCard; 