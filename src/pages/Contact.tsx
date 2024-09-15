import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineMail, AiOutlinePhone, AiOutlineHome } from 'react-icons/ai';
import { MdSend } from 'react-icons/md';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form Submitted:', data);
    // Add form submission logic here (API call)
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center mb-12">
          We'd love to hear from you! Whether you have a question about our courses, need assistance, or want to give feedback, our team is ready to assist you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1661493896202-036ffa7e7e2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2V0JTIwaW4lMjB0b3VjaHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Contact"
              className="rounded-lg shadow-lg w-full h-64 object-cover mb-6 transition-transform transform hover:scale-105"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Have a question? Need help? Reach out to us anytime. Our support team is here to assist you with any inquiries or issues you may have.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="https://media.istockphoto.com/id/1216113490/photo/3d-navigation-map-pointer-marker-pin-travel-destinations.webp?a=1&b=1&s=612x612&w=0&k=20&c=_XmHdsnMd7OQRoZy_nNH6oyHabigRSHu9zAIn1kjGmg="
              alt="Our Location"
              className="rounded-lg shadow-lg w-full h-64 object-cover mb-6 transition-transform transform hover:scale-105"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Visit Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Come and say hello! We're located at 1234 SkillTrack Lane, Learning City, ST 56789. We welcome visits during our office hours.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8">
            Contact Information
          </h2>
          <ul className="space-y-8 text-gray-700 dark:text-gray-300">
            <li className="flex items-center justify-center">
              <AiOutlineMail className="text-blue-600 dark:text-blue-400 text-3xl mr-4" />
              <span><strong>Email:</strong> support@skilltrack.com</span>
            </li>
            <li className="flex items-center justify-center">
              <AiOutlinePhone className="text-blue-600 dark:text-blue-400 text-3xl mr-4" />
              <span><strong>Phone:</strong> +91 9359720973</span>
            </li>
            <li className="flex items-center justify-center">
              <AiOutlineHome className="text-blue-600 dark:text-blue-400 text-3xl mr-4" />
              <span><strong>Address:</strong> 1234 SkillTrack Lane, Learning City, ST 56789</span>
            </li>
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300`}
                id="name"
                type="text"
                placeholder="Your Name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300`}
                id="email"
                type="email"
                placeholder="Your Email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                className={`w-full px-3 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300`}
                id="message"
                placeholder="Your Message"
                rows={5}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <MdSend className="mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
