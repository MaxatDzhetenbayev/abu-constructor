"use client"
import React from 'react'
import Snowfall from 'react-snowfall'

export const SnowfallView = () => {
    return (
        <div className='fixed z-30 top-0 left-0 bottom-0 right-0 w-full h-full pointer-events-none'>
            <Snowfall />
        </div>
    )
}
