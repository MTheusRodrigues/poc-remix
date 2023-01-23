import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import { FormComponent } from "~/components/form"
import { getCourseById, updateCourse } from "~/services/api"
import type Course from "~/utils/models/course"

export interface FormFields {
    id?: string;
    name: string;
    description: string;
    imageUrl: string;
}

export interface ActionData {
    formErrors?: Partial<FormFields>;
    formValues?: FormFields;
}

export const loader: LoaderFunction = async ({ params }) => {
    return { course: await getCourseById(params.id as string) as Course }
}

export const action: ActionFunction = async ({ request, params }): Promise<ActionData | Response | void> => {
    const data = Object.fromEntries(await request.formData()) as unknown as Course;

    async function main() {
        let course: Course = {
            id: params.id,
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl
        }
        await updateCourse(course)
    }

    await main()
        .catch((e) => {
            throw e;
        })
    return redirect("/");
};

function EditarCourse() {
    const actionData = useActionData<ActionData>();
    const { course } = useLoaderData()
    return <FormComponent actionData={actionData} course={course} />
}
export default EditarCourse