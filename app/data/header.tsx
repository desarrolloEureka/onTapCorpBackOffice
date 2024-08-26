import { SearchableProps } from '@/types/header';
import dynamic from 'next/dynamic';
const Searchable = dynamic(() => import('react-searchable-dropdown'), {
  ssr: false,
});

export interface HeaderDropDownProps {
    fulScreen?: boolean;
    dark?: boolean;
    multiLingual?: boolean;
    notifications?: boolean;
    logOut?: () => void;
    setTheme: (e: any) => void;
    data: any;
}

export default function SelectOptions() {
  const searchableProps: SearchableProps = {
    value: 'test',
    placeholder: 'Choose one',
    notFoundText: 'No result found',
    noInput: true,
    options: [
      {
        value: 'Microsoft Project',
        label: 'Microsoft Project',
      },
      {
        value: 'Risk Management',
        label: 'Risk Management',
      },
      {
        value: 'business case',
        label: 'Business Case',
      },
      {
        value: 'team building',
        label: 'Team Building',
      },
      {
        value: 't-projects',
        label: 'T-Projects',
      },
    ],
    listMaxHeight: 140,
  };
  return (
    <div>
      <Searchable {...searchableProps} />
    </div>
  );
}

export const Notify = [
  {
    id: 1,
    online: 'avatar avatar-md online br-5',
    image: `/assets/images/faces/5.jpg`,
    text1: 'Congratulate',
    text2: 'Olivia James',
    text3: 'for New template start',
    date: 'Oct 15 12:32pm',
    status: '',
    bg: '',
    proid: '',
  },
  {
    id: 2,
    online: 'avatar avatar-md offline br-5',
    image: `/assets/images/faces/2.jpg`,
    text2: 'Joshua Gray ',
    text3: 'New Message Received',
    date: 'Oct 13 02:56am',
    status: '',
    bg: '',
    proid: '',
  },
  {
    id: 3,
    online: 'avatar avatar-md online br-5',
    image: `/assets/images/faces/3.jpg`,
    text2: 'Elizabeth Lewis ',
    text3: 'added new schedule realease',
    date: 'Oct 12 10:40pm',
    status: '',
    bg: '',
    proid: '',
  },
  {
    id: 4,
    online: 'avatar avatar-md online br-5',
    image: `/assets/images/faces/5.jpg`,
    text1: 'Delivered Successful to ',
    text2: 'Micky',
    status: 'Order ',
    bg: 'text-warning',
    proid: 'ID: #005428',
    date: ' had been placed ',
  },
  {
    id: 5,
    online: 'avatar avatar-md offline br-5',
    image: `/assets/images/faces/1.jpg`,
    text1: 'You got 22 requests form Facebook',
    text2: ' ',
    text3: '',
    status: ' ',
    bg: '',
    proid: '',
    date: 'Today at 08:08pm',
  },
];
