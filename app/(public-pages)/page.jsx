'use client';

import CallToAction from '@/sections/call-to-action';
import FaqSection from '@/sections/faq-section';
import Features from '@/sections/features';
import HeroSection from '@/sections/hero-section';
import PricingPlans from '@/sections/pricing-plans';
import Testimonials from '@/sections/testimonials';
import WorkflowSteps from '@/sections/workflow-steps';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Page() {
    
    return (
        <main className='px-4'>
            <HeroSection />
            <Features />
            <WorkflowSteps />
            <Testimonials />
            <FaqSection />
            <PricingPlans />
            <CallToAction />
        </main>
    );
}
