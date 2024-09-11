// src/mockApi.js
import { useState, useEffect } from "react";

// Mock implementation of useMovieQuery
export function useMovieQuery(id) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Mock movie data
    const mockMovie = {
      id: 29,
      title: "Date Night (Short Film)",
      video_file_url:
        "https://storage.googleapis.com/my-private-gcs/Date%20Night%20%28Short%20Film%29.mp4?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=cheyni-movies%40cheyni-432001.iam.gserviceaccount.com%2F20240911%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240911T101548Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=68156679fa96b72d04ea955a1b03b3c8202451e506dcb09518af492f3e49ea3bdb256609da7cccc9b1eb27837ed875219ddfc78e05fbe085adc7ce0b8bcfdb0aae391b425b54f56c63caad05a3982589cce31d629e3342a2623486a64e8d70e95e027e352622a269bf4adb9a05990fecad63cf85516e8d559346fd26b61579a6489677a12c3fc713601ee9c8322c278eaab055cb5d9fdcb481dc91d6dd75633908e69c88aaec462db4cb8c2e37457193dd4e57e862626be6603f006330c2758c6dde02ab646c9207a276bbf58fd9e5bf1f5051fa6d41608a9605e5c81faca19e3e8bc35a814db15b4e53c68dac31d3ca27d4378caf4a0d6e44a8935a01df15f9",
      session: {
        id: 1,
        playback_time: 0.888535,
        last_updated: "2024-09-11T09:44:38.744298Z",
        total_watch_time: 0,
        watched_segments: [0],
      },
      thumbnail_file_url:
        "https://storage.googleapis.com/my-private-gcs/Date%20Night%20%28Short%20Film%29_thumbnail.jpg",
      category: {
        id: 1,
        name: "Fiction",
      },
      duration: 336.96,
    };
    setData(mockMovie);
  }, [id]);

  return { data };
}

// Mock implementation of usePlaybackTimeMutation
export function usePlaybackTimeMutation() {
  const updatePlaybackTime = async ({ movie_id, playback_time }) => {
    console.log(
      `Playback time for movie ${movie_id} updated to ${playback_time} seconds.`
    );
    // Simulate an API response
    return Promise.resolve({ success: true });
  };

  return [updatePlaybackTime];
}
