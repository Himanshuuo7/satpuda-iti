import {
  CAMPUS_LABELS,
  CAMPUS_OPTIONS,
  GENDER_LABELS,
  QUALIFICATION_LABELS,
  STATUS_META,
  SUBJECT_LABELS,
  SUBJECT_OPTIONS,
  TRADE_LABELS,
  TRADE_OPTIONS,
  ageFrom,
  formatDate,
  formatDateTime,
} from './labels';

/**
 * One config per dashboard tab: which API resource it reads, the filters its
 * toolbar shows, the detail sections in the drawer and the CSV columns.
 * The table itself is rendered per tab in RecordsTable.
 */

export const RESOURCES = {
  admissions: {
    key: 'admissions',
    api: 'admissions',
    label: 'Admissions',
    singular: 'application',
    searchPlaceholder: 'Search name, phone, reference, district…',
    filters: [
      { name: 'trade', label: 'All trades', options: TRADE_OPTIONS },
      { name: 'campus', label: 'All campuses', options: CAMPUS_OPTIONS },
    ],
    title: (r) => r.fullName,
    subtitle: (r) => r.referenceNo,
    sections: [
      {
        title: 'Personal',
        fields: [
          ['Full name', (r) => r.fullName],
          ["Father's name", (r) => r.fatherName],
          [
            'Date of birth',
            (r) => (r.dateOfBirth ? `${formatDate(r.dateOfBirth)} (${ageFrom(r.dateOfBirth)} yrs)` : '—'),
          ],
          ['Gender', (r) => GENDER_LABELS[r.gender] ?? r.gender],
        ],
      },
      {
        title: 'Course preference',
        fields: [
          ['Trade', (r) => TRADE_LABELS[r.trade] ?? r.trade],
          ['Campus', (r) => CAMPUS_LABELS[r.campus] ?? r.campus],
        ],
      },
      {
        title: 'Education',
        fields: [
          ['Qualification', (r) => QUALIFICATION_LABELS[r.qualification] ?? r.qualification],
          ['Percentage', (r) => (r.percentage != null ? `${r.percentage}%` : '—')],
        ],
      },
      {
        title: 'Contact',
        fields: [
          ['Mobile', (r) => r.phone],
          ['Email', (r) => r.email || '—'],
          ['Address', (r) => r.address],
          ['District', (r) => r.district],
        ],
      },
    ],
    note: (r) => r.message,
    csv: [
      { header: 'Reference', value: (r) => r.referenceNo },
      { header: 'Submitted', value: (r) => formatDateTime(r.createdAt) },
      { header: 'Status', value: (r) => STATUS_META[r.status]?.label },
      { header: 'Full name', value: (r) => r.fullName },
      { header: "Father's name", value: (r) => r.fatherName },
      { header: 'Date of birth', value: (r) => formatDate(r.dateOfBirth) },
      { header: 'Gender', value: (r) => GENDER_LABELS[r.gender] },
      { header: 'Mobile', value: (r) => r.phone },
      { header: 'Email', value: (r) => r.email },
      { header: 'Qualification', value: (r) => QUALIFICATION_LABELS[r.qualification] },
      { header: 'Percentage', value: (r) => r.percentage },
      { header: 'Trade', value: (r) => TRADE_LABELS[r.trade] },
      { header: 'Campus', value: (r) => CAMPUS_LABELS[r.campus] },
      { header: 'Address', value: (r) => r.address },
      { header: 'District', value: (r) => r.district },
      { header: 'Message', value: (r) => r.message },
    ],
  },

  contacts: {
    key: 'contacts',
    api: 'contact',
    label: 'Contact enquiries',
    singular: 'enquiry',
    searchPlaceholder: 'Search name, phone, email, message…',
    filters: [{ name: 'subject', label: 'All subjects', options: SUBJECT_OPTIONS }],
    title: (r) => r.name,
    subtitle: (r) => SUBJECT_LABELS[r.subject] ?? r.subject,
    sections: [
      {
        title: 'Enquiry',
        fields: [
          ['Name', (r) => r.name],
          ['Subject', (r) => SUBJECT_LABELS[r.subject] ?? r.subject],
          ['Mobile', (r) => r.phone],
          ['Email', (r) => r.email || '—'],
        ],
      },
    ],
    note: (r) => r.message,
    noteLabel: 'Message',
    csv: [
      { header: 'Submitted', value: (r) => formatDateTime(r.createdAt) },
      { header: 'Status', value: (r) => STATUS_META[r.status]?.label },
      { header: 'Name', value: (r) => r.name },
      { header: 'Mobile', value: (r) => r.phone },
      { header: 'Email', value: (r) => r.email },
      { header: 'Subject', value: (r) => SUBJECT_LABELS[r.subject] },
      { header: 'Message', value: (r) => r.message },
    ],
  },
};
