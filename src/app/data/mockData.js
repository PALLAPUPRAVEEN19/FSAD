export const mockSpecialists = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "Senior UX Architect",
    category: "Design",
    rating: 4.9,
    reviews: 124,
    demand: "Extreme",
    hourlyRate: 120,
    availability: "Available",
    img: "https://i.pravatar.cc/150?u=sarah",
    verified: true,
    responseTime: "< 1 hour",
    completionRate: 98,
    skills: [
      { name: "Visual Design", proficiency: 95 },
      { name: "User Research", proficiency: 88 },
      { name: "Prototyping", proficiency: 92 }
    ],
    badges: ["Top Rated", "Quick Responder", "Certified Pro"],
    location: "San Francisco, CA",
    yearsExperience: 12,
    completedProjects: 342
  },
  {
    id: 2,
    name: "Rajesh Patel",
    role: "Full Stack Architect",
    category: "Development",
    rating: 4.8,
    reviews: 98,
    demand: "High",
    hourlyRate: 95,
    availability: "Available",
    img: "https://i.pravatar.cc/150?u=rajesh",
    verified: true,
    responseTime: "< 2 hours",
    completionRate: 96,
    skills: [
      { name: "React & Node.js", proficiency: 98 },
      { name: "Cloud Architecture", proficiency: 85 },
      { name: "System Design", proficiency: 90 }
    ],
    badges: ["Expert", "Rising Star"],
    location: "New York, NY",
    yearsExperience: 10,
    completedProjects: 428
  }
];

export const mockJobs = [
  {
    id: "JOB-2891",
    title: "E-commerce Platform Redesign",
    client: "TechCorp Inc.",
    clientAvatar: "https://i.pravatar.cc/50?u=techcorp",
    status: "In Progress",
    priority: "High",
    deadline: "2026-03-15",
    budget: 12000,
    paid: 5000,
    progress: 65,
    category: "Design",
    description: "Complete redesign of checkout flow"
  },
  {
    id: "JOB-2890",
    title: "Mobile App Development",
    client: "StartupXYZ",
    clientAvatar: "https://i.pravatar.cc/50?u=startupxyz",
    status: "Active",
    priority: "Urgent",
    deadline: "2026-03-01",
    budget: 18000,
    paid: 8000,
    progress: 40,
    category: "Development",
    description: "React Native mobile app"
  }
];

export const mockTickets = [
  {
    id: "TKT-1047",
    user: "User_Sarah_K",
    userAvatar: "https://i.pravatar.cc/40?u=usersarah",
    issue: "Payment gateway timeout error",
    status: "Open",
    priority: "Critical",
    time: "3m ago",
    category: "Payment",
    description: "Transaction failed during checkout"
  }
];

export const mockReviews = [
  {
    id: 1,
    client: "Jennifer Martinez",
    clientAvatar: "https://i.pravatar.cc/40?u=jennifer",
    rating: 5,
    date: "2026-02-20",
    comment: "Outstanding work!",
    project: "Website Redesign",
    helpful: 24
  },
  {
    id: 2,
    client: "Robert Thompson",
    clientAvatar: "https://i.pravatar.cc/40?u=robert",
    rating: 5,
    date: "2026-02-18",
    comment: "Excellent communication.",
    project: "Mobile App Development",
    helpful: 18
  }
];

export const mockNotifications = [
  {
    id: 1,
    type: "job",
    title: "New job request",
    message: "TechCorp sent a proposal",
    time: "5m ago",
    read: false,
    icon: "briefcase"
  },
  {
    id: 2,
    type: "payment",
    title: "Payment received",
    message: "$3,400 deposited",
    time: "2h ago",
    read: true,
    icon: "wallet"
  }
];

export const mockEarningsData = [
  { month: "Aug", earnings: 4200, projects: 8 },
  { month: "Sep", earnings: 5200, projects: 11 },
  { month: "Oct", earnings: 4800, projects: 9 },
  { month: "Nov", earnings: 6900, projects: 14 },
  { month: "Dec", earnings: 6100, projects: 12 },
  { month: "Jan", earnings: 7200, projects: 16 },
  { month: "Feb", earnings: 6800, projects: 15 }
];

export const categories = [
  "All",
  "Design",
  "Development",
  "Marketing",
  "Management",
  "Business",
  "Finance"
];