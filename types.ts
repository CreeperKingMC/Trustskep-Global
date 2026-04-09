
export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Education' | 'Innovation' | 'Career';
  link: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}
