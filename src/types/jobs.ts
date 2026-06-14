export interface Job  {
    id:string;
    companyName:string;
    role:string;
    url:string;
    status:"applied" |  "interviewing" | "offered" | "rejected";
    notes:string;
    createdAt: Date;
}

export const COLUMN_CONFIG = [
  { id: 'applied',      label: 'Applied' },
  { id: 'interviewing', label: 'Interviewing' },
  { id: 'offered',      label: 'Offered' },
  { id: 'rejected',     label: 'Rejected' },
]


export const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    companyName: 'Stripe',
    role: 'Frontend Engineer',
    url: 'https://stripe.com/jobs/123',
    status: 'applied',
    notes: 'Applied via LinkedIn. Heard good things about the team.',
    createdAt: new Date("2026-03-25"),
  },
  {
    id: '2',
    companyName: 'Razorpay',
    role: 'Full Stack Developer',
    url: 'https://razorpay.com/jobs/456',
    status: 'interviewing',
    notes: 'First round done. System design round scheduled next week.',
    createdAt:  new Date("2026-03-25"),
  },
  {
    id: '3',
    companyName: 'Zepto',
    role: 'React Developer',
    url: 'https://zepto.com/jobs/789',
    status: 'offered',
    notes: 'Got rejected after round 2. Feedback was weak on DSA.',
    createdAt:  new Date("2026-03-25"),
  },
  {
    id: '4',
    companyName: 'Razorpay',
    role: 'Full Stack Developer',
    url: 'https://razorpay.com/jobs/456',
    status: 'rejected',
    notes: 'First round done. System design round scheduled next week.',
    createdAt:  new Date("2026-03-25"),
  },{
    id: '5',
    companyName: 'Swiggy',
    role: 'Senior Frontend Engineer',
    url: 'https://swiggy.com/jobs/5',
    status: 'interviewing',
    notes: 'Recruiter reached out on LinkedIn. First round scheduled for next week.',
    createdAt: new Date('2024-01-22'),
  },
  {
    id: '6',
    companyName: 'CRED',
    role: 'React Developer',
    url: 'https://cred.club/jobs/6',
    status: 'offered',
    notes: 'Got the offer! Package is good. Deciding between this and Razorpay.',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '7',
    companyName: 'Meesho',
    role: 'UI Engineer',
    url: 'https://meesho.com/jobs/7',
    status: 'rejected',
    notes: 'Rejected after round 3. Feedback was weak system design knowledge.',
    createdAt: new Date('2024-01-28'),
  },
  {
    id: '8',
    companyName: 'PhonePe',
    role: 'Full Stack Developer',
    url: 'https://phonepe.com/jobs/8',
    status: 'applied',
    notes: 'Applied through their careers page. Waiting to hear back.',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '9',
    companyName: 'Groww',
    role: 'Frontend Engineer',
    url: 'https://groww.in/jobs/9',
    status: 'interviewing',
    notes: 'Two rounds done. Final round with the engineering manager tomorrow.',
    createdAt: new Date('2024-02-03'),
  },
]



export const getBadgeColor =(status:string)=> {
    let card_color = ""
    
    switch (status){
        case 'applied':
            card_color ="purple"
            break;
            case 'interviewing':
            card_color ="amber"
            break;
            case 'offered':
            card_color ="good"
            break;
            case 'rejected':
            card_color ="red"
    }
    return card_color;
}