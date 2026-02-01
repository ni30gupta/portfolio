'use client'

import React from 'react'

const experiences = [
  {
    id: 1,
    company: "Kosh Finance",
    role: "Full Stack Developer",
    duration: "May 2022 - Present",
    location: "Gurugram, India",
    description: "Leading development of scalable web applications using modern technologies",
    achievements: [
      "Architected and deployed microservices handling 1M+ daily requests",
      "Reduced application load time by 40% through optimization techniques",
      "Mentored team of 3 junior developers in React and Node.js best practices",
      // "Implemented CI/CD pipelines reducing deployment time by 60%"
    ],
    technologies: ["React","React Native", "Redux", "Python", "Django rest-framework", "PostgreSQL", "AWS", "Docker"]
  },
 
]

const Experience = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
          Work Experience
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Professional journey and key accomplishments
        </p>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div 
            key={exp.id}
            className="group relative rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl dark:bg-zinc-900"
          >
            {/* Timeline dot */}
            <div className="absolute -left-3 top-8 hidden md:block">
              <div className="h-6 w-6 rounded-full bg-indigo-600 ring-4 ring-zinc-50 dark:bg-indigo-500 dark:ring-black"></div>
            </div>

            {/* Content */}
            <div className="md:pl-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {exp.role}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-indigo-600 dark:text-indigo-400">
                    {exp.company}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {exp.duration}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {exp.location}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                {exp.description}
              </p>

              {/* Achievements */}
              <ul className="mt-4 space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="mt-1 text-indigo-600 dark:text-indigo-400">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Connector line for timeline */}
            {index < experiences.length - 1 && (
              <div className="absolute -bottom-8 left-0 hidden h-8 w-px bg-zinc-200 dark:bg-zinc-800 md:block" 
                style={{ marginLeft: '0.5rem' }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
