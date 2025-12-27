<template>
  <footer class="bg-landing-blue pt-16 pb-8 text-white">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <router-link to="/" class="text-2xl font-bold tracking-tight mb-6 block">
            creator2ceo
          </router-link>
          <p class="text-blue-100 mb-8 max-w-sm leading-relaxed">
            Empowering creators to build sustainable businesses and students to achieve their career
            goals through world-class education.
          </p>
          <div class="flex gap-4">
            <a href="#" class="text-white hover:text-blue-200 transition-colors">
              <span class="sr-only">LinkedIn</span>
              <svg fill="currentColor" viewBox="0 0 24 24" class="h-6 w-6">
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
            <a href="#" class="text-white hover:text-blue-200 transition-colors">
              <span class="sr-only">Twitter</span>
              <svg fill="currentColor" viewBox="0 0 24 24" class="h-6 w-6">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
            </a>
            <a href="#" class="text-white hover:text-blue-200 transition-colors">
              <span class="sr-only">Facebook</span>
              <svg fill="currentColor" viewBox="0 0 24 24" class="h-6 w-6">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Links Column 1 -->
        <div>
          <h3 class="font-bold text-lg mb-6">Company</h3>
          <ul class="space-y-4">
            <li>
              <a href="#" class="text-blue-100 hover:text-white transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" class="text-blue-100 hover:text-white transition-colors">Careers</a>
            </li>
            <li><a href="#" class="text-blue-100 hover:text-white transition-colors">Press</a></li>
            <li><a href="#" class="text-blue-100 hover:text-white transition-colors">News</a></li>
          </ul>
        </div>

        <!-- Links Column 2 -->
        <div>
          <h3 class="font-bold text-lg mb-6">Resources</h3>
          <ul class="space-y-4">
            <li><a href="#" class="text-blue-100 hover:text-white transition-colors">Blog</a></li>
            <li>
              <a href="#" class="text-blue-100 hover:text-white transition-colors">Newsletter</a>
            </li>
            <li><a href="#" class="text-blue-100 hover:text-white transition-colors">Events</a></li>
            <li>
              <a href="#" class="text-blue-100 hover:text-white transition-colors">Help Center</a>
            </li>
          </ul>
        </div>

        <!-- Links Column 3 -->
        <div>
          <h3 class="font-bold text-lg mb-6">Support</h3>
          <ul class="space-y-4">
            <li>
              <a href="#" class="text-blue-100 hover:text-white transition-colors">Contact Us</a>
            </li>
            <li>
              <a href="#" class="text-blue-100 hover:text-white transition-colors"
                >Terms of Service</a
              >
            </li>
            <li>
              <a href="#" class="text-blue-100 hover:text-white transition-colors"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a href="#" class="text-blue-100 hover:text-white transition-colors">Cookie Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/20 pt-8 text-center text-blue-200 text-sm">
        &copy; {{ new Date().getFullYear() }} creator2ceo. All rights reserved.
      </div>
    </div>
  </footer>
</template>
