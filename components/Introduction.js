'use client'

import React from 'react'
import Image from 'next/image'

const Introduction = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          {/* Profile Image */}
          <div className="mb-6 md:mb-0">
            <div className="h-32 w-32 rounded-full overflow-hidden shadow-md">
              <Image
                src="/profile_photo.png"
                alt="Nitish Gupta"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Nitish Gupta
            </h1>
            <p className="mt-2 text-xl text-indigo-600 dark:text-indigo-400">
              Full Stack Developer
            </p>
            
            <div className="mt-6 space-y-4 text-zinc-700 dark:text-zinc-300">
              <p className="leading-relaxed">
                Passionate frontend heavy full-stack developer with expertise in building modern web applications and android/IOS 
                app using React,React Native, Next.js, Node.js, Python, Django and cloud technologies. I love creating intuitive
                user experiences and scalable backend systems.
              </p>
              
              <p className="leading-relaxed">
                With a strong foundation in React - JavaScript/TypeScript and experience across the entire
                development lifecycle, I specialize in transforming complex requirements into
                elegant, maintainable solutions.
              </p>
            </div>

            {/* Contact Info */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a 
                href="mailto:ni30.dev@gmail.com" 
                className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                📧 Email
              </a>
              <a 
                href="https://github.com/ni30gupta" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                💻 GitHub
              </a>
              <a 
                href="https://linkedin.com/in/ni30gupta" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                🔗 LinkedIn
              </a>
              <a 
                href="https://drive.google.com/uc?export=download&id=1GblPW6nwNSO5WV9vv97OFIAphZdcOrkl" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                📄 Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Introduction