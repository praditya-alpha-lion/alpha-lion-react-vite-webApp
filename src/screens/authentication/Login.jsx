import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../../components/utilities/Loading';
import { userLogin } from '../../store/features/auth/authActions';

export default function Login() {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   email: "pradtiya@alphalionlogistics.com",
  //   password: "12345",

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  // const onSubmit = async (data) => {
  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   let raw = JSON.stringify({
  //     email: data.userId,
  //     password: data.password,
  // email: "pradtiya@alphalionlogistics.com",
  // password: "12345",
  //   });

  //   let requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   const isLogin = await fetch(
  //     "http://192.168.1.30/API/V1/weblogin",
  //     requestOptions
  //   );

  //   let isLoginIn = await isLogin.json();
  //   if (isLoginIn.message !== "Incorrect") {
  //     // dispatch(handleUserLogin(isLoginIn));
  //     navigate("/dashboard");
  //   }
  // }; // your form submit function which will invoke after successful validation

  if (loading) {
    return (
      <div className='mx-auto'>
        <Loading />
      </div>
    );
  }

  return (
    <section className='h-screen gradient-form bg-gray-200 md:h-screen w-screen'>
      <div className='container py-12 px-6 h-full w-full m-auto'>
        <div className='flex justify-center items-center m-auto flex-wrap h-full g-6 text-gray-800'>
          <div className='xl:w-10/12'>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0 px-6 py-8 '>
                <div className='lg:w-6/12 px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <img
                        className='mx-auto w-48'
                        src='logo.webp'
                        alt='logo'
                      />
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        We are The Alpha Lion Team
                      </h4>
                    </div>
                    <form onSubmit={handleSubmit(submitForm)}>
                      <p className='mb-4'>Please login to your account</p>
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Username'
                          value={'praditya@alphalionlogistics.com'}
                          {...register('email')}
                          required
                        />
                      </div>
                      <div className='mb-4'>
                        <input
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Password'
                          value={'12345'}
                          {...register('password')}
                          required
                        />
                      </div>
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-orange-500 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='submit'
                        >
                          Log in
                        </button>
                        <a className='text-gray-500'>Forgot password?</a>
                      </div>
                      <div className='flex items-center justify-between pb-6'>
                        <p className='mb-0 mr-2'>Don't have an account?</p>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-slate-100'>
                  <div className=' px-4 py-6 md:p-12 md:mx-6'>
                    <h4 className='text-xl font-semibold mb-6'>
                      We are more than just a company
                    </h4>
                    <p className='text-sm'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
