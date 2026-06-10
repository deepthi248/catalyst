export interface Job  {
    id:string;
    companyName:string;
    role:string;
    url:string;
    status:"applied" |  "interviewing" | "offered" | "rejected";
    notes:string;
    createdAt: Date;
}




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
]