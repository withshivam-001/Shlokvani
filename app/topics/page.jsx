import React from 'react';
import { getAllTopics, getTopic } from '@/lib/gitaService';
import TopicsClient from './TopicsClient';

export const metadata = {
  title: 'विषय अनुसार गीता ज्ञान – Shlokvani Topics',
  description: 'जीवन की प्रत्येक चुनौती के लिए गीता के 13 प्रमुख विषय संग्रह: कर्म, धर्म, भक्ति, ध्यान, क्रोध नियंत्रण, तनाव प्रबंधन, नेतृत्व आदि।',
};

export default async function TopicsPage() {
  const rawTopics = await getAllTopics();

  // Hydrate each topic with its resolved verses
  const hydratedTopics = [];
  for (const t of rawTopics) {
    const full = await getTopic(t.id);
    if (full) hydratedTopics.push(full);
  }

  return (
    <TopicsClient topics={hydratedTopics} />
  );
}

