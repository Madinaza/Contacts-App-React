import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieQuery, usePlaybackTimeMutation } from './mockApi';
import throttle from 'lodash.throttle';
import moment from 'moment';

export default function Movie() {
  const [updatePlaybackTime] = usePlaybackTimeMutation();
  const { id } = useParams();
  const { data: movie, error: movieError } = useMovieQuery(id);
  const [playbackTime, setPlaybackTime] = useState(movie?.session?.playback_time || 0);
  const videoRef = useRef(null);
  const lastSentTimeRef = useRef(playbackTime);
  const [isPlaying, setIsPlaying] = useState(false);

  const movieId = movie?.id;

  const sendPlaybackTimeToBackend = useCallback(
    async (time) => {
      if (movieId && time !== lastSentTimeRef.current) {
        try {
          await updatePlaybackTime({
            movie_id: movieId,
            playback_time: time,
          });
          console.log(`Playback time ${time} sent to backend.`);
          lastSentTimeRef.current = time; 
        } catch (error) {
          console.error('Failed to save playback time', error);
        }
      }
    },
    [updatePlaybackTime, movieId]
  );

  const throttledSendPlaybackTime = useCallback(
    throttle((time) => {
      sendPlaybackTimeToBackend(time);
    }, 3000), // Send every 3 seconds
    [sendPlaybackTimeToBackend]
  );

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (videoRef.current) {
          setPlaybackTime(videoRef.current.currentTime);
        }
      }, 3000); 
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      throttledSendPlaybackTime(playbackTime);
    }
  }, [playbackTime, throttledSendPlaybackTime, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    sendPlaybackTimeToBackend(playbackTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    sendPlaybackTimeToBackend(playbackTime);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      sendPlaybackTimeToBackend(playbackTime);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      throttledSendPlaybackTime.cancel();
    };
  }, [playbackTime, sendPlaybackTimeToBackend, throttledSendPlaybackTime]);

  useEffect(() => {
    if (videoRef.current && playbackTime !== videoRef.current.currentTime) {
      videoRef.current.currentTime = playbackTime;
    }
  }, [playbackTime]);

  if (movieError) {
    return <div>Error loading movie data</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <section className='movie_details'>
      <div className='movie_poster'>
        <img src={movie?.thumbnail_file_url} alt='Movie Thumbnail' />
        <div className='detail_video'>
          <h1 className='title'>{movie?.title}</h1>
          <p className='category'>{movie?.category?.name}</p>
          <span className='session'>
            {moment(movie?.session?.last_updated).fromNow()}
          </span>
        </div>
      </div>
      <div className='movie_video'>
        <video
          ref={videoRef}
          width={'100%'}
          controls
          src={movie?.video_file_url}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          autoPlay
          onError={(e) => {
            console.error('Error loading video:', e);
            alert('Failed to load the video. Please try again later.');
          }}
        />
      </div>
    </section>
  );
}
