import PostApi from "../api/PostApi";

export async function uploadAllImages(images: File[]): Promise<(string | null)[]> {
  const uploadPromises = images.map((image) => {
    return PostApi.uploadImageToImgur(image);
  });

  const results = await Promise.all(uploadPromises);
  return results;
}
