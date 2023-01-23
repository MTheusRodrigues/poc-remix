import type { AxiosInstance } from "axios";
import axios from "axios";
import type Course from "~/utils/models/course";

const api: AxiosInstance = axios.create({
  baseURL: "https://api-remix-production.up.railway.app/",
});

export async function getCourses(): Promise<Course[]> {
  const res = await api.get("/courses");
  const courses = (await res.data.content) as Course[];
  return courses;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const res = await api.get(`/courses/${id}`);
  const course = (await res.data) as Course;
  return course;
}

export async function saveCourse(
  course: Course | PromiseLike<Course | null> | null
): Promise<Course | null> {
  api
    .post(`/courses`, course)
    .then()
    .catch((err) => console.log("ERRO: ", err.data));
  return course;
}

export async function updateCourse(
  course: Course | PromiseLike<Course | null> | null
): Promise<Course | null> {
  api
    .put(`/courses`, course)
    .then()
    .catch((err) => console.log("ERRO: ", err.data));
  return course;
}

export async function deleteCourse(id: string) {
  let courses = api
    .delete(`/courses/${id}`)
    .then()
    .catch((err) => console.log("ERRO: ", err.data));
  return courses;
}

export default api;
