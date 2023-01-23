import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { FormComponent } from "~/components/form";
import { saveCourse } from "~/services/api";
import type Course from "~/utils/models/course";
import type { ActionData } from "./course.edit.$id";
import StatusEnum from "~/utils/enumarations/status-enum";

interface NewCourseProps {
  setData: React.Dispatch<React.SetStateAction<Course[]>>
}

let course = {
  name: '',
  description: '',
  imageUrl: '',
  status: StatusEnum.ACTIVE
}

export const action: ActionFunction = async ({ request }) => {
  const data = Object.fromEntries(await request.formData()) as unknown as Course;
  async function main() {
    await saveCourse(data)
  }

  await main()
    .catch((e) => {
      throw e;
    })

  return redirect("/courses");
};

function NewCourse({ setData }: NewCourseProps) {
  const actionData = useActionData<ActionData>();
  return <FormComponent actionData={actionData} course={course} />
}
export default NewCourse