import React from 'react'

import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { usePhotoGallery } from '../utils/useGallery';

const ImageScanner = () => {
    const {takePhoto} = usePhotoGallery()
  return (
    <>
    <button onClick={takePhoto}>Take</button>
    </>
  )
}

export default ImageScanner