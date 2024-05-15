'use client';
import parse from "html-react-parser";

type Props = {
    html: string[]
}

export default function HTMLPreview({html}: Props) {
  return (
    <div className='max-w-full min-h-screen'>{parse(html.join(""))}</div>
  )
}