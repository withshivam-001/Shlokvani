import React from 'react';
import BrandedLoader from '@/components/BrandedLoader';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <BrandedLoader message="ज्ञान का प्रकाश उद्घाटित हो रहा है... (Unveiling Sacred Wisdom)" />
    </div>
  );
}

