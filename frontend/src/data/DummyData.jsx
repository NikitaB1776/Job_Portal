// Dummy data for jobs
export const DUMMY_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    description: 'Looking for an experienced React developer to join our team',
    location: 'San Francisco, CA',
    salary: '$120,000 - $160,000',
    type: 'Full-time',
    status: 'Active',
    posted: '2024-01-15',
    applicants: 24
  },
  {
    id: 2,
    title: 'UX Designer',
    description: 'Create beautiful and intuitive user experiences',
    location: 'New York, NY',
    salary: '$90,000 - $130,000',
    type: 'Full-time',
    status: 'Active',
    posted: '2024-01-20',
    applicants: 18
  },
  {
    id: 3,
    title: 'Backend Engineer',
    description: 'Build scalable APIs and microservices',
    location: 'Remote',
    salary: '$110,000 - $150,000',
    type: 'Full-time',
    status: 'Closed',
    posted: '2024-01-10',
    applicants: 32
  }
];

// Dummy data for applicants
export const DUMMY_APPLICANTS = [
  {
    id: 1,
    jobId: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    appliedDate: '2024-01-16',
    status: 'Under Review',
    resume: 'john_doe_resume.pdf'
  },
  {
    id: 2,
    jobId: 1,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 234-5678',
    appliedDate: '2024-01-17',
    status: 'Shortlisted',
    resume: 'jane_smith_resume.pdf'
  },
  {
    id: 3,
    jobId: 1,
    name: 'Mike Johnson',
    email: 'mike.j@example.com',
    phone: '(555) 345-6789',
    appliedDate: '2024-01-18',
    status: 'Under Review',
    resume: 'mike_johnson_resume.pdf'
  },
  {
    id: 4,
    jobId: 2,
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    phone: '(555) 456-7890',
    appliedDate: '2024-01-21',
    status: 'Shortlisted',
    resume: 'sarah_williams_resume.pdf'
  },
  {
    id: 5,
    jobId: 2,
    name: 'David Brown',
    email: 'david.b@example.com',
    phone: '(555) 567-8901',
    appliedDate: '2024-01-22',
    status: 'Rejected',
    resume: 'david_brown_resume.pdf'
  }
];
