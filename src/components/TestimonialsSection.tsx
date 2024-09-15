import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  feedback: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Connor',
    role: 'Full-Stack Developer',
    feedback: 'SkillTrack has completely changed my career trajectory. The courses are top-notch and the platform is so easy to use!',
    imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 2,
    name: 'John Wick',
    role: 'Web Designer',
    feedback: 'I have gained so much knowledge from the courses here. The practical projects really helped me build confidence in my skills.',
    imageUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    id: 3,
    name: 'Jane Doe',
    role: 'Data Analyst',
    feedback: 'SkillTrack is the best platform for anyone looking to learn new skills and advance their career. Highly recommended!',
    imageUrl: 'https://randomuser.me/api/portraits/women/85.jpg',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-12 px-6">
      <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-8">
        What Our Learners Say
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center"
          >
            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {testimonial.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-300">{testimonial.role}</p>
            <p className="mt-4 text-gray-600 dark:text-gray-200">
              “{testimonial.feedback}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
