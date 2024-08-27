'use client'

import Header from '@/components/ies/ui/header';
import Propostions from '@/components/ies/ui/propositions';

export default function Home() {
  const name = "Mohamed Hani";
  const role = "Admin";

  const data = {
    nodes: [
      { id: 'Impact of Smoking on Health' },
      { id: 'Risks of Excessive Computer Use' },
      { id: 'Understanding Mental Health' },
      { id: 'Benefits of Regular Exercise' },
      { id: 'Healthy Eating Habits' },
      { id: 'Overcoming Addiction Challenges' },
      { id: 'Effects of Social Media on Well-being' },
      { id: 'Managing Stress Effectively' },
      { id: 'Importance of Quality Sleep' }
    ],
    links: [
      { source: 'Impact of Smoking on Health', target: 'Understanding Mental Health', value: 2 },
      { source: 'Risks of Excessive Computer Use', target: 'Understanding Mental Health', value: 1 },
      { source: 'Understanding Mental Health', target: 'Managing Stress Effectively', value: 3 },
      { source: 'Benefits of Regular Exercise', target: 'Understanding Mental Health', value: 2 },
      { source: 'Healthy Eating Habits', target: 'Understanding Mental Health', value: 2 },
      { source: 'Overcoming Addiction Challenges', target: 'Understanding Mental Health', value: 1 },
      { source: 'Effects of Social Media on Well-being', target: 'Managing Stress Effectively', value: 2 },
      { source: 'Importance of Quality Sleep', target: 'Understanding Mental Health', value: 3 }
    ]
  };
  return (
    <>
      <Header name={name} role={role} />
      <div style={{ paddingTop: '70px' }}>
        <Propostions toDashboard="/ies/admin" data={data} />
      </div>
    </>
  );
}
