export interface ContactForm {
    id: string;

    fullName: string;
    phoneNumber: string;
    email: string;
    district: string;
    state: string;
    familyIncome: string;

    institutionName: string;
    currentClass: string;
    stream: string;

    marks9th: string;
    marks10th: string;
    marks11th: string;
    marks12th: string;

    bachelorsDegree: string;
    bachelorsPercentage: string;
    bachelorsYearPercentages: string[];

    course: string;
    specialization: string;

    createdAt: string;
}