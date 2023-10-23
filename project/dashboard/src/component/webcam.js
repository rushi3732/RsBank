import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/api/api';

function WebCam() {
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [isScreenRecorded, setIsScreenRecorded] = useState(false);
  const [screenBlobUrl, setScreenBlobUrl] = useState('');
  const [isCameraRecording, setIsCameraRecording] = useState(false);
  const [isCameraRecorded, setIsCameraRecorded] = useState(false);
  const [cameraBlobUrl, setCameraBlobUrl] = useState('');

  const {
    startRecording: startScreen,
    stopRecording: stopScreen,
    mediaBlobUrl: currentScreenBlobUrl,
  } = useReactMediaRecorder({
    video: true,
    screen: true,
  });

  const {
    startRecording: startCamera,
    stopRecording: stopCamera,
    mediaBlobUrl: currentCameraBlobUrl,
  } = useReactMediaRecorder({
    video: true,
  });

  useEffect(() => {
    if (currentScreenBlobUrl && !isScreenRecording) {
      setIsScreenRecorded(true);
      setScreenBlobUrl(currentScreenBlobUrl);
    }
  }, [currentScreenBlobUrl, isScreenRecording]);

  useEffect(() => {
    if (currentCameraBlobUrl && !isCameraRecording) {
      setIsCameraRecorded(true);
      setCameraBlobUrl(currentCameraBlobUrl);
    }
  }, [currentCameraBlobUrl, isCameraRecording]);

  const handleUpload = async (blobUrl, endpoint) => {
    if (blobUrl) {
      const formData = new FormData();
      formData.append('video', new Blob([blobUrl]));

      try {
        await api.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Video uploaded successfully.');
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          toast.error('Error uploading video. Please try again.');
        } else {
          toast.error('An error occurred while uploading the video.');
        }
      }
    } else {
      toast.warn('No recorded video to upload.');
    }
  };

  const startScreenRecording = () => {
    startScreen();
    setIsScreenRecording(true);
    setIsScreenRecorded(false);
    setScreenBlobUrl('');
    toast.info('Screen recording started.');
  };

  const stopScreenRecording = () => {
    stopScreen();
    setIsScreenRecording(false);
    toast.info('Screen recording stopped.');
  };

  const startCameraRecording = () => {
    startCamera();
    setIsCameraRecording(true);
    setIsCameraRecorded(false);
    setCameraBlobUrl('');
    toast.info('Camera recording started.');
  };

  const stopCameraRecording = () => {
    stopCamera();
    setIsCameraRecording(false);
    toast.info('Camera recording stopped.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex w-full max-w-screen-lg">
        <div className="w-1/2 p-4">
          <div className="mb-4">
            <h1 className="text-2xl text-blue-600 not-sr-only">Screen Recording</h1>
            <div className="flex items-center">
              <div className="flex-1">
                {isScreenRecording ? (
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600 focus:not-sr-only"
                    onClick={stopScreenRecording}
                  >
                    Stop Screen Recording
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded-full hover:bg-blue-600 focus:not-sr-only"
                    onClick={startScreenRecording}
                  >
                    Start Screen Recording
                  </button>
                )}
              </div>
            </div>
          </div>
          {isScreenRecorded && (
            <div className="mt-6">
              <h1 className="text-2xl text-blue-600 not-sr-only">Recorded Screen</h1>
              <video
                className="w-full border-2 border-black"
                src={screenBlobUrl}
                controls
                autoPlay
              />
            </div>
          )}
          {isScreenRecorded && (
            <button
              className="bg-red-500 mt-2 text-white py-1 px-2 rounded-full hover:bg-red-600 focus:not-sr-only"
              onClick={() => handleUpload(screenBlobUrl, '/webcam')}
            >
              Upload Screen Video
            </button>
          )}
        </div>

        <div className="w-1/2 p-4">
          <div className="mb-4">
            <h1 className="text-2xl text-blue-600 not-sr-only">Camera Recording</h1>
            <div className="flex items-center">
              <div className="flex-1">
                {isCameraRecording ? (
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-full hover-bg-red-600 focus:not-sr-only"
                    onClick={stopCameraRecording}
                  >
                    Stop Camera Recording
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded-full hover:bg-blue-600 focus:not-sr-only"
                    onClick={startCameraRecording}
                  >
                    Start Camera Recording
                  </button>
                )}
              </div>
            </div>
          </div>
          {isCameraRecorded && (
            <div className="mt-6">
              <h1 className="text-2xl text-blue-600 not-sr-only">Recorded Camera</h1>
              <video
                className="w-full border-2 border-black"
                src={cameraBlobUrl}
                controls
                autoPlay
              />
            </div>
          )}
          {isCameraRecorded && (
            <button
              className="bg-red-500 mt-2 text-white py-1 px-2 rounded-full hover-bg-red-600 focus:not-sr-only"
              onClick={() => handleUpload(cameraBlobUrl, '/webcam')}
            >
              Upload Camera Video
            </button>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ top: '80px', right: '20px' }}
      />
    </div>
  );
}

export default WebCam;

