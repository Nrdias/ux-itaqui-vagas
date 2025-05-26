import React from 'react';
import Link from 'next/link';

interface CompanyCardProps {
  id: string;
  name: string;
  description: string;
  sector: string;
  location: string;
  size: string;
  website?: string;
  jobCount: number;
}

const CompanyCard = ({
  id,
  name,
  description,
  sector,
  location,
  size,
  website,
  jobCount,
}: CompanyCardProps) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
          <div className="text-2xl font-medium text-gray-400">
            {name.charAt(0)}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-900">{name}</h3>
          <div className="text-gray-600">{location}</div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
          {sector}
        </span>
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
          {size}
        </span>
        <span className="inline-block px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
          {jobCount} {jobCount === 1 ? 'vaga' : 'vagas'}
        </span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        {website && (
          <a 
            href={website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary sm:flex-1 text-center"
          >
            Site
          </a>
        )}
        <Link 
          href={`/empresas/${id}/vagas`} 
          className="btn btn-primary sm:flex-1 text-center"
        >
          Ver vagas
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard; 