import { Button } from "@/components/ui/button"
import React from 'react'

const Hero = () => {
    return (
        <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white-py-16 min-h-150 w-full text-center' >
            <div className='max-w-8xl mx-auto px-4'>
                <div className='grid md:grid-cols-2 gap-8 itmes-center'>

                    <div>
                        <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                            Latest Electronics at Best Prices
                        </h1>
                        <p className='text-xl mb-6 text-blue-100'>
                            Discover cutting-edge technology with unbeatable deals on smartphonee, laptop and more.
                        </p>
                        <div className='text-4xl md:text-6xl font-bold mb-4'>
                            <Button className='bg-white text-blue-600 hover:bg-gray-100'>Shop Now</Button>
                            <Button variant='outline' className='border-white text-white hover::bg-white hover:text-blue-600 bg-transparent'>View Deals</Button>
                        </div>
                    </div>
                    <div className='relative'>
                        <img src='/src/assets/cal.jpg' alt='' width={500} className='rounded-lg shadow-2xl h-[500px]' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
