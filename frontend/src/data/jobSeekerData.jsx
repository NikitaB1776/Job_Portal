// Mock job listings data
export const MOCK_JOBS = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description: 'We are looking for a senior React developer to join our growing team. You will be responsible for building scalable web applications.',
    requirements: '5+ years of React experience, TypeScript, Redux',
    postedDate: '2024-02-01',
    logo: '🏢',
    featured: true
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Creative Studios',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90,000 - $130,000',
    description: 'Join our design team to create beautiful and intuitive user experiences for our clients.',
    requirements: 'Portfolio required, Figma, Adobe XD, 3+ years experience',
    postedDate: '2024-02-03',
    logo: '🎨',
    featured: false
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100,000 - $140,000',
    description: 'Build amazing products from scratch. Work on both frontend and backend technologies.',
    requirements: 'Node.js, React, MongoDB, Docker',
    postedDate: '2024-02-05',
    logo: '💻',
    featured: true
  },
  {
    id: 4,
    title: 'Data Analyst',
    company: 'Analytics Pro',
    location: 'Austin, TX',
    type: 'Part-time',
    salary: '$60,000 - $80,000',
    description: 'Analyze data and provide insights to drive business decisions.',
    requirements: 'SQL, Python, Excel, 2+ years experience',
    postedDate: '2024-02-06',
    logo: '📊',
    featured: false
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech Inc',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$110,000 - $150,000',
    description: 'Manage and optimize our cloud infrastructure and CI/CD pipelines.',
    requirements: 'AWS, Kubernetes, Docker, Terraform',
    postedDate: '2024-02-07',
    logo: '☁️',
    featured: false
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description: 'Lead product strategy and roadmap for our flagship products.',
    requirements: '5+ years PM experience, Agile, Strategic thinking',
    postedDate: '2024-02-08',
    logo: '🚀',
    featured: true
  }
];

// Mock applied jobs data
export const MOCK_APPLIED_JOBS = [
  {
    id: 1,
    jobId: 1,
    title: 'Senior React Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    appliedDate: '2024-02-10',
    status: 'Under Review',
    logo: '🏢'
  },
  {
    id: 2,
    jobId: 3,
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    appliedDate: '2024-02-09',
    status: 'Interview Scheduled',
    logo: '💻'
  },
  {
    id: 3,
    jobId: 6,
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'Boston, MA',
    appliedDate: '2024-02-08',
    status: 'Rejected',
    logo: '🚀'
  }
];

// Mock user profile data
export const MOCK_USER_PROFILE = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  title: 'Senior Software Engineer',
  bio: 'Passionate software engineer with 8+ years of experience in building scalable web applications.',
  skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'],
  experience: [
    {
      id: 1,
      position: 'Senior Software Engineer',
      company: 'Tech Company Inc',
      duration: '2020 - Present',
      description: 'Leading frontend development team'
    },
    {
      id: 2,
      position: 'Software Engineer',
      company: 'StartUp Co',
      duration: '2017 - 2020',
      description: 'Full stack development'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'Bachelor of Computer Science',
      institution: 'University of California',
      year: '2017'
    }
  ],
  resume: 'john_doe_resume.pdf'
};