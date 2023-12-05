import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers = { jwtToken: localStorage.getItem("jwtToken") };

export const loginUser = async (data) => axios.post('auth/signin', data);
export const signUpUser = async (data) => axios.post('auth/signup', data);

// export const userInfo = async () => axios.post('user/user_info');
export const userInfo = async ({ask}) => axios.post(`user/user_info?ask=${ask}`);

export const getCourses = async ({category, course_name}) => axios.get(`course/?${category?`category=${category}`:''}${course_name?`course_name=${course_name}`:''}`);
export const createCourse = async (data) => axios.post(`course/`, data);
export const enrollBatch = async (data) => axios.post(`course/batch/enroll`, data);
export const createBatch = async (data) => axios.post(`course/batch/create`, data);
export const isBatchExist = async (data) => axios.post(`course/batch/batchExist`, data);
export const ShowAllBatches = async ({ask}) => axios.post(`course/batch/showbatches?ask=${ask}`);

export const getCategories = async () => axios.get(`course/category`);
export const createCategories = async (data) => axios.post(`course/category`, data);

export const initialize_StepOne = async (data) => axios.post('/user/step_one', data);
export const initialize_StepTwo = async (data) => axios.post('/user/step_two', data);
export const initialize_StepThree = async (data) => axios.post('/user/step_three', data);

export const createOrder = async (data) => axios.post('/payment/createOrder', data);
export const App_History = async()=> axios.get('/user/app_history');
export const GetCandidates = async (data) => axios.post(`/user/getCandiate`,data);
export { axios };