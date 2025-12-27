<template>
  <section class="py-20 md:py-32 bg-white">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-landing-text-main mb-8">
          Trusted by Educators and Learners Worldwide
        </h2>

        <!-- Tabs -->
        <div class="inline-flex bg-gray-100 p-1 rounded-lg mb-8">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            class="px-6 py-2 rounded-md text-sm font-medium transition-all"
            :class="
              activeTab === tab
                ? 'bg-white text-landing-blue shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            "
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in filteredTestimonials"
          :key="index"
          class="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex items-center gap-4 mb-6">
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 class="font-bold text-landing-text-main">{{ testimonial.name }}</h4>
              <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
            </div>
          </div>
          <p class="text-landing-text-body leading-relaxed italic">"{{ testimonial.quote }}"</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tabs = ['Student Reviews', 'Instructor Feedback', 'Learning Platform']
const activeTab = ref('Student Reviews')

const testimonials = [
  {
    category: 'Student Reviews',
    name: 'Sarah Johnson',
    role: 'UX Designer',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote:
      'The courses here completely transformed my career path. The practical projects gave me the confidence to apply for senior roles.',
  },
  {
    category: 'Student Reviews',
    name: 'Michael Chen',
    role: 'Software Engineer',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote:
      'I love the gamification features! They kept me motivated to finish the entire bootcamp, which is something I struggled with on other platforms.',
  },
  {
    category: 'Student Reviews',
    name: 'Emily Davis',
    role: 'Digital Marketer',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote:
      'The community support is unmatched. Whenever I got stuck, there was always someone ready to help out.',
  },
  {
    category: 'Instructor Feedback',
    name: 'Dr. Robert Wilson',
    role: 'Data Science Instructor',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote:
      'creator2ceo provides the best tools for creators. The analytics dashboard helps me understand exactly where my students are struggling.',
  },
  {
    category: 'Instructor Feedback',
    name: 'Amanda Lee',
    role: 'Business Coach',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote:
      'Monetizing my expertise has never been easier. The platform handles everything from payments to student management.',
  },
  {
    category: 'Instructor Feedback',
    name: 'James Carter',
    role: 'Photography Mentor',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote:
      'I was able to launch my course in days, not months. The course builder is intuitive and powerful.',
  },
  {
    category: 'Learning Platform',
    name: 'TechCrunch',
    role: 'Tech News',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    quote:
      'creator2ceo is revolutionizing the e-learning space with its focus on creator economy and student engagement.',
  },
  {
    category: 'Learning Platform',
    name: 'EdSurge',
    role: 'Education Technology',
    image:
      'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    quote:
      'A robust platform that balances the needs of educators and learners perfectly. The gamification elements are a game-changer.',
  },
  {
    category: 'Learning Platform',
    name: 'Forbes',
    role: 'Business',
    image:
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    quote:
      'One of the most promising ed-tech startups of the year. They are truly empowering creators to become CEOs.',
  },
]

const filteredTestimonials = computed(() => {
  return testimonials.filter((t) => t.category === activeTab.value)
})
</script>
