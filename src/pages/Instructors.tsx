import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorProfiles } from '../app/store/features/Instructors/instructorsSlice'; 
import { AppDispatch, RootState } from '../app/store/store';

const Instructors: React.FC = () => {
  const dispatch:AppDispatch = useDispatch();
  
  // Fetch instructors from Redux store
  const instructors:any = useSelector((state: RootState) => state.instructorsData);

  // Fetch instructor profiles when the component mounts
  useEffect(() => {
    dispatch(fetchInstructorProfiles());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Instructors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instructors && instructors?.length > 0 ? (
          instructors.map((instructor:any) => (
            <div key={instructor.email} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold">{instructor.name}</h3>
              <p>Email: {instructor.email}</p>
              <p>Courses:</p>
              <ul className="list-disc list-inside">
                {instructor.courses.map((course: { _id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                  <li key={course._id}>{course.title}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No instructors found.</p>
        )}
      </div>
    </div>
  );
};

export default Instructors;
