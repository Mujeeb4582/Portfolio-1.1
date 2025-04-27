'use client'

import React, { useState } from 'react'
import YouTube from 'react-youtube'

const movies = [
  {
    id: 1,
    title: 'Looper',
    year: 2012,
    duration: '119 mins',
    genres: ['Action', 'Crime', 'Sci-fi'],
    description:
      'In 2074, when the mob wants to get rid of someone, the target is sent into the past, where a hired gun awaits - someone like Joe.',
    rating: 7.5,
    trailerId: '5kGFyVKmqA0',
    image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/43525/looper.png',
    theme: 'light',
  },
  {
    id: 2,
    title: 'Tron: Legacy',
    year: 2010,
    duration: '125 mins',
    genres: ['Action', 'Adventure', 'Fantasy', 'Sci-fi'],
    description:
      "The son of a virtual world designer goes looking for his father and ends up inside the digital world that his father designed. He meets his father's corrupted creation and a unique ally who was born inside the digital world.",
    rating: 6.8,
    trailerId: 'L9szn1QQfas',
    image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/43525/tron.png',
    theme: 'dark',
  },

  {
    id: 3,
    title: 'Inception',
    year: 2010,
    duration: '148 mins',
    genres: ['Action', 'Adventure', 'Sci-fi'],
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8,
    trailerId: '8hP9D6kZseM',
    image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/43525/inception.png',
    theme: 'light',
  },
  {
    id: 4,
    title: 'Interstellar',
    year: 2014,
    duration: '169 mins',
    genres: ['Adventure', 'Drama', 'Sci-fi'],
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    trailerId: 'zSWdZVtXT7E',
    image:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/43525/interstellar.png',
    theme: 'dark',
  },
]

const CardCarousel = () => {
  const [currentMovie, setCurrentMovie] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNavigation = (index: React.SetStateAction<number>) => {
    setCurrentMovie(index)
    setIsPlaying(false)
  }

  const opts = {
    height: '440',
    width: '840',
    playerVars: {
      autoplay: 1,
    },
  }

  return (
    <div className="group relative h-[440px] w-[840px] shadow-2xl">
      {/* Hover effect container */}
      <div className="absolute inset-0 transition-all duration-300 ease-in-out group-hover:-translate-x-10 group-hover:-translate-y-16">
        <div className="absolute inset-0 overflow-hidden">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                currentMovie === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className={`absolute inset-0 bg-cover bg-center ${
                  movie.theme === 'dark'
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
                style={{ backgroundImage: `url(${movie.image})` }}
              >
                <div className="absolute left-[330px] top-[150px]">
                  <h1 className="text-6xl font-bold uppercase">
                    {movie.title}
                  </h1>
                  <div className="my-4">
                    <span className="mr-5">{movie.year}</span>
                    <span className="mr-5">{movie.duration}</span>
                    <ul className="inline-block">
                      {movie.genres.map((genre, i) => (
                        <li key={i} className="mr-2 inline-block">
                          {genre}
                          {i < movie.genres.length - 1 && (
                            <span className="ml-2">|</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="max-w-[390px] text-sm">{movie.description}</p>
                </div>
                <div className="absolute bottom-[16.67px] right-[16.67px] flex size-[50px] items-center justify-center rounded-full border-2 border-[#ee927b] text-lg font-bold">
                  {movie.rating}
                </div>
                {isPlaying && currentMovie === index && (
                  <div className="absolute inset-0 z-20">
                    <YouTube
                      videoId={movie.trailerId}
                      opts={opts}
                      onEnd={() => setIsPlaying(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation and Play Button */}
      <div className="absolute bottom-1/2 right-0 hidden p-5 group-hover:block">
        <ul className="flex flex-col space-y-2">
          {movies.map((_, index) => (
            <li
              key={index}
              className={`size-3 cursor-pointer rounded-full transition-all duration-300 ${
                currentMovie === index ? 'scale-125 bg-white' : 'bg-gray-400'
              }`}
              onClick={() => handleNavigation(index)}
            />
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 right-0 hidden p-5 group-hover:block">
        <button
          className="mt-5 flex items-center text-sm text-[#aac8ca] transition-colors duration-300 hover:text-[#8aa8aa]"
          onClick={handlePlay}
        >
          {isPlaying ? 'Hide Trailer' : 'Watch Trailer'}
          <span className="border-t-6 border-b-6 border-l-6 ml-2 size-0 rotate-90 border-transparent border-l-[#dce9e9]" />
        </button>
      </div>
    </div>
  )
}

export default CardCarousel
