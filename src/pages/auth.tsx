import React, {useState, useCallback} from 'react';
import Image from 'next/image';
import Logo from '../../public/images/logo.png';
import Input from '@/components/shared/input';

type Props = {}

const Auth = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const [variant, setVariant] = useState<string>('login');

  const isLogin = () => variant === 'login';

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);
  
  return (
    <div
      className='relative h-full w-full bg-[url("/images/hero.jpg")] bg-no-repeat bg-center bg-fixed bg-cover'
    >
      <div
        className='bg-black w-full h-full md:bg-opacity-50'
      >
        <nav className='px-12 py-5'>
          <Image src={Logo} alt="logo" className='h-12 w-fit'/>
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 p-16 self-center mt-2 md:w-3/5 md:mx-w-md rounder-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {isLogin() ? 'Sing in' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4'>
            {!isLogin() && (<Input
                label='Username'
                onChange={setUsername}
                type='text'
                value={username}
                id='username'
              />)}
              <Input
                label='Email'
                onChange={setEmail}
                type='email'
                value={email}
                id='email'
              />
              <Input
                label='Password'
                onChange={setPassword}
                type='password'
                value={password}
                id='password'
              />
            </div>
            <button className='bg-red-500 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
              {isLogin() ? 'Login' : 'Sing up'}
            </button>
            <p className='text-neutral-500 mt-12'>
              {isLogin() ? 'First time using Netfilx?' : 'Already have an account?'}
              <span 
                className='text-white ml-1 hover:underline cursor-pointer'
                onClick={toggleVariant}
              >
                {isLogin() ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;