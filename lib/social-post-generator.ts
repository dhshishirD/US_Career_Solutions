import { JobPosting } from './types';
import { ScholarshipProgram, SCHOLARSHIPS_DATA } from './scholarships-data';
import { SAMPLE_JOBS } from './jobs-data';

export interface SocialSlot {
  slotId: string;
  timeLabel: string;
  theme: 'Morning Remote Job Drop' | 'Midday Scholarship Spotlight' | 'Evening Visa & Tech Role' | 'Night Career Tip';
  title: string;
  copyText: string;
  directUrl: string;
  isPublishedToday: boolean;
}

export function generateDailySocialSlots(): SocialSlot[] {
  const job1 = SAMPLE_JOBS[0]; // Customer Support
  const job2 = SAMPLE_JOBS[1]; // AI Annotator
  const scholarship = SCHOLARSHIPS_DATA[0]; // Stanford / Purdue

  return [
    {
      slotId: 'slot-morning',
      timeLabel: '🌅 Morning Drop (09:00 AM)',
      theme: 'Morning Remote Job Drop',
      title: `${job1.title} — ${job1.company}`,
      copyText: `🔥 NEW VERIFIED US REMOTE JOB DROP! 🇺🇸💰

Looking for an international work-from-home job paid in USD? Top US company ${job1.company} is hiring worldwide!

💼 Role: ${job1.title}
💵 Compensation: ${job1.salaryMin ? `$${job1.salaryMin.toLocaleString()} - $${job1.salaryMax?.toLocaleString()} USD/year` : '$45,000 - $65,000 USD/year'}
🌍 Location: 100% Remote (Work from Anywhere / W-8BEN)
✅ Visa Needed: No US Work Visa Required!

👉 Direct Apply & Check Job Requirements:
🔗 https://www.uscareersolutions.online/jobs

📄 Need your CV converted into the 1-Page US ATS format to pass recruiter filters? Check your score for free with our AI ATS Scanner:
🔗 https://www.uscareersolutions.online/tools/ats-scanner

#RemoteJobs #JobsInUSA #WorkFromHome #EarnInUSD #CustomerSupport #USCareerSolutions`,
      directUrl: 'https://www.uscareersolutions.online/jobs',
      isPublishedToday: false
    },
    {
      slotId: 'slot-midday',
      timeLabel: '☀️ Midday Spotlight (02:00 PM)',
      theme: 'Midday Scholarship Spotlight',
      title: `${scholarship.university} — ${scholarship.programName}`,
      copyText: `🎓 STUDY IN THE USA — 100% FULLY FUNDED SCHOLARSHIP SPOTLIGHT! 🇺🇸✨

Did you know US universities provide full tuition waivers plus a monthly living salary for international Master's & PhD students?

🏛️ University: ${scholarship.university}
🏆 Program: ${scholarship.programName}
💰 Funding Breakdown:
• 100% Full Tuition Waiver ($0 Tuition!)
• ${scholarship.stipendMonthlyUSD} Monthly Living Paycheck (${scholarship.stipendAnnualUSD}/year)
• Comprehensive Health Insurance Included

📋 Requirements & Deadlines:
• Degree Level: ${scholarship.degreeLevel}
• Minimum GPA: ${scholarship.minGPA} | IELTS/TOEFL Accepted
• Deadline: ${scholarship.deadlineText}

👉 View Full Details & Professor Outreach Guidelines:
🔗 https://www.uscareersolutions.online/scholarships

💬 Need 1-on-1 guidance drafting your Statement of Purpose (SOP) or emailing US professors? Message our career team on WhatsApp: +880 1981-505761

#StudyInUSA #USAScholarships #FullyFunded #MastersInUSA #PhDinUSA #HigherEducation #USCareerSolutions`,
      directUrl: 'https://www.uscareersolutions.online/scholarships',
      isPublishedToday: false
    },
    {
      slotId: 'slot-evening',
      timeLabel: '🌆 Evening Drop (08:00 PM)',
      theme: 'Evening Visa & Tech Role',
      title: `${job2.title} — ${job2.company}`,
      copyText: `⚡ VERIFIED ENTRY-LEVEL OPPORTUNITY — FLEXIBLE HOURS! 🇺🇸

Top US AI firm ${job2.company} is hiring international candidates for entry-level model training and quality review!

💼 Role: ${job2.title}
💵 Pay: ${job2.salaryMin ? `$${job2.salaryMin.toLocaleString()} - $${job2.salaryMax?.toLocaleString()} USD/year` : '$32,000 - $52,000 USD/year'} (Flexible / Freelance hours)
🌍 Eligibility: Open Worldwide (Global Contractor W-8BEN)
🎯 Skills: Good written English, fact checking, analytical attention to detail.

👉 Apply Directly on our Portal:
🔗 https://www.uscareersolutions.online/jobs

👥 Want US recruiters to find you directly? Publish your anonymous candidate pitch on our Community Talent Board (100% Free):
🔗 https://www.uscareersolutions.online/talent

#AITraining #RemoteWork #EntryLevelJobs #FreelanceUSD #JobsInUSA #USCareerSolutions`,
      directUrl: 'https://www.uscareersolutions.online/jobs',
      isPublishedToday: false
    }
  ];
}
