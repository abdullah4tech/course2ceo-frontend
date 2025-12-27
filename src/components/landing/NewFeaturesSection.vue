<template>
  <section class="py-20 md:py-32 bg-gradient-to-br from-white to-blue-50">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        <!-- Left: Image -->
        <div class="w-full lg:w-1/2 order-2 lg:order-1">
          <div class="relative">
            <div class="absolute inset-0 bg-landing-blue rounded-2xl rotate-3 opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="New Features"
              class="relative z-10 rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>

        <!-- Right: Content -->
        <div class="w-full lg:w-1/2 order-1 lg:order-2">
          <span class="text-landing-blue font-bold tracking-wider text-sm uppercase mb-2 block"
            >Innovation</span
          >
          <h2 class="text-3xl md:text-4xl font-bold text-landing-text-main mb-6">
            Unlock New Features That Make Learning More Accessible and Effective
          </h2>
          <p class="text-lg text-landing-text-body mb-8">
            Our latest update brings powerful tools designed to help you scale your educational
            content globally.
          </p>

          <ul class="space-y-4 mb-10">
            <li class="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-green-500 flex-shrink-0"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-landing-text-body"
                ><strong>AI-Powered Subtitles:</strong> Automatically generate subtitles in 30+
                languages.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-green-500 flex-shrink-0"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-landing-text-body"
                ><strong>Offline Mode:</strong> Students can download courses and learn
                anywhere.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-green-500 flex-shrink-0"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-landing-text-body"
                ><strong>Community Hub:</strong> Built-in forums for student engagement.</span
              >
            </li>
          </ul>

          <button
            class="px-8 py-3 rounded-lg font-bold text-white bg-landing-text-main hover:bg-landing-blue transition-all shadow-lg hover:shadow-xl"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
