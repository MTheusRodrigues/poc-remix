import { useNavigate } from "@remix-run/react"
import type Course from "~/utils/models/course"
import { FaTrashAlt } from "react-icons/fa"
import { deleteCourse } from "~/services/api"

interface CardProps {
    course: Course,
    setData: React.Dispatch<React.SetStateAction<Course[]>>
}

export default function Card({ course, setData }: CardProps) {
    const navigate = useNavigate()

    return (
        <div className="flex justify-center h-6/6	">
            <div className="rounded-lg shadow-lg bg-white max-w-sm max-w-lg">

                <img className="rounded-t-lg object-cover h-60" src={course.imageUrl} alt={course.name} width={300} height={300} />

                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{course.name}</h5>
                    <p className="text-gray-700 text-base mb-4">{course.description}</p>
                    <div className=" flex itens-center justify-between	">
                        <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={() => navigate(`/course/edit/${course.id}`)}
                        >Editar</button>
                        <button type="button" className=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={() => deleteCourse(course.id as string).then((res: any) => setData(res.data.content as Course[]))}
                        ><FaTrashAlt size={15} /></button>
                    </div>

                </div>
            </div>
        </div>
    )

}