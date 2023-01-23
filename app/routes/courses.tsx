import { useNavigate } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Card from "~/components/card";
import { getCourses } from "~/services/api";
import type Course from "~/utils/models/course";

export async function loader() {
  const courses = await getCourses()
  try {
    return courses;
  } catch (error) {
    throw error;
  }
};

function Courses() {
  const courses = useLoaderData<typeof loader>()
  const [data, setData] = useState<Course[]>(courses)
  const navigate = useNavigate()

  useEffect(() => {
    getCourses().then(res => setData(res as Course[]))
  }, [])
  return (
    <div className="courses-container bg-slate-200 flex justify-center items-center flex-col	">
      <div className="w-full flex justify-center items-center">
        <div className="w-full bg-slate-300 flex justify-between px-12 py-12 shadow-lg">
          <p>Cursos</p>
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => navigate(`/course/new`)}>
            <div className="flex items-center justify-center"><FaPlus className="mr-2" />Novo curso</div>
          </button>
        </div>

      </div>
      <div className="w-11/12 grid pt-12 pb-12 grid-cols-4	">
        {data.map((course: Course) =>
          <div key={course.id} className="m-2 grid">
            <Card course={course} />
          </div>
        )}
      </div>
    </div>
  );
}
export default Courses