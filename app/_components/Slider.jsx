import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'


function Slider({sliderList}) { 
  return (
    <Carousel className='mx-3 sm:mx-0'>
      <CarouselContent>
          {sliderList.map((slider, index) => (
            <CarouselItem key={index}>
              <Image src={slider?.attributes?.image?.data[0]?.attributes?.url}
              width={1000}
              height={500}
              alt='slider'
              className='w-full h-auto object-cover rounded-2xl'
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Slider
