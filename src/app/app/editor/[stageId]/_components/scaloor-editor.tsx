'use client'

import React, { useState } from 'react'
import Novel from './novel'
import { JSONContent } from 'novel';
import { defaultContent } from './novel/default-content';


type Props = {}

export default function ScaloorEditor({}: Props) {
  const [value, setValue] = useState<JSONContent>(defaultContent);
  console.log(value);
  return <Novel initialContent={value} onChange={setValue} />
}