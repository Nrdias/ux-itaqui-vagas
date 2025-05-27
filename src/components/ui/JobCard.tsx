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
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">{title}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center mt-1 text-gray-600 text-sm sm:text-base">
              <span className="font-medium">{company}</span>
              <span className="hidden sm:inline mx-2">•</span>
              <span>{location}</span>
            </div>
          </div>
          
          {/* Tags Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full font-medium w-fit">
              {type}
            </span>
            {salary && (
              <span className="text-gray-600 text-sm sm:text-base font-medium">
                {salary}
              </span>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base line-clamp-3 leading-relaxed">
          {description}
        </p>
        
        {/* Footer Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-gray-100">
          <span className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
            Publicada em {postedAt}
          </span>
          <Link 
            href={`/vagas/${id}`} 
            className="btn btn-primary text-sm sm:text-base px-4 py-2 w-full sm:w-auto text-center order-1 sm:order-2"
          >
            Ver vaga
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard; 