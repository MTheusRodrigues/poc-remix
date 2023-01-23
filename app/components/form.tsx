import { Form, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import type { ActionData } from "~/routes/course.edit.$id";
import { deleteCourse } from "~/services/api";
import type Course from "~/utils/models/course";

export interface CourseFormProps {
  actionData?: ActionData;
  course?: Course;
}

export function FormComponent({ actionData, course }: CourseFormProps) {
  const [urlImage, setUrlImage] = useState(actionData?.formValues?.imageUrl ?? course?.imageUrl)
  const navigate = useNavigate()

  return (
    <Form method="post">
      <div className="shadow sm:rounded-md sm:overflow-hidden flex justify-center pt-12">
        <div className="bg-white py-6 px-4 space-y-10 sm:p-6 bg-slate-300	w-9/12	" >
          <div className="bg-slate-400">
            <h3 className="text-lg leading-6 font-medium text-gray-900 px-4 py-2">
              {course?.id !== undefined && <span>Editar curso</span>}
              {course?.id == undefined && <span>Novo curso</span>}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-1 items-center content-center">
            {/* image */}
            <div className="flex items-center	justify-center">
              <img className="" width={300} src={urlImage} alt={actionData?.formValues?.name ?? course?.name} />
            </div>
            <div className="grid grid-cols-6">
              {/* name */}
              <div className="col-span-3 sm:col-span-6 py-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required={true}
                  defaultValue={actionData?.formValues?.name ?? course?.name}
                  key={actionData?.formValues?.name ?? course?.name}
                  className="mt-1 block w-full border border-gray-300 
                    rounded-md shadow-sm py-2 px-3 focus:outline-none 
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {actionData?.formErrors?.name ? (
                  <p className="text-xs text-red-500 pt-2">
                    {actionData.formErrors.name}
                  </p>
                ) : null}
              </div>
              {/* description */}
              <div className="col-span-3 sm:col-span-6 py-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descrição
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  required={true}
                  autoComplete="description"
                  defaultValue={
                    actionData?.formValues?.description ?? course?.description
                  }
                  key={actionData?.formValues?.description ?? course?.description}
                  className="mt-1 block w-full border border-gray-300 
                    rounded-md shadow-sm py-2 px-3 focus:outline-none 
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {actionData?.formErrors?.description ? (
                  <p className="text-xs text-red-500 pt-2">
                    {actionData.formErrors.description}
                  </p>
                ) : null}
              </div>
              {/* urlImage */}
              <div className="col-span-3 sm:col-span-6 py-3">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Url imagem
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  id="imageUrl"
                  required={true}
                  autoComplete="imageUrl"
                  defaultValue={
                    actionData?.formValues?.imageUrl ?? course?.imageUrl
                  }
                  key={actionData?.formValues?.imageUrl ?? course?.imageUrl}
                  onChange={(e) => setUrlImage(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 
                    rounded-md shadow-sm py-2 px-3 focus:outline-none 
                    focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {actionData?.formErrors?.imageUrl ? (
                  <p className="text-xs text-red-500 pt-2">
                    {actionData.formErrors.imageUrl}
                  </p>
                ) : null}
              </div>
              <div className="col-span-3 sm:col-span-6 py-2 flex flex-row items-center justify-between bg-red-200">
                <button
                  type="submit"
                  className="w-6/12 bg-indigo-600 border border-transparent rounded-md 
                    shadow-sm pt-2 py-2.5 px-6 flex justify-center text-sm font-medium 
                    text-white hover:bg-indigo-700 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
                <button type="button" className="w-3/12 px-6 py-2.5 bg-red-600 text-white font-medium text-xs flex items-center justify-center	leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => {
                    if (course?.id !== undefined) {
                      deleteCourse(course?.id as string)
                      navigate('/courses')
                      return
                    }
                    navigate('/courses')
                  }}
                >
                  {course?.id !== undefined && <> <FaTrashAlt size={15} className="mr-2" />Remover</>}
                  {course?.id == undefined && <><MdCancel size={15} className="mr-2" />Cancelar</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}