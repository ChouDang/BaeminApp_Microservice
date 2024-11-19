'use client'

import { Carousel } from "antd";
import Image from "next/image";
import React from "react";

const banneritems = [
  {
    id: '1',
    name: 'anh 1',
    url: '/images/map1.png',
  },
  {
    id: '2',
    name: 'anh 2',
    url: '/images/map2.png',
  },
  {
    id: '3',
    name: 'anh 32',
    url: '/images/map3.png',
  },
  {
    id: '3',
    name: 'anh 32',
    url: '/images/map4.png',
  }
]

export default function ScrollBar() {
  return (
    <>
      <Carousel className="mb-[28px]" >
        {banneritems.length && banneritems.map((item, index) => (<>
          <div key={index} style={{ position: 'relative', height: '400px' }}>
            <Image
              fill
              src={item.url}
              alt="s"
            />
          </div>
        </>))}
      </Carousel>
    </>
  )
}