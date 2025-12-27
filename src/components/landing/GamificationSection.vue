<template>
  <section class="py-20 md:py-32 bg-landing-bg overflow-hidden">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        <!-- Left: Image -->
        <div class="w-full lg:w-1/2 relative">
          <div
            class="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500"
          >
            <div class="bg-white p-2">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"
                alt="Dashboard Mockup"
                class="w-full h-auto rounded-xl border border-gray-100"
              />
            </div>
          </div>
          <!-- Decorative elements -->
          <div
            class="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          ></div>
          <div
            class="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          ></div>
        </div>

        <!-- Right: Content -->
        <div class="w-full lg:w-1/2">
          <h2 class="text-3xl md:text-4xl font-bold text-landing-text-main mb-6">
            Make Learning More Engaging with Our Gamification Features
          </h2>
          <p class="text-lg text-landing-text-body mb-8">
            Keep your students motivated and tracking their progress with our built-in gamification
            tools designed to boost completion rates.
          </p>

          <div class="space-y-6">
            <div class="flex items-start gap-4 group">
              <div
                class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-landing-blue transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-4 h-4 text-landing-blue group-hover:text-white transition-colors"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-landing-text-main mb-1">
                  Interactive Challenges
                </h4>
                <p class="text-landing-text-body text-sm">
                  Create quizzes and assignments that reward students instantly.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4 group">
              <div
                class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-landing-blue transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-4 h-4 text-landing-blue group-hover:text-white transition-colors"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-landing-text-main mb-1">Badges & Rewards</h4>
                <p class="text-landing-text-body text-sm">
                  Issue certificates and badges upon course completion.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4 group">
              <div
                class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-landing-blue transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-4 h-4 text-landing-blue group-hover:text-white transition-colors"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-landing-text-main mb-1">Progress Tracking</h4>
                <p class="text-landing-text-body text-sm">
                  Visual progress bars help students stay on track.
                </p>
              </div>
            </div>
          </div>

          <a
            href="#"
            class="inline-flex items-center gap-2 text-landing-blue font-bold mt-10 hover:gap-3 transition-all"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
