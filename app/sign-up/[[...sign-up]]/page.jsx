import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
  <div className='flex items-center justify-center min-h-screen w-screen bg-[#070318]'>
    <SignUp />
  </div>)
}