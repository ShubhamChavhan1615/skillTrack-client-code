import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CallToAction from '../components/CallToAction';
import PartnersClients from '../components/PartnersClients';
import Courses from './Courses';
import TestimonialsSection from '../components/TestimonialsSection';
import { AppDispatch, RootState } from '../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../app/store/features/user/userSlice';
import ShowAllUsers from '../components/admin/ShowAllUsers';
import ShowAllCourses from '../components/admin/ShowAllCourses';

const Home: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const getedUser = useSelector((state: RootState) => state.userProfileData);

  useEffect(() => setUser(getedUser), [getedUser]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {user?.role === 'admin' ? (
        <>
          <ShowAllUsers />
          <ShowAllCourses />
        </>
      ) : (
        <>
          <HeroSection />
          <Courses />
          <FeaturesSection />
          <CallToAction />
          <PartnersClients />
          <TestimonialsSection />
        </>
      )}
    </div>
  );
};

export default Home;
