import { ILogInForm, UserApi } from "@/services/api/user";
import { setUserLoggedIn } from "@/store/userSlice";
import { ADMIN_TOKEN } from "@/utils/constants/cookiesName";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function Home({}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues: Partial<ILogInForm> = {};
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (data) => {
      console.log(`sending request to backend`);
      if (data.password && data.username) {
        UserApi.logIn({
          password: data.password,
          username: data.username,
        }).then((response) => {
          Cookies.set(ADMIN_TOKEN, response.data.token, { expires: 30 });
          dispatch(setUserLoggedIn(true));
          router.replace("/admin/products/green-and-fuschia-lehenga-saree");
        });
      }
    },
  });

  return (
    <div className="h-screen">
      <section className="bg-gray-50 dark:bg-gray-900 h-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="https://shop.finderr.co.in"
            target="_blank"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-16 h-16"
              src="https://static.wixstatic.com/media/ca9765_2c70045cb38b4f2fb375c76a01e312ce~mv2.png/v1/fill/w_177,h_177,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Finderr%20(15).png"
              alt="logo"
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={formik.values.username || ""}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={formik.values.password || ""}
                    onChange={formik.handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-brand hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
