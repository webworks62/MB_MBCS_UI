import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  courseTypes: CourseType[] = [
    {
      id: 1,
      type: 'Engineering & Tech',
      duration: '3–4 Years',
      courses: [
        { id: 1, name: 'B.Tech / B.E. (Engineering)', description: 'Undergraduate tech degree with various specializations like CSE, ECE, Mechanical, Civil, Aerospace, AI, Data Science.' },
        { id: 2, name: 'B.Arch (Architecture)', description: '5-year architecture degree focusing on building design, planning, and urban development.' },
        { id: 3, name: 'BCA (Computer Applications)', description: '3-year degree focusing on software development, programming, and IT fundamentals.' },
        { id: 4, name: 'B.Sc in Computer Science', description: 'Undergraduate degree with an emphasis on computing, algorithms, and systems.' },
        { id: 5, name: 'B.Sc in Data Science / Analytics', description: 'Focuses on data analysis, statistics, predictive modeling and big data concepts.' },
      ],
    },
    {
      id: 2,
      type: 'Medical & Allied Health',
      duration: '3–5 Years',
      courses: [
        { id: 1, name: 'MBBS (Medical)', description: 'Bachelor of Medicine and Bachelor of Surgery — primary medical qualification in India.' },
        { id: 2, name: 'BDS (Dental Surgery)', description: 'Undergraduate dental degree for oral health and surgery careers.' },
        { id: 3, name: 'B.Pharm (Pharmacy)', description: '4-year undergraduate degree focused on pharmaceuticals and drug development.' },
        { id: 4, name: 'B.Sc Nursing', description: 'Undergraduate nursing degree in patient care and healthcare practices.' },
        { id: 5, name: 'BHMS / BAMS / BUMS / BNYS', description: 'Undergraduate degrees in alternative medicine — Homeopathy, Ayurveda, Unani, Naturopathy.' },
      ],
    },
    {
      id: 3,
      type: 'Commerce & Finance',
      duration: '3–5 Years',
      courses: [
        { id: 1, name: 'B.Com (Commerce)', description: 'Bachelor of Commerce degree in accounting, finance, tax and business law.' },
        { id: 2, name: 'BBA (Business Administration)', description: 'Undergraduate degree in business management, marketing, HR, and entrepreneurship.' },
        { id: 3, name: 'Chartered Accountancy (CA)', description: 'Professional finance qualification leading to auditing, accounting and taxation roles.' },
        { id: 4, name: 'Company Secretary (CS)', description: 'Professional certification focused on corporate compliance and governance.' },
        { id: 5, name: 'Bachelor of Financial Markets (BFM)', description: 'Undergraduate program in financial markets, investment and risk management.' },
      ],
    },
    {
      id: 4,
      type: 'Arts & Humanities',
      duration: '3–5 Years',
      courses: [
        { id: 1, name: 'BA (Bachelor of Arts)', description: 'Undergraduate degree with majors like history, sociology, English, psychology, political science.' },
        { id: 2, name: 'BJMC (Journalism & Mass Communication)', description: 'Focuses on media, journalism, PR, and communication skills.' },
        { id: 3, name: 'B.Des (Design)', description: 'Bachelor of Design in fashion, product, interior or graphic design.' },
        { id: 4, name: 'Integrated BA LLB / BBA LLB / BCom LLB', description: '5-year integrated law program combining arts or business with law.' },
        { id: 5, name: 'BA Psychology / Foreign Languages', description: 'Specialist arts degrees focusing on behavioral science and language studies.' },
      ],
    },
    {
      id: 5,
      type: 'Diploma & Skill Courses',
      duration: '6 Months–3 Years',
      courses: [
        { id: 1, name: 'Diploma in Engineering (Polytechnic)', description: 'Technical diploma in mechanical, civil, electrical, computer or automobile engineering.' },
        { id: 2, name: 'Diploma in Computer Applications (IT)', description: 'Short course in web development, programming or software tools.' },
        { id: 3, name: 'Diploma in Digital Marketing', description: 'Professional course in online marketing, SEO, and social media strategies.' },
        { id: 4, name: 'Diploma in Hotel & Hospitality Management', description: 'Training in hotel operations, travel management, and customer service.' },
        { id: 5, name: 'Diploma in Medical Lab Tech (DMLT)', description: 'Healthcare diploma focusing on pathological testing and diagnostics.' },
      ],
    },
  ];
}

interface CourseType {
  id: number;
  type: string;
  duration: string;
  courses: Course[];
}

interface Course {
  id: number;
  name: string;
  description: string;
}
