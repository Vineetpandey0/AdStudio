import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
  <div className='flex items-center justify-center mt-10 w-screen'>
    <SignUp 
    appearance={{
          elements: {
            footer: "hidden", // removes "Powered by Clerk"
          },
        }}
    />
  </div>)
}