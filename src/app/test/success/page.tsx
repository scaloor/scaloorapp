import Image from 'next/image'

type Props = {}

export default function TestSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <Image src="/great-success.jpg" alt="Success" width={500} height={500} />
    </div>
  )
}