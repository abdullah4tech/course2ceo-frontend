<template>
  <section class="py-20 md:py-32 bg-white" id="courses">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-landing-text-main mb-4">
          Explore Courses with creator2ceo
        </h2>
        <p class="text-lg text-landing-text-body">
          Discover top-rated courses from industry experts.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Course Card 1 -->
        <div
          class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
              alt="Course Thumbnail"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div
              class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-landing-blue"
            >
              Bestseller
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-landing-blue bg-blue-50 px-2 py-1 rounded"
                >Business</span
              >
              <span class="text-xs text-gray-500 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-3 h-3 text-yellow-400"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
                4.9 (1.2k)
              </span>
            </div>
            <h3
              class="text-xl font-bold text-landing-text-main mb-2 line-clamp-2 group-hover:text-landing-blue transition-colors"
            >
              Digital Marketing Mastery: From Zero to Hero
            </h3>
            <div class="flex items-center gap-2 mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Instructor"
                class="w-6 h-6 rounded-full"
              />
              <span class="text-sm text-landing-text-body">Alex Morgan</span>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="text-lg font-bold text-landing-blue">$49.99</div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  12k
                </span>
                <span class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  12h
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Course Card 2 -->
        <div
          class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
              alt="Course Thumbnail"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded"
                >Technology</span
              >
              <span class="text-xs text-gray-500 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-3 h-3 text-yellow-400"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
                4.8 (850)
              </span>
            </div>
            <h3
              class="text-xl font-bold text-landing-text-main mb-2 line-clamp-2 group-hover:text-landing-blue transition-colors"
            >
              Full Stack Web Development Bootcamp
            </h3>
            <div class="flex items-center gap-2 mb-4">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Instructor"
                class="w-6 h-6 rounded-full"
              />
              <span class="text-sm text-landing-text-body">Sarah Chen</span>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="text-lg font-bold text-landing-blue">$89.99</div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  8.5k
                </span>
                <span class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  48h
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Course Card 3 -->
        <div
          class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
              alt="Course Thumbnail"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded"
                >Finance</span
              >
              <span class="text-xs text-gray-500 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-3 h-3 text-yellow-400"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
                5.0 (320)
              </span>
            </div>
            <h3
              class="text-xl font-bold text-landing-text-main mb-2 line-clamp-2 group-hover:text-landing-blue transition-colors"
            >
              Startup Finance: Raising Capital & Managing Cash Flow
            </h3>
            <div class="flex items-center gap-2 mb-4">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Instructor"
                class="w-6 h-6 rounded-full"
              />
              <span class="text-sm text-landing-text-body">Michael Ross</span>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="text-lg font-bold text-landing-blue">$59.99</div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  3.4k
                </span>
                <span class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  6h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <button
          class="px-8 py-3 rounded-lg font-bold text-landing-blue border-2 border-landing-blue hover:bg-landing-blue hover:text-white transition-all"
        >
          View All Courses
        </button>
      </div>
    </div>
  </section>
</template>
