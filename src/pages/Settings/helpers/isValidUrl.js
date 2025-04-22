export default function isValidUrl(str) {
    const pattern = /^https?:\/\/(?:i\.)?imgur\.com\/[\w-]+\.(png|jpe?g|gif|webp)$/i;
    return pattern.test(str);
}
  