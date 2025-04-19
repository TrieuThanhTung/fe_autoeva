import PostApi from "../api/PostApi";

export async function uploadAllImages(images: File[]): Promise<(string | null)[]> {
  const uploadPromises = images.map((image) => {
    return PostApi.uploadImageToImgur(image);
  });

  const results = await Promise.all(uploadPromises);
  return results;
}

export const formatCurrency = (value: string | number) => {
  const number = typeof value === "string" ? value.replace(/\D/g, "") : value;
  return Number(number).toLocaleString("vi-VN");
};

export const parseCurrency = (value: string) => {
  return value.replace(/\D/g, "");
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("vi-VN");
};
