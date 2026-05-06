const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'dblar8vw0'
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? 'thermofuture_social_unsigned'

export function isCloudinaryReady() {
  return Boolean(cloudName && uploadPreset)
}

export function getCloudinaryConfig() {
  return { cloudName, uploadPreset }
}

export async function uploadVideoToCloudinary(file) {
  if (!isCloudinaryReady()) {
    throw new Error('Cloudinary non configurato: manca VITE_CLOUDINARY_UPLOAD_PRESET')
  }
  const { cloudName: name, uploadPreset: preset } = getCloudinaryConfig()
  const endpoint = `https://api.cloudinary.com/v1_1/${name}/video/upload`

  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', preset)
  fd.append('folder', 'thermofuture/social')

  const res = await fetch(endpoint, {
    method: 'POST',
    body: fd,
  })
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.error?.message || 'Upload video non riuscito')
  }
  return json
}

export async function uploadImageToCloudinary(file) {
  if (!isCloudinaryReady()) {
    throw new Error('Cloudinary non configurato: manca VITE_CLOUDINARY_UPLOAD_PRESET')
  }
  const { cloudName: name, uploadPreset: preset } = getCloudinaryConfig()
  const endpoint = `https://api.cloudinary.com/v1_1/${name}/image/upload`

  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', preset)
  fd.append('folder', 'thermofuture/offers')

  const res = await fetch(endpoint, {
    method: 'POST',
    body: fd,
  })
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.error?.message || 'Upload immagine non riuscito')
  }
  return json
}
