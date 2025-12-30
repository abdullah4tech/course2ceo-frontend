<script setup lang="ts">
import LandingNavbar from '@/components/landing/LandingNavbar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import WhySection from '@/components/landing/WhySection.vue'
import GamificationSection from '@/components/landing/GamificationSection.vue'
import CourseGridSection from '@/components/landing/CourseGridSection.vue'
import NewFeaturesSection from '@/components/landing/NewFeaturesSection.vue'
import TestimonialsSection from '@/components/landing/TestimonialsSection.vue'
import FinalCTASection from '@/components/landing/FinalCTASection.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
</script>

<template>
  <div class="min-h-screen font-sans">
    <LandingNavbar />
    <main>
      <HeroSection />
      <WhySection />
      <GamificationSection />
      <TestimonialsSection />
      <FinalCTASection />
    </main>
    <LandingFooter />
  </div>
</template>
