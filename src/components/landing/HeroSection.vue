<template>
  <section class="relative bg-landing-blue pt-20 pb-32 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
    <div
      class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"
    ></div>

    <div class="max-w-[1200px] mx-auto px-6 relative z-10">
      <div class="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
          From Creator to CEO
        </h1>
        <p class="text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
          Transform your creative passion into a scalable business. Join a community of creators who
          are building the next generation of media companies.
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-4">
          <button
            class="bg-white text-landing-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5"
          >
            Get Started
          </button>
          <button
            class="px-8 py-4 rounded-lg font-bold text-lg text-white border-2 border-white/30 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clip-rule="evenodd"
              />
            </svg>
            Watch Demo
          </button>
        </div>
      </div>

      <!-- Hero Image -->
      <div class="relative max-w-5xl mx-auto">
        <div class="relative rounded-[24px] overflow-hidden shadow-2xl shadow-blue-900/40 group">
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
          <!-- Placeholder for Hero Image - using a div with color for now, will be replaced by img -->
          <div class="w-full aspect-[16/9] bg-gray-200 relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
              alt="Students learning"
              class="w-full h-full object-cover"
            />
            <!-- Play Button Overlay -->
            <div class="absolute inset-0 flex items-center justify-center z-20">
              <button
                class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/50"
              >
                <div
                  class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 text-landing-blue ml-1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Stats Floating Card (Optional addition for "Stats" requirement) -->
        <div
          class="hidden md:flex absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl p-6 items-center gap-12 z-30 w-max"
        >
          <div class="text-center">
            <p class="text-2xl font-bold text-landing-text-main">1,200+</p>
            <p class="text-sm text-landing-text-body font-medium">Businesses</p>
          </div>
          <div class="w-px h-10 bg-gray-100"></div>
          <div class="text-center">
            <p class="text-2xl font-bold text-landing-text-main">$50M+</p>
            <p class="text-sm text-landing-text-body font-medium">Revenue</p>
          </div>
          <div class="w-px h-10 bg-gray-100"></div>
          <div class="text-center">
            <p class="text-2xl font-bold text-landing-text-main">500+</p>
            <p class="text-sm text-landing-text-body font-medium">CEOs</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this static component yet
</script>
